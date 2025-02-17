const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');

const router = express.Router();

// GET and POST /beacons
router.get('/beacons', async (req, res) => {
    try {
        const collection = getDB().collection('entries');
        const beacons = await collection.find({}).toArray();
        res.json(beacons.map(beacon => ({
            ...beacon,
            _id: beacon._id.toString()
        })));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/beacons', async (req, res) => {
    try {
        const collection = getDB().collection('entries');
        await collection.insertOne(req.body);
        res.status(201).json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /ansel/:beacon_id
router.delete('/ansel/:beacon_id', async (req, res) => {
    try {
        const collection = getDB().collection('entries');
        await collection.deleteOne({ _id: new ObjectId(req.params.beacon_id) });
        res.json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Voting routes
router.post('/beacons/:beaconId/upvote', async (req, res) => {
    try {
        const collection = getDB().collection('entries');
        await collection.updateOne(
            { _id: new ObjectId(req.params.beaconId) },
            { $inc: { 'entry.votes': 1 } }
        );
        res.json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/beacons/:beaconId/downvote', async (req, res) => {
    try {
        const collection = getDB().collection('entries');
        await collection.updateOne(
            { _id: new ObjectId(req.params.beaconId) },
            { $inc: { 'entry.votes': -1 } }
        );
        res.json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
