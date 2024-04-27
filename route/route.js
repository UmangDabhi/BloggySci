const express = require("express");
const router = express.Router();

const blogRoute = require("./lib/blog");
const userRoute = require("./lib/user");

router.use("/blog",blogRoute);
router.use("/user",userRoute);

module.exports = router;
