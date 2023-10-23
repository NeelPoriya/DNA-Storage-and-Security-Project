import connectDB from "./index"
import Patent from "./models/patentModel"
import {data} from "@data/patents"

export const addData = async() => {
    try{
        await connectDB()
        const insertData = data.map((item) => {
            return {
                title: item["Title"],
                type: "Patent",
                authors: item["Organization / Authors"].split(", ").map(str => str.trim()),
                link: item["Link"]
            }
        })
        await Patent.insertMany(insertData)
        // await Patent.deleteMany({})
    }catch(error){
        throw error
    }
}