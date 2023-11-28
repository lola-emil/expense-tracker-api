const express = require("express");
const helmet = require("helmet");

const PORT = parseInt(process.env["PORT"] ?? "5000");
const app = express();

app.use(express.json());
app.use(helmet());


// Add API routes
app.get("/", (req, res) => {
    res.json({
        message: 'Hello'
    });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));