const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Portfolio API is running");
});

const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port: ${process.env.PORT || 5000}`);
  });
};

startServer();
