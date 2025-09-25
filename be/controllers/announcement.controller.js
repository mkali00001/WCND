const Announcement = require('../models/announcementModel');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
require('dotenv').config();
const AppError = require('../utils/AppError');
const  STATUS  = require('../constant/statusCodes');
const sendResponse = require('../utils/sendResponse');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const createAnnouncement = async (req, res, next) => {
  try {
    const { title, body, audience } = req.body;

    if (!title || !body || !audience) {
      return next(new AppError('All fields are required', STATUS.BAD_REQUEST));
    }

    const announcement = new Announcement({
      title,
      body,
      audience,
      sentBy: req.user.id,
      status: 'draft', // Default status
    });

    const createdAnnouncement = await announcement.save();
    await createdAnnouncement.populate('sentBy', 'name');

    sendResponse(res, STATUS.CREATED, 'Announcement created successfully', createdAnnouncement);
  } catch (error) {
    next(error);
  }
};

const getAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find({})
      .populate('sentBy', 'name')
      .sort({ createdAt: -1 });
    sendResponse(res, STATUS.OK, 'Announcements fetched successfully', announcements);
  } catch (error) {
    next(error);
  }
};

const sendAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return next(new AppError('Announcement not found', STATUS.NOT_FOUND));
    }

    if (announcement.status === 'sent') {
      sendResponse(res, STATUS.BAD_REQUEST, 'Announcement has already been sent');
    }

    // 1. Determine audience and fetch users
    let usersQuery = {};
    if (announcement.audience === 'Registered' || announcement.audience === 'All Users') {
      usersQuery = { role: 'user' };
    } else {
      console.warn(
        `Audience "${announcement.audience}" is not implemented. No emails will be sent.`
      );
      usersQuery = { _id: null }; // Query that finds no one
    }

    const users = await User.find(usersQuery).select('email name');

    // 2. Send emails in parallel
    if (users.length > 0) {
      const emailPromises = users.map((user) => {
        return transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: `Announcement: ${announcement.title}`,
          html: `
            <p>Dear ${user.name || 'Participant'},</p>
            <br/>
            <p>${announcement.title}</p>
            <br/>
            <p>${announcement.body.replace(/\n/g, '<br>')}</p>
            <br/>
            <p>Warm regards,<br/>WCND 2026 India Secretariat</p>
          `,
        });
      });
      await Promise.all(emailPromises);
    }

    announcement.status = 'sent';
    announcement.sentDate = new Date();

    const updatedAnnouncement = await announcement.save();
    await updatedAnnouncement.populate('sentBy', 'name');

    sendResponse(res, STATUS.OK, 'Announcement sent successfully', updatedAnnouncement);
  } catch (error) {
    next(error);
  }
};

const getMyAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find({
      status: 'sent',
      audience: { $in: ['All Users', 'Registered'] },
    })
      .populate('sentBy', 'name')
      .sort({ sentDate: -1 });
    sendResponse(res, STATUS.OK, 'Announcements fetched successfully', announcements);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  sendAnnouncement,
  getMyAnnouncements,
};
