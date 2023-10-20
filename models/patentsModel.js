const mongoose = require('mongoose');


const patentsSchema = new mongoose.Schema({

    title: {
        type: String
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

let patents;
try {
    patents = mongoose.model('patents');
} catch (err) {
    patents = mongoose.model('patents', patentsSchema);
}

module.exports = patents;