import connectDB from "./index"
import Event from "./models/eventModel"
import {data} from "@data/events"

export const addData = async() => {
    try{
        await connectDB()
        const insertData = data.map((item) => {
            return {
                name: item["Event Name"],
                type: item["Type"],
                organizations: item["Organization"].split(", ").map(str => str.trim()),
                link: item["Link"]
            }
        })
        await Event.insertMany(insertData)
        // await Event.deleteMany({})
    }catch(error){
        throw error
    }
}