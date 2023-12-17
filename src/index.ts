import express from "express";
import helmet from "helmet";
import apiRoute from "./api/routes";
import adminRoute from "./admin/routes";
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";
import { ErrorResponse } from "./utils/response-util";

const PORT = parseInt(process.env["PORT"] ?? "5000");
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());


// Add API routes
app.use(apiRoute);

// Add admin routes
app.use("/admin", adminRoute);

app.use("*", (req, res) => {
    throw new ErrorResponse(404, `Can't ${req.method} ${req.originalUrl}`);
});
// Add error handler
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
// app.listen(PORT, "192.168.243.82",
//     () => console.log(`Server running on port ${PORT}...`));