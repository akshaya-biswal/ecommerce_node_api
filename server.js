require("dotenv").config();
const express = require("express");
const app = express();
const DbConnect = require("./database");
const router = require("./routes");

const PORT = process.env.PORT || 5000;

// Database Connected
DbConnect();

// Routers Added
app.use(express.json({ limit: "8mb" }));
app.use(router);

app.listen(PORT, () => `Listening on port ${PORT}`);
