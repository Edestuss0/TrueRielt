const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: "20mb" }));


const DATA_PATH = "data/objects.json";

// GET — получить все объекты
app.get("/api/data", (req, res) => {
    const json = fs.readFileSync(DATA_PATH, "utf-8");
    res.json(JSON.parse(json));
});

// POST — добавить новый объект
app.post("/api/data", (req, res) => {
    const newObject = req.body;

    if (!newObject) {
        return res.status(400).json({ error: "Нет данных" });
    }

    const json = fs.readFileSync(DATA_PATH, "utf-8");
    const objects = JSON.parse(json);

    const objectWithId = {
        id: Date.now(), // 👈 простой уникальный id
        ...newObject
    };

    objects.push(objectWithId);

    fs.writeFileSync(DATA_PATH, JSON.stringify(objects, null, 2));

    res.json(objectWithId);
});

app.listen(PORT, () => {
    console.log(`API запущен: http://localhost:${PORT}`);
});
