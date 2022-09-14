import express, { json } from "express";
import "express-async-errors";
import errorHandler from "./middlewares/errorHandler.js";
import router from "./routes/index.js";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandler);

export default app;
