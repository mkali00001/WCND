const userModel = require('../models/userModel');
const Query = require('../models/queryModel');
const { sendEmail } = require('../services/mail');



const createQuery = async (req, res) => {
  const user = req.user;
  if (user.role === 'admin') {
    return res.status(401).json({ error: 'You have no access to create a query' });
  }

  const { querydata } = req.body;
  const userData = await userModel.findById(user.id);

  const query = new Query({
    user: user.id,
    userEmail: userData.email,
    userName: userData.name,
    query: querydata,
  });

  await query.save();
  console.log(query);

  //  Send email using sendEmail
  try {
    await sendEmail({
      to: process.env.EMAIL_USER, // Admin receives the query
      subject: "WCND 2026 - New Query Received",
      html: `
        <p>New query received:</p>
        <p><strong>Name:</strong> ${userData.name}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Query:</strong><br/>${querydata}</p>
      `,
    });

    console.log("Mail sent to admin successfully");
  } catch (err) {
    console.error("Error sending mail to admin:", err.message);
  }

  res.status(201).json({ query });
};


const sendQueryResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const { queryResponse } = req.body;

    const query = await Query.findByIdAndUpdate(
      id,
      { $set: { queryResponse } },
      { new: true }
    );

    if (!query) {
      return res.status(404).json({ error: "Query not found" });
    }

    // ✅ Send email using sendEmail
    try {
      await sendEmail({
        to: query.userEmail,
        subject: "WCND 2026 - Response to Your Query",
        html: `
          <p>Hi ${query.userName},</p>
          <p>Thank you for reaching out to us.</p>
          <p><strong>Our Response:</strong></p>
          <p>${queryResponse.replace(/\n/g, "<br/>")}</p>
          <br/>
          <p>Warm regards,<br/><strong>WCND 2026 India Secretariat</strong></p>
        `,
      });

      console.log("Mail sent to user successfully");
    } catch (error) {
      console.error("Error sending mail to user:", error.message);
    }

    res.status(200).json({ message: "Query Response saved!", query });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const allQueries = async (req, res) => {
  const queries = await Query.find();
  res.status(200).json(queries);
};

module.exports = { createQuery, sendQueryResponse, allQueries };
