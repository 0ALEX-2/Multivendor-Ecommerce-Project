import express from "express"
import dotenv from "dotenv"
import { dbConnect } from "./src/utils/utils.js";
import helmet from "helmet"
import morgan from "morgan";
import cors from "cors"
import { errorHandler, notFoundErrorHandler } from "./src/middlewares/errorHandler.js";
import userRouter from "./src/routes/userRoutes.js";
import vendorRouter from "./src/routes/vendorRoutes.js";
import productRouter from "./src/routes/productRoutes.js";


dotenv.config(); // Load environment variables
dbConnect()
const app = express();

//Middlewares
app.use(helmet())
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

//Api route
app.use("/api/user",userRouter)
app.use("/api",vendorRouter)
app.use("/api/product",productRouter)

//Error handler middleware
app.use(errorHandler)
app.use(notFoundErrorHandler)

//Starting the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
