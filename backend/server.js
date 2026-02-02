const express = require("express");
const fs = require("fs");
const cors = require("cors"); // <- добавили

const app = express();
const PORT = 3001;

app.use(cors()); // <- включили CORS

app.get("/api/data", (req, res) => {
    const json = fs.readFileSync("data/objects.json", "utf-8");
    res.json(JSON.parse(json));
});

app.listen(PORT, () => {
    console.log(`API запущен: http://localhost:${PORT}/api/data`);
});
