const mongoose = require('mongoose');

const registeredUserSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    guidelinesAccepted: { type: Boolean, default: false },
    humanBeingAccepted: { type: Boolean, default: false },

    registrationType: String,
    atPresent: String,
    authorPresenter: String,
    participation: String,
    presentation: String,
    modeOfParticipation: String,

    title: String,
    firstName: String,
    lastName: String,
    pronunciation: String,
    gender: String,
    dateOfBirth: String,
    nationality: String,
    website: String,

    professionalPhone: String,
    personalPhone: String,
    passportNo: String,
    incomeCategory: String,
    designation: String,
    affiliation: String,
    department: String,
    university: String,

    cityName: String,
    stateProvince: String,
    zipCode: String,
    countryName: String,

    alternativeEmail: String,
    motherTongue: String,

    abstractMessage: String,
    abstractConfirmation: { type: Boolean, default: false },
    finalMessage: String,
    finalConfirmation: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('RegisteredUser', registeredUserSchema);
