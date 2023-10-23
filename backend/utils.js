import connectDB from "./index"
import Software from "./models/softwareModel"
import {data} from "@data/softwares"

export const addData = async() => {
    try{
        await connectDB()
        const insertData = data.map((item) => {
            return {
                title: item["Title"],
                description: item["Description"],
                type: "Software",
                link: item["Link"]
            }
    })
        await Software.insertMany(insertData)
        // await Software.deleteMany({})
    }catch(error){
        throw error
    }
}