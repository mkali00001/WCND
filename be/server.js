const connectDB = require('./config/db');
require('dotenv').config();
const app = require('./app');

// Connect DB
connectDB();

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
