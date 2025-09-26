// utils/mail.js
const SibApiV3Sdk = require('sib-api-v3-sdk');
const AppError = require('../utils/AppError');
const STATUS = require('../constant/statusCodes');

require('dotenv').config();

// Configure API key authorization: api-key
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

// const brevoClient = new SibApiV3Sdk.TransactionalEmailsApi();

// const sendEmail = async ({ to, subject, html }) => {
//   const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//   sendSmtpEmail.sender = { email: process.env.EMAIL_USER, name: 'WCND 2026 India' };
//   sendSmtpEmail.to = [{ email: to }];
//   sendSmtpEmail.subject = subject;
//   sendSmtpEmail.htmlContent = html;
  
//   try {
//     await brevoClient.sendTransacEmail(sendSmtpEmail);
//     console.log('Email sent successfully to:', to);
//   } catch (err) {
//     console.error('Brevo Email Error:', err.response ? err.response.body : err.message);
//     // In production, you might want to avoid exposing detailed error messages.
//     // For now, this helps in debugging.
//     throw new AppError('Failed to send email', STATUS.INTERNAL_SERVER_ERROR);
//   }
// };

const sendEmail =async ({ to, subject, html })=>{
  console.log(to, subject, html);
  try {
const  apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const email={
  sender:{email:process.env.EMAIL_USER, name:"WCND 2026 India"},
  to:[{email:to, name:"Participant"}],
  subject:subject,
  htmlContent:`${html}`
}
const res= await apiInstance.sendTransacEmail(email);
console.log(res);
  } catch (error) {
    console.log(error);
  }
}

const verifyemail = (verifyUrl) => {
   return `<p>Dear Participant,</p>
  <p>Welcome to the <strong>World Congress of Natural Democracy 2026 India</strong>.</p>

  <p>To complete your registration, please verify your email address by clicking the secure link below:</p>
  <p><a href="${verifyUrl}" style="color:#972620; font-weight:bold; text-decoration:none;">[Verify My WCND Account]</a></p>

  <h4><strong>Security Note</strong></h4>
  <p>This verification link will expire within 24 hours.</p>

  <h4><strong>Closing</strong></h4>
  <p>We look forward to your active participation in the inaugural <strong>World Congress of Natural Democracy</strong>.</p>

  <p>Warm regards,<br/><strong>WCND 2026 India Secretariat</strong></p>
`};


const forgotPasswordEmail = (name, newPassword) => {
return `
  <p>Hello ${name},</p>
  <p>Your new password is: <strong>${newPassword}</strong></p>
  <p><a href="http://localhost:5173/login">Login here</a></p>
  <p>If you did not request this, please ignore this email.</p>
`;};


const credentialsEmail = (registrationId, email, plainPassword) => `
  <p>Dear Participant,</p>
  <p>Your email has been successfully verified.</p>

  <h4>Your Login Credentials</h4>
  <p><strong>Registration ID:</strong> ${registrationId}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Password:</strong> ${plainPassword}</p>

  <h4><strong>Security Note</strong></h4>
  <p>Please keep your credentials safe. You can change your password after logging in.</p>

  <p>Warm regards,<br/><strong>WCND 2026 India Secretariat</strong></p>
`;

const paymentConfirmationEmail = (registration, payment) => {
  return `
    <p>Dear ${registration.fullName},</p>
    <p>Your registration fee for <strong>WCND 2026</strong> has been successfully received. Thank you for your payment.</p>
    <p>Your registration is now complete. You can access your dashboard to manage submissions and view event details.</p>
    
    <h4>Payment Details:</h4>
    <p><strong>Invoice Number:</strong> WCND-INV-2026-${payment.systemPaymentId.slice(-6)}</p>
    <p><strong>Amount Paid:</strong> ${payment.currency} ${payment.amount / 100}</p>
    <p><strong>Payment Date:</strong> ${new Date(payment.createdAt).toLocaleDateString("en-GB")}</p>

    <p>We have attached the official invoice to this email for your records.</p>
    <p>Warm regards,<br/><strong>WCND 2026 India Secretariat</strong></p>
  `;
};

const announcementEmail = (userName, title, body) => `
  <p>Dear ${userName || 'Participant'},</p>
  <br/>
  <p><strong>${title}</strong></p>
  <br/>
  <p>${body.replace(/\n/g, '<br>')}</p>
  <br/>
  <p>Warm regards,<br/>WCND 2026 India Secretariat</p>
`;


module.exports = {
  sendEmail,
  verifyemail,
  forgotPasswordEmail,
  credentialsEmail,
  paymentConfirmationEmail,
  announcementEmail
};
