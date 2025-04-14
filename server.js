require('dotenv').config();
const http = require('http');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mainRouter = require('./routes/main.js');

const app = express();
app.use(cors());
app.use(express.json());

// Add routes
app.use('/api', mainRouter);

const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URL , {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
