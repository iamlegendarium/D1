const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const router = require("./routes/user.route.js");
const mongoose = require("mongoose");

const port = process.env.port;
const URI = process.env.URI;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(port, () => {
  mongoose
    .connect(URI)
    .then(() => {
      console.log(
        `Database is connected and server is running on localhost:${port}`
      );
    })
    .catch((error) => {
      console.log(
        `Database is not connected and server is not running on localhost:${port}`
      );
    });
});
