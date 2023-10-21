import mongoose from "mongoose";

const Schema = mongoose.Schema
const Types = Schema.Types


const simulationToolSchema = new Schema({

    Name: {
        type: Types.String,
        required: true
    },
    type: {
        type: Types.String,
        required: true
    },
    link: {
        type: Types.String,
        required: true
    }
})

let SimulationTool;
try {
    SimulationTool = mongoose.model('SimulationTool');
} catch (err) {
    SimulationTool = mongoose.model('SimulationTool', simulationToolSchema, 'simulation_tools');
}

export default SimulationTool;