const connectDB = require('./config/db');
require('dotenv').config();
const app = require('./app');

// Connect DB
connectDB();


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../fe/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../fe", "dist", "index.html"));
  });
}


// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
