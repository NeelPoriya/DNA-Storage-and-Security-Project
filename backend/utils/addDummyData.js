import connectDB from "../index"
import Paper from "../models/articlePaperModel"
import { data } from "@data/test"

export const addData = async () => {
    try {
        await connectDB()
        const insertData = data.map((item) => {
            return {
                title: item["Title"],
                topics: item["Topics"].trim().split(","),
                type: "Articles And Papers",
                authors: item["Authors"].trim().split(","),
                publishedDate: item["Publication Date"],
                source: item["Source"],
                link: item["Link"]
            }
        })
        await Paper.insertMany(insertData)
    } catch (error) {
        throw error
    }
}