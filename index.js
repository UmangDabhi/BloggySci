const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const connectMongoDb = require("./Controllers/connetDB");
const route = require("./route/blog");

dotenv.config();

const app = express();
connectMongoDb();

app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("frontend/browser"));
app.use("/api/", route);
app.listen(process.env.PORT, () => {
  console.log("Server Running on " + process.env.PORT);
});
