const User = require("../model/user");
const Blog = require("../model/Blog");

exports.getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
};

// All the Blog logic Here

exports.getAllBlog = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
};

exports.postBlog = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const user = req.body.user;

  const blog = new Blog({
    title: title,
    description: description,
    image: image,
    user: user,
  });
  try {
    blog.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ blog });
};

exports.editBlog = async (req, res, next) => {
  const { title, description, image } = req.body;
  const blogId = req.params.id;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
      image,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res
      .status(200)
      .json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to update blog" });
  }
};

exports.getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blog });
};

exports.deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};
