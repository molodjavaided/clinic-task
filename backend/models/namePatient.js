const mongoose = require('mongoose');

const namePatientShema = new mongoose.Schema({
    namePatient: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: false
    },
    owner: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('namePatient', namePatientShema);