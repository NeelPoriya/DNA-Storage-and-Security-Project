import connectDB from "./index"
import YoutubeContent from "./models/youtubeContentModel"
import {data} from "@data/youtube"

export const addData = async() => {
    try{
        await connectDB()
        const insertData = data.map((item) => {
            return {
                title: item["Title"],
                channel: item["channel"],
                type: "You Tube",
                link: item["Link"]
            }
    })
        await YoutubeContent.insertMany(insertData)
        // await YoutubeContent.deleteMany({})
    }catch(error){
        throw error
    }
}