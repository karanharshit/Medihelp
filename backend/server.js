const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require("./routes/routes");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("database connected")
);

app.use(express.json());

app.use(cors());
app.use(cookieParser());
app.use("/app", routesUrls);
app.listen(4000, () => console.log("Server is up and running"));
