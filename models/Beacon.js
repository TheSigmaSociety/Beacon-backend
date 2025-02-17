const { Binary } = require('mongodb');
const { Int32, Double } = require('mongodb');
const mongoose = require('mongoose');

const beaconSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    votes: {
        type: Int32,
        default: 0
    },
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
    image: {
        type: String,
        required: true,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Beacon', beaconSchema);
