import mongoose from "mongoose";

const Schema = mongoose.Schema
const Types = Schema.Types


const courseAndTutorialSchema = new Schema({

    title: {
        type: Types.String,
        required: true
    },
    type: {
        type: Types.String,
        required: true
    },
    authors: {
        type: [Types.String],
        required: true
    },
    link: {
        type: Types.String,
        required: true
    }
})

let CourseAndTutorial;
try {
    CourseAndTutorial = mongoose.model('CourseAndTutorial');
} catch (err) {
    CourseAndTutorial = mongoose.model('CourseAndTutorial', courseAndTutorialSchema, 'courses_tutorials');
}

export default CourseAndTutorial;