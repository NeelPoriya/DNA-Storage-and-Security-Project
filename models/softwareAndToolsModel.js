const mongoose = require('mongoose');


const softwareAndToolsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    }
})

let softwareAndTools;
try {
    softwareAndTools = mongoose.model('softwareAndTools');
} catch (err) {
    softwareAndTools = mongoose.model('softwareAndTools', softwareAndToolsSchema);
}

module.exports = softwareAndTools;