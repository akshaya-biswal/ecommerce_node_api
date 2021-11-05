require("dotenv").config();
const express = require("express");
const app = express();
const DbConnect = require("./database");

const PORT = process.env.PORT || 5000;
DbConnect();

app.listen(PORT, () => `Listening on port ${PORT}`);
