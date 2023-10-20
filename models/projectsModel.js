const mongoose = require('mongoose');


const projectsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    fundingAgency: {
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

let projects;
try {
    projects = mongoose.model('projects');
} catch (err) {
    projects = mongoose.model('projects', projectsSchema);
}

module.exports = projects;