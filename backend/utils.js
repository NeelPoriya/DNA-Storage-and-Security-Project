import connectDB from "./index"
import Project from "./models/projectModel"
import {data} from "@data/projects"

export const addData = async() => {
    try{
        await connectDB()
        const insertData = data.map((item) => {
            return {
                title: item["Title"],
                type: "Project",
                fundingAgency: item["Funding Agency"],
                organization: item["Organization"],
                link: item["Link"]
            }
        })
        await Project.insertMany(insertData)
        // await Project.deleteMany({})
    }catch(error){
        throw error
    }
}