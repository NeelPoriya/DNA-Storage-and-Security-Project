const mongoose = require('mongoose');


const courseAndTutorialsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    authors: {
        type: [String],
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

let courseAndTutorials;
try {
    courseAndTutorials = mongoose.model('courseAndTutorials');
} catch (err) {
    courseAndTutorials = mongoose.model('courseAndTutorials', courseAndTutorialsSchema);
}

module.exports = courseAndTutorials;