const mongoose = require('mongoose');


const researchGrantsSchema = new mongoose.Schema({

    organization: {
        type: String,
        required: true
    },
    amountOfFund: {
        type: String,
        default: 'USD'
    },
    link: {
        type: String,
        required: true
    }


})

let researchGrants;
try {
    researchGrants = mongoose.model('researchGrants');
} catch (err) {
    researchGrants = mongoose.model('researchGrants', researchGrantsSchema);
}

module.exports = researchGrants;