const express = require('express');
const cors = require("cors");
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const cookieParser = require('cookie-parser');


const app = express();
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://conference-reg-wcnd.vercel.app"
// ];
app.use(cookieParser());

app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}));

// Middleware
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api', authRoutes);
app.get("/", (req, res) => {
  res.json({ msg: "it's working" })
})

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
