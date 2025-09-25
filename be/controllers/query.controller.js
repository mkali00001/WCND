const userModel = require('../models/userModel');
const Query = require('../models/queryModel');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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

  const mailOptions = {
    from: userData.email,
    to: process.env.EMAIL_USER,
    subject: 'New Query Received',
    text: `New query from ${userData.name} (${userData.email}):\n\n${querydata}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending mail to admin:', err.message);
    } else {
      console.log('Mail sent to admin:', info.response);
    }
  });

  res.status(201).json({ query });
};

const sendQueryResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const { queryResponse } = req.body;

    const query = await Query.findByIdAndUpdate(id, { $set: { queryResponse } }, { new: true });

    if (!query) {
      return res.status(404).json({ error: 'Query not found' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: query.userEmail,
      subject: 'Response to your query',
      text: `Hi ${query.userName},\n\nAdmin has responded to your query:\n\n${queryResponse}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending mail to user:', err.message);
      } else {
        console.log('Mail sent to user:', info.response);
      }
    });

    res.status(200).json({ message: 'Query Response saved!', query });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const allQueries = async (req, res) => {
  const queries = await Query.find();
  res.status(200).json(queries);
};

module.exports = { createQuery, sendQueryResponse, allQueries };
