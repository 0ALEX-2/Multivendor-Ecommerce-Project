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
import brandRouter from "./src/routes/brandRoutes.js";
import categoryRouter from "./src/routes/categoryRoutes.js";
import subCategoryRouter from "./src/routes/subCategoryRoutes.js";
import wishlistRouter from "./src/routes/wishlistRoutes.js";
import reviewRouter from "./src/routes/reviewRoutes.js";


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
app.use("/api/brand",brandRouter)
app.use("/api/category",categoryRouter)
app.use("/api/subcategory",subCategoryRouter)
app.use("/api/wishlist",wishlistRouter)
app.use("/api/review",reviewRouter)

//Error handler middleware
app.use(errorHandler)
app.use(notFoundErrorHandler)

//Starting the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
