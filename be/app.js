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
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.ORIGIN]
  : ['http://localhost:5173'];

app.use(
  cors({
    origin: allowedOrigins,
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
app.use('/img', express.static(path.join(__dirname, 'uploads')))



if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../fe/dist")));

  app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../fe/dist/index.html"));
});
}


app.use(errorHandler);
module.exports = app;
