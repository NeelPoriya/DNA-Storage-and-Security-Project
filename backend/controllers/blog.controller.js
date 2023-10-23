import mongoose from "mongoose";
import Blog from "../models/blogsModel";

export const getAllBlogs = async(req,res) => {
    try {
        const blogs = await Blog.find({})
        return res.status(200).json(blogs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const createBlog = async(req,res) => {
    try {
        const blog = await Blog.create(req.body)
        return res.status(201).json(blog);
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return res.status(400).json({ msg: error.message })
        }
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const getBlog = async(req,res) => {
    try {
        const blog = await Blog.findById(req.query.blog_id)
        if (!blog) {
            return res.status(404).json({ msg: "blog Not Found" })
        }
        return res.status(200).json(blog);
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return res.status(400).json({ msg: error.message })
        }
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.query.blog_id, req.body, {
            new: true,
            runValidators: true
        })
        if (!blog) {
            return res.status(404).json({ msg: "blog Not Found" })
        }
        return res.status(200).json(blog);
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return res.status(400).json({ msg: error.message })
        }
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.query.blog_id)
        if (!blog) {
            return res.status(404).json({ msg: "blog Not Found" })
        }
        return res.status(200).json({ msg: "blog Deleted" });
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return res.status(400).json({ msg: error.message })
        }
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}