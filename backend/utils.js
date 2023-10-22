import connectDB from "./index"
import ArticlePaper from "./models/articlePaperModel"
import {data} from "@data/articles_papers"

export const resourceTypes = [
    "Articles And Papers",
    "Blog",
    "Company",
    "Course",
    "Event",
    "Grant",
    "Patent",
    "Project",
    "Simulation Tool",
    "Software",
    "You Tube"
]

export const addData = async() => {
    try{
        await connectDB()
        const insertData = data.map((item) => {
            return {
                title: item["Title"],
                topics: item["Topics"].split(", ").map((topic) => topic.trim()),
                type: item["Type"],
                authors: item["Authors"].split(", ").map((topic) => topic.trim()),
                publishedDate: item["Published Date"],
                source: item["Source"],
                link: item["Link"]
            }
        })
        await ArticlePaper.insertMany(insertData)
        // await ArticlePaper.deleteMany({})
    }catch(error){
        throw error
    }
}