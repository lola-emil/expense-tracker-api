import express from "express";
import helmet from "helmet";
import apiRouter from "./api/routes";
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";
import { ErrorResponse } from "./utils/response-util";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = parseInt(process.env["PORT"] ?? "5000");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// Add API routes
app.use(apiRouter);

// 404 handler
app.use("*", (req, res) => {
    throw new ErrorResponse(404, `Can't ${req.method} ${req.originalUrl}`);
});

// Add error handler
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));