const SibApiV3Sdk = require('sib-api-v3-sdk');
const AppError = require('../utils/AppError');
const STATUS = require('../constant/statusCodes');
const fs = require("fs");
const path = require("path");
require('dotenv').config();

// Configure API key authorization: api-key
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const baseStyle = `
  font-family: Arial, sans-serif;
  color: #333;
  line-height: 1.5;
  margin: 0;
  padding: 0;
`;

const containerStyle = `
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
`;

const headerStyle = `
  text-align: center;
  padding-bottom: 20px;
`;

const paragraphStyle = `
  margin: 0 0 16px 0;
  font-size: 16px;
`;

const smallNoteStyle = `
  font-size: 14px;
  color: #666;
  margin-top: 0;
`;

const buttonStyle = `
  display: inline-block;
  background-color: #972620;
  color: #fff;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
`;

const footerStyle = `
  margin-top: 30px;
  font-size: 14px;
  color:#444;
  text-align: center;
`;
const logo_url = `${process.env.URL}/img/logo.jpg`
/**
 * Send email with embedded logo
 */
const sendEmail = async ({ to, subject, html }) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.sender = { email: process.env.EMAIL_USER, name: 'WCND 2026 India' };
  sendSmtpEmail.to = [{ email: to, name: "Participant" }];
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = html;
  sendSmtpEmail.replyTo = { email: process.env.EMAIL_USER, name: 'WCND 2026 India' };

  


  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully to:', to, response);
  } catch (err) {
    console.error('Brevo Email Error:', err.response ? err.response.body : err.message);
    throw new AppError('Failed to send email', STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Email templates
 */
const verifyemail = (verifyUrl) => `
  <div style="${containerStyle} ${baseStyle}">
    <div style="${headerStyle}">
      <img src=${logo_url} alt="WCND 2026 India" style="max-width:150px;" />
    </div>
    <p style="${paragraphStyle}">Dear Participant,</p>
    <p style="${paragraphStyle}">Welcome to the <strong>World Congress of Natural Democracy 2026 India</strong>.</p>
    <p style="${paragraphStyle}">To complete your registration, please verify your email address by clicking the secure link below:</p>
    <p style="text-align:center;">
      <a href="${verifyUrl}" style="${buttonStyle}">Verify My WCND Account</a>
    </p>
    <h4 style="color:#972620;">Security Note</h4>
    <p style="${smallNoteStyle}">This verification link will expire within 24 hours.</p>
    <h4 style="color:#972620;">Closing</h4>
    <p style="${paragraphStyle}">We look forward to your active participation in the inaugural <strong>World Congress of Natural Democracy</strong>.</p>
    <p style="${footerStyle}">Warm regards,<br/><strong>WCND 2026 India Secretariat</strong></p>
  </div>
`;

const forgotPasswordEmail = (name, newPassword) => `
  <div style="${containerStyle} ${baseStyle}">
    <div style="${headerStyle}">
      <img src=${logo_url} alt="WCND 2026 India" style="max-width:150px;" />
    </div>
    <p style="${paragraphStyle}">Hello ${name},</p>
    <p style="${paragraphStyle}">Your new password is: <strong>${newPassword}</strong></p>
    <p style="text-align:center;">
      <a href="https://wcnd.onrender.com/login" style="${buttonStyle}">Login here</a>
    </p>
    <p style="${smallNoteStyle}">If you did not request this, please ignore this email.</p>
    <p style="${footerStyle}">Warm regards,<br/><strong>WCND 2026 India Secretariat</strong></p>
  </div>
`;

const credentialsEmail = (registrationId, email, plainPassword) => `
  <div style="${containerStyle} ${baseStyle}">
    <div style="${headerStyle}">
      <img src=${logo_url} alt="WCND 2026 India" style="max-width:150px;" />
    </div>
    <p style="${paragraphStyle}">Dear Participant,</p>
    <p style="${paragraphStyle}">Your email has been successfully verified.</p>

    <h4 style="color:#972620;">Your Login Credentials</h4>
    <p style="${paragraphStyle}"><strong>Registration ID:</strong> ${registrationId}</p>
    <p style="${paragraphStyle}"><strong>Email:</strong> ${email}</p>
    <p style="${paragraphStyle}"><strong>Password:</strong> ${plainPassword}</p>

    <h4 style="color:#972620;">Security Note</h4>
    <p style="${smallNoteStyle}">Please keep your credentials safe. You can change your password after logging in.</p>

    <p style="${footerStyle}">Warm regards,<br/><strong>WCND 2026 India Secretariat</strong></p>
  </div>
`;

const paymentConfirmationEmail = (registration, payment) => `
  <div style="${containerStyle} ${baseStyle}">
    <div style="${headerStyle}">
      <img src=${logo_url} alt="WCND 2026 India" style="max-width:150px;" />
    </div>
    <p style="${paragraphStyle}">Dear ${registration.fullName},</p>
    <p style="${paragraphStyle}">Your registration fee for <strong>WCND 2026</strong> has been successfully received. Thank you for your payment.</p>
    <p style="${paragraphStyle}">Your registration is now complete. You can access your dashboard to manage submissions and view event details.</p>
    
    <h4 style="color:#972620;">Payment Details:</h4>
    <p style="${paragraphStyle}"><strong>Invoice Number:</strong> WCND-INV-2026-${payment.systemPaymentId.slice(-6)}</p>
    <p style="${paragraphStyle}"><strong>Amount Paid:</strong> ${payment.currency} ${payment.amount / 100}</p>
    <p style="${paragraphStyle}"><strong>Payment Date:</strong> ${new Date(payment.createdAt).toLocaleDateString("en-GB")}</p>

    <p style="${footerStyle}">We have attached the official invoice to this email for your records.</p>
    <p style="${footerStyle}">Warm regards,<br/><strong>WCND 2026 India Secretariat</strong></p>
  </div>
`;

const announcementEmail = (userName, title, body) => `
  <div style="${containerStyle} ${baseStyle}">
    <div style="${headerStyle}">
      <img src=${logo_url} alt="WCND 2026 India" style="max-width:150px;" />
    </div>
    <p style="${paragraphStyle}">Dear ${userName || 'Participant'},</p>
    <br/>
    <p style="font-weight:bold; font-size:18px; color:#972620;">${title}</p>
    <br/>
    <p style="${paragraphStyle}">${body.replace(/\n/g, '<br>')}</p>
    <br/>
    <p style="${footerStyle}">Warm regards,<br/>WCND 2026 India Secretariat</p>
  </div>
`;

module.exports = {
  sendEmail,
  verifyemail,
  forgotPasswordEmail,
  credentialsEmail,
  paymentConfirmationEmail,
  announcementEmail
};


