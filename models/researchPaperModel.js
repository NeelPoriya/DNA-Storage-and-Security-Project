const mongoose = require('mongoose');


const researchPaperSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    topics: {
        type: [String],
        required: true
    },
    type: {
        type: String,
        required: true
    },
    author: {
        type: [String],
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }


})

let researchPaper;
try {
    researchPaper = mongoose.model('researchPaper');
} catch (err) {
    researchPaper = mongoose.model('researchPaper', researchPaperSchema);
}

module.exports = researchPaper;