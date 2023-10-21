import mongoose from "mongoose";

const Schema = mongoose.Schema
const Types = Schema.Types


const researchPaperSchema = new Schema({

    title: {
        type: Types.String,
        required: true
    },
    topics: {
        type: [Types.String],
        required: true
    },
    type: {
        type: Types.String,
        required: true
    },
    author: {
        type: [Types.String],
        required: true
    },
    publishedDate: {
        type: Types.Date,
        required: true
    },
    source: {
        type: Types.String,
        required: true
    },
    link: {
        type: Types.String,
        required: true
    }


})

let ResearchPaper;
try {
    ResearchPaper = mongoose.model('ResearchPaper');
} catch (err) {
    ResearchPaper = mongoose.model('ResearchPaper', researchPaperSchema, 'research_papers');
}

export default ResearchPaper;