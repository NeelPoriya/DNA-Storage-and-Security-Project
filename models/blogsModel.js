const mongoose = require('mongoose');


const blogsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

let blogs;
try {
    blogs = mongoose.model('blogs');
} catch (err) {
    blogs = mongoose.model('blogs', blogsSchema);
}

module.exports = blogs;