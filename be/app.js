const express = require('express');
const cors = require("cors");
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://conference-reg-wcnd.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
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
