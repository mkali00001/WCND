const mongoose = require('mongoose');

const accompanyingPersonSchema = new mongoose.Schema({
  fullName: String,
  passportId: String,
  nationality: String,
  relation: String,
  relationOther: String,
  dob: String,
  contact: String,
  specialReq: String,
});

const registeredUserSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Step1
    guidelinesAccepted: { type: Boolean, default: false },
    humanBeingAccepted: { type: Boolean, default: false },

    // Step2: Personal Info
    participantType: { type: String, enum: ['Domestic', 'International'] },
    country: String,
    otherCountry: String,
    fullName: String,
    pronunciation: String,
    title: String,
    languagePreference: String,
    gender: String,
    dateOfBirth: String,
    nationality: String,
    motherTongue: String,
    passportNo: String,
    passportExpiry: String,
    govtId: String,
    email: String,
    altEmail: String,
    phone: String,
    altPhone: String,
    address: String,
    website: String,
    emergencyName: String,
    emergencyRelation: String,
    emergencyPhone: String,
    accompanying: { type: String, default: 'no' },
    accompanyingCount: { type: Number, default: 0 },
    accompanyingPersons: [accompanyingPersonSchema],
    registrationId: String,

    // Step3: Academic + Participation
    designation: String,
    institution: String,
    department: String,
    qualification: String,
    orcid: String,
    prevConference: String,
    registrationType: String,

    // Step4: Accommodation / Travel / Visa / Dietary
    accommodationRequired: String,
    arrivalDateTime: String,
    departureDateTime: String,
    travelAssistanceRequired: String,
    requireVisaSupport: String,
    nearestEmbassyConsulate: String,
    dietaryPreference: String,
    allergies: String,
    allergyDetails: String,
    travelInsuranceStatus: String,
    healthConditions: String,
    willingForFieldTrips: { type: String, default: 'No' },

    // Step5: Payment & Declarations
    feeCategory: String,
    paymentMode: String,
    feeAmount: Number,
    billingInvoiceDetails: String,
    sponsorship: { type: String, default: 'Self-funded' },
    sponsoringOrganizationDetails: String,

    agreeCodeOfConduct: { type: Boolean, default: false },
    confirmEmergencyContactCorrect: { type: Boolean, default: false },
    valuesAffirmation: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RegisteredUser', registeredUserSchema);
