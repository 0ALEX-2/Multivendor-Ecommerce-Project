import https from "https";
import fs from "fs";
import expressAsyncHandler from "express-async-handler";

const BASE_HOSTNAME = "storage.bunnycdn.com";
const HOSTNAME = BASE_HOSTNAME;
const ACCESS_KEY = "erw3543rsdf-5456-2b64-9s13dhgfd33";
const STORAGE_ZONE_NAME = "mve-ecom";

export const uploadFile = expressAsyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded." });
  }

  const file = req.file;
  const filePath = file.path;
  const fileName = encodeURIComponent(file.originalname);

  const readStream = fs.createReadStream(filePath);

  const options = {
    method: "PUT",
    hostname: HOSTNAME,
    path: `/${STORAGE_ZONE_NAME}/${fileName}`,
    headers: {
      AccessKey: ACCESS_KEY,
      "Content-Type": "application/octet-stream",
    },
  };

  const reqBunny = https.request(options, (response) => {
    let responseBody = "";

    // Collect response data
    response.on("data", (chunk) => {
      responseBody += chunk;
    });

    response.on("end", () => {
      if (response.statusCode === 201 || response.statusCode === 200) {
        // Delete the file after successful upload
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error in removing file:", err);
          } else {
            console.log("File removed successfully");
          }
        });

        res.status(201).json({
          status: true,
          msg: "File uploaded",
          path: `/${STORAGE_ZONE_NAME}/${fileName}`,
        });
      } else {
        res.status(response.statusCode).json({
          status: false,
          msg: "File upload failed",
          response: responseBody,
        });
      }
    });
  });

  // Error handling for the request
  reqBunny.on("error", (error) => {
    console.error(error);
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error in removing file:", err);
    });
    res.status(500).json({ status: false, msg: "File upload failed!", error: error.message });
  });

  // Pipe the file stream to the BunnyCDN request
  readStream.pipe(reqBunny);
});
