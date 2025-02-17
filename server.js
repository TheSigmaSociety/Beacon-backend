const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const beaconRoutes = require('./routes/beacons');

dotenv.config();

// Configure CORS options
const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    exposedHeaders: ['Content-Range', 'X-Content-Range'], 
    maxAge: 600, 
    optionsSuccessStatus: 204
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/', beaconRoutes);

const PORT = 3011;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
