import connectDB from "./index"
import Company from "./models/companyModel"
import { data } from "@data/companies"

export const addData = async () => {
    try {
        await connectDB()
        const insertData = data.map((item) => {
            return {
                organization: item["Organization"],
                logoPath: item["path"],
                type: "Company",
                description: item["Description"]
            }
        })
        await Company.insertMany(insertData)
    } catch (error) {
        throw error
    }
}