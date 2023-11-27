import express from "express";
import helmet from "helmet";

const PORT = parseInt(process.env["PORT"] ?? "5000");
const app = express();

app.use(express.json());
app.use(helmet());

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));