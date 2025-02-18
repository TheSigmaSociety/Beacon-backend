const { Binary } = require('mongodb');
const { Int32, Double } = require('mongodb');
const mongoose = require('mongoose');

// Beacon Schema: Represents a location-based accessibility point with voting and metadata
const beaconSchema = new mongoose.Schema({
    // Basic information
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    // Voting system using MongoDB Int32 for precise counting
    votes: {
        type: Int32,
        default: 0
    },
    // Geographic location data
    location: {
        type: String,
        required: true
    },
    lat: {
        type: Double,
        required: true
    },
    lng: {
        type: Double,
        required: true
    },
    // Accessibility features flags
    accessibility: {
        wheelchair: {
            type: Boolean,
            default: false
        },
        audio: {
            type: Boolean,
            default: false
        },
        vision: {
            type: Boolean,
            default: false
        }
    },
    // base 64 encoded image
    image: {
        type: String,
        required: true,
        default: null
    },
    // Timestamp of creation
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Beacon', beaconSchema);
