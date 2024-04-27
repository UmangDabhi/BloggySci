const Blog = require("../Models/blogs");

const createBlog = async (req, res) => {
  try {
    const { title, snippet, desc, author } = req.body;
    const newBlog = new Blog({ title, snippet, desc, author });
    await newBlog.save();
    res.status(201).json({ message: "Blog Added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ message: "Blog Not Found" });
    }
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getAllBlogs = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    if (!keyword) {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      return res.status(200).json(blogs);
    }
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { author: { $regex: keyword, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });
    if (blogs.length === 0) {
      return res
        .status(404)
        .json({ message: "No blogs found matching the search criteria" });
    } else {
      return res.status(200).json(blogs);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getUsersBlog = async (req,res)=>{
  try{
    const author = req.params.author;
    const blogs = await Blog.find({ author: { $regex: author, $options: "i" }}).sort({createdAt:-1});
    if (blogs.length === 0) {
      return res
        .status(404)
        .json({ message: "No blogs found matching the search criteria" });
      } else {
        return res.status(200).json(blogs);
      }
  }catch(err){
    console.log(err);
    res.status(500).json({message:"Internal Server Error"});
  }
}
const getBlogByID = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    res.status(200).json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Blog.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Blog Not Found" });
    }
    res.status(200).json({ message: "Blog Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createBlog,
  updateBlog,
  getAllBlogs,
  getUsersBlog,
  getBlogByID,
  deleteBlog,
};
