const Announcement = require("../models/announcementModel");
const User = require("../models/userModel");
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


const createAnnouncement = async (req, res) => {
  try {
    const { title, body, audience } = req.body;

    if (!title || !body || !audience) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const announcement = new Announcement({
      title,
      body,
      audience,
      sentBy: req.user.id,
      status: "draft", // Default status
    });

    const createdAnnouncement = await announcement.save();
    await createdAnnouncement.populate("sentBy", "name");

    res.status(201).json(createdAnnouncement);
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({}).populate("sentBy", "name").sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const sendAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    if (announcement.status === 'sent') {
      return res.status(400).json({ message: "This announcement has already been sent." });
    }

    // 1. Determine audience and fetch users
    let usersQuery = {};
    if (announcement.audience === "Registered" || announcement.audience === "All Users") {
      // For now, we treat "Registered" and "All Users" as everyone in the User collection.
      usersQuery = { role: "user" };
    } else {
      // Logic for other audiences like "Guests" or "Premium" would go here.
      console.warn(`Audience "${announcement.audience}" is not implemented. No emails will be sent.`);
      usersQuery = { _id: null }; // Query that finds no one
    }

    const users = await User.find(usersQuery).select("email name");

    // 2. Send emails in parallel
    if (users.length > 0) {
      const emailPromises = users.map(user => {
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

    announcement.status = "sent";
    announcement.sentDate = new Date();

    const updatedAnnouncement = await announcement.save();
    await updatedAnnouncement.populate("sentBy", "name");

    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    console.error("Error sending announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getMyAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({
      status: "sent",
      audience: { $in: ["All Users", "Registered"] },
    }).populate("sentBy", "name").sort({ sentDate: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    console.error("Error fetching user announcements:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  sendAnnouncement,
  getMyAnnouncements,
};
