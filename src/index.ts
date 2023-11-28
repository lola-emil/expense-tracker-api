import express from "express";
import helmet from "helmet";
import apiRoute from "./api/routes";

const PORT = parseInt(process.env["PORT"] ?? "5000");
const app = express();

app.use(express.json());
app.use(helmet());


// Add API routes
app.use(apiRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));