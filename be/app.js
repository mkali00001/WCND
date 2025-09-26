const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route');
const paymentRouter = require('./routes/payment.route');
const registerRouter = require('./routes/registration.route');
const adminRouter = require('./routes/admin.route');
const announcementRouter = require('./routes/announcement.route');
const errorHandler = require('./middleware/error.middleware');
const queryRouter = require('./routes/query.route');
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

// Routes
app.use('/api', authRoutes);
app.use('/api/payment', paymentRouter);
app.use('/api/registeration', registerRouter);
app.use('/api/admin', adminRouter);
app.use('/api/announcements', announcementRouter);
app.use('/api/query', queryRouter);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../fe/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../fe", "dist", "index.html"));
  });
}
// app.get("/", (req, res) => {
//   res.json({ msg: "it's working" })
// })
app.use(errorHandler);
module.exports = app;
