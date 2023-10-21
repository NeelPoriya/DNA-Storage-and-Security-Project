import mongoose from "mongoose";

const Schema = mongoose.Schema
const Types = Schema.Types


const patentSchema = new Schema({

    title: {
        type: Types.String
    },
    authors: {
        type: [Types.String],
        required: true
    },
    link: {
        type: Types.String,
        required: true
    }


})

let Patents;
try {
    Patents = mongoose.model('Patent');
} catch (err) {
    Patents = mongoose.model('Patent', patentSchema,"patents");
}

export default Patents;