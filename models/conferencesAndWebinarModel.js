const mongoose = require('mongoose');


const conferencesAndWebinarSchema = new mongoose.Schema({

    event: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    organization: {
        type: [String],
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

let conferencesAndWebinar;
try {
    conferencesAndWebinar = mongoose.model('conferencesAndWebinar');
} catch (err) {
    conferencesAndWebinar = mongoose.model('conferencesAndWebinar', conferencesAndWebinarSchema);
}

module.exports = conferencesAndWebinar;