const express = require('express');
const router = express.Router();
const Beacon = require('../models/Beacon');

router.get('/beacons', async (req, res) => {
    try {
        const beacons = await Beacon.find().sort({ createdAt: -1 });
        res.json(beacons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//
router.post('/beacons', async (req, res) => {
    try {
        const beacon = new Beacon({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            lat: req.body.lat,
            lng: req.body.lng,
            image: req.body.image,
            accessibility: {
                wheelchair: req.body.accessibility?.wheelchair || false,
                audio: req.body.accessibility?.audio || false,
                vision: req.body.accessibility?.vision || false
            }
        });
        await beacon.save();
        res.status(201).json(beacon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/ansel/:beacon_id', async (req, res) => {
    try {
        const beacon = await Beacon.findByIdAndDelete(req.params.beacon_id);
        if (!beacon) {
            return res.status(404).json({ error: 'Beacon not found' });
        }
        res.json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/beacons/:beaconId/upvote', async (req, res) => {
    try {
        const beacon = await Beacon.findByIdAndUpdate(
            req.params.beaconId,
            { $inc: { votes: 1 } },
            { new: true }
        );
        if (!beacon) {
            return res.status(404).json({ error: 'Beacon not found' });
        }
        res.json(beacon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/beacons/:beaconId/downvote', async (req, res) => {
    try {
        const beacon = await Beacon.findByIdAndUpdate(
            req.params.beaconId,
            { $inc: { votes: -1 } },
            { new: true }
        );
        if (!beacon) {
            return res.status(404).json({ error: 'Beacon not found' });
        }
        res.json(beacon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
