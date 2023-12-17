import express from "express";
import helmet from "helmet";
import apiRoute from "./api/routes";
import adminRoute from "./admin/routes";
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";

const PORT = parseInt(process.env["PORT"] ?? "5000");
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

// Add API routes
app.use(apiRoute);

// Add admin routes
app.use("/admin", adminRoute);

// Add error handler
app.use(errorHandler);



app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
// app.listen(PORT, "192.168.243.82",
//     () => console.log(`Server running on port ${PORT}...`));