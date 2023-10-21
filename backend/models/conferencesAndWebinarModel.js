import mongoose from "mongoose";

const Schema = mongoose.Schema
const Types = Schema.Types

const conferencesAndWebinarSchema = new Schema({
    event: {
        type: Types.String,
        required: true
    },
    type: {
        type: Types.String,
        required: true
    },
    organization: {
        type: [Types.String],
        required: true
    },
    link: {
        type: Types.String,
        required: true
    }
})

let ConferencesAndWebinar;
try {
    ConferencesAndWebinar = mongoose.model('ConferencesAndWebinar');
} catch (err) {
    ConferencesAndWebinar = mongoose.model('ConferencesAndWebinar', conferencesAndWebinarSchema,"conferences_webinars");
}

export default ConferencesAndWebinar;