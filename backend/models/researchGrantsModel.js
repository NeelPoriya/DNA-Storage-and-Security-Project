import mongoose from "mongoose";

const Schema = mongoose.Schema
const Types = Schema.Types


const researchGrantSchema = new Schema({

    organization: {
        type: Types.String,
        required: true
    },
    amountOfFund: {
        type: Types.String,
        default: 'INR'
    },
    link: {
        type: Types.String,
        required: true
    }


})

let ResearchGrant;
try {
    ResearchGrant = mongoose.model('ResearchGrant');
} catch (err) {
    ResearchGrant = mongoose.model('ResearchGrant', researchGrantSchema, 'research_grants');
}

export default ResearchGrant;