import mongoose from "mongoose";
import ArticlePaper from "../models/articlePaperModel";

export const getAllPapers = async(req,res) => {
    try {
        const papers = await ArticlePaper.find({})
        return res.status(200).json(papers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const createPaper = async(req,res) => {
    try {
        const paper = await ArticlePaper.create(req.body)
        return res.status(201).json(paper);
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return res.status(400).json({ msg: error.message })
        }
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const getPaper = async(req,res) => {
    try {
        const paper = await ArticlePaper.findById(req.query.paper_id)
        if (!paper) {
            return res.status(404).json({ msg: "paper Not Found" })
        }
        return res.status(200).json(paper);
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return res.status(400).json({ msg: error.message })
        }
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const updatePaper = async (req, res) => {
    try {
        const paper = await ArticlePaper.findByIdAndUpdate(req.query.paper_id, req.body, {
            new: true,
            runValidators: true
        })
        if (!paper) {
            return res.status(404).json({ msg: "paper Not Found" })
        }
        return res.status(200).json(paper);
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return res.status(400).json({ msg: error.message })
        }
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const deletePaper = async (req, res) => {
    try {
        const paper = await ArticlePaper.findByIdAndDelete(req.query.paper_id)
        if (!paper) {
            return res.status(404).json({ msg: "paper Not Found" })
        }
        return res.status(200).json({ msg: "paper Deleted" });
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return res.status(400).json({ msg: error.message })
        }
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}