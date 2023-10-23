import connectDB from "./index"
import Course from "./models/courseModel"
import {data} from "@data/courses"

export const addData = async() => {
    try{
        await connectDB()
        const insertData = data.map((item) => {
            return {
                title: item["Title"],
                type: item["Type"],
                authors: item["Authors"].split(", ").map(str => str.trim()),
                link: item["Link"]
            }
        })
        await Course.insertMany(insertData)
        // await Course.deleteMany({})
    }catch(error){
        throw error
    }
}