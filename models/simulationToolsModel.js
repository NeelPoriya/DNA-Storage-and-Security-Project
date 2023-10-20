const mongoose = require('mongoose');


const simulationToolsSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

let simulationTools;
try {
    simulationTools = mongoose.model('simulationTools');
} catch (err) {
    simulationTools = mongoose.model('simulationTools', simulationToolsSchema);
}

module.exports = simulationTools;