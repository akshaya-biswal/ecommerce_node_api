const mongoose = require("mongoose");

const DbConnect = () => {
  const DB_URL = process.env.DB_URL;

  console.log("DB_URL", DB_URL);

  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("DB connected...");
  });
};

module.exports = DbConnect;
