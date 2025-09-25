const express = require('express');
const router = express.Router();
const {
  createAnnouncement,
  getAnnouncements,
  getMyAnnouncements,
  sendAnnouncement,
} = require('../controllers/announcement.controller');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.route('/my').get(authMiddleware, getMyAnnouncements);

// All routes in this file are protected and only accessible by admins
router.use(authMiddleware, roleMiddleware(['admin']));

router.post('/create-announcement', createAnnouncement);
router.get('/get-announcements', getAnnouncements);
router.post('/send-announcement/:id', sendAnnouncement);

module.exports = router;
