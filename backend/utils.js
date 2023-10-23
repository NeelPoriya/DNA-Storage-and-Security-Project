import connectDB from "./index"
import Blog from "./models/blogsModel"
import {data} from "@data/blogs"

export const addData = async() => {
    try{
        await connectDB()
        const insertData = data.map((item) => {
            return {
                title: item["Title"],
                type: item["Type"],
                organization: item["Organization"],
                link: item["Link"]
            }
        })
        await Blog.insertMany(insertData)
        // await Blog.deleteMany({})
    }catch(error){
        throw error
    }
}