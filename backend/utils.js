import connectDB from "./index"
import SimulationTool from "./models/simulationToolModel"
import {data} from "@data/simulation_tools"

export const addData = async() => {
    try{
        await connectDB()
        const insertData = data.map((item) => {
            return {
                name: item["Name"],
                type: "Simulation Tool",
                link: item["Link"]
            }
        })
        await SimulationTool.insertMany(insertData)
        // await SimulationTool.deleteMany({})
    }catch(error){
        throw error
    }
}