import mongoose from "mongoose";

import { resourceTypes } from "@backend/constants";

const Schema = mongoose.Schema
const Types = Schema.Types


const articlePaperSchema = new Schema({

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
        required: true,
        enum: resourceTypes
    },
    authors: {
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

let ArticlePaper;
try {
    ArticlePaper = mongoose.model('ArticlePaper');
} catch (err) {
    ArticlePaper = mongoose.model('ArticlePaper', articlePaperSchema, 'article_papers');
}

export default ArticlePaper;