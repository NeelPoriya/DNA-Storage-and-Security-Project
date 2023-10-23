import connectDB from "./index"
import Grant from "./models/grantModel"
import {data} from "@data/grants"

export const addData = async() => {
    try{
        await connectDB()
        const insertData = data.map((item) => {
            return {
                organization: item["Organization"],
                type: "Grant",
                amountOfFund: item["Amount of Fund(in USD)"],
                link: item["Link"]
            }
        })
        await Grant.insertMany(insertData)
        // await Grant.deleteMany({})
    }catch(error){
        throw error
    }
}