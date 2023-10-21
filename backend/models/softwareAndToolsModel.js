import mongoose from "mongoose";

const Schema = mongoose.Schema
const Types = Schema.Types


const softwareAndToolSchema = new Schema({

    title: {
        type: Types.String,
        required: true
    },
    description: {
        type: Types.String,
        required: true
    },
    link: {
        type: Types.String,
        required: true
    }
})

let SoftwareAndTool;
try {
    SoftwareAndTool = mongoose.model('SoftwareAndTool');
} catch (err) {
    SoftwareAndTool = mongoose.model('SoftwareAndTool', softwareAndToolSchema, 'software_tools');
}

export default SoftwareAndTool;