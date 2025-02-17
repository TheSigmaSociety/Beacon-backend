const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const beaconRoutes = require('./routes/beacons');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/', beaconRoutes);

const PORT = 3011;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
