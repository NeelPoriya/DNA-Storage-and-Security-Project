const mongoose = require('mongoose');


const youtubeContentSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

let youtubeContent;
try {
    youtubeContent = mongoose.model('youtubeContent');
} catch (err) {
    youtubeContent = mongoose.model('youtubeContent', youtubeContentSchema);
}

module.exports = youtubeContent;