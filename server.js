require('dotenv').config();

// Validate required environment variables for MongoDB connection
if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in environment variables');
    process.exit(1);
}

// Import required dependencies
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const beaconRoutes = require('./routes/beacons');

// CORS configuration for cross-origin requests - currently allowing all origins for development
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
connectDB(); // This will now work correctly

// Routes
app.use('/', beaconRoutes);

const PORT = 3011;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
