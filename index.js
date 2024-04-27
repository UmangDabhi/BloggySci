const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const route = require("./route/route");
const connectMongoDb = require("./Controllers/connetDB");
const { requireAuth } = require("./middleware/authMiddleware");
dotenv.config();

const app = express();
connectMongoDb();

app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api", route);
app.get("/Create-Blog",requireAuth);
app.get("/My-Blogs",requireAuth);
app.get("*",(req, res, next) => {
  express.static("frontend/browser")(req, res, next);
});
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "browser", "index.html"));
});
app.listen(process.env.PORT, () => {
  console.log("Server Running on " + process.env.PORT);
});
