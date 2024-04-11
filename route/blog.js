const express = require('express');
const router = express.Router();
const blog = require("../Controllers/blog");

router.route("/listBlog").get(blog.getAllBlogs);
router.route("/getBlog/:id").get(blog.getBlogByID);
router.route("/createBlog").post(blog.createBlog);
router.route("/updateBlog/:id").post(blog.updateBlog);
router.route("/deleteBlog/:id").delete(blog.deleteBlog);

module.exports = router;