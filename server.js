const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI, {
    auth: {
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD
    }
});

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('beacon');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

connectDB();

// GET and POST /beacons
app.route('/beacons')
    .get(async (req, res) => {
        try {
            const collection = db.collection('entries');
            const beacons = await collection.find({}).toArray();
            beacons.forEach(beacon => {
                beacon._id = beacon._id.toString();
            });
            res.json(beacons);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    })
    .post(async (req, res) => {
        try {
            const collection = db.collection('entries');
            await collection.insertOne(req.body);
            res.status(201).json({ status: 'success' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

// DELETE /ansel/:beacon_id
app.delete('/ansel/:beacon_id', async (req, res) => {
    try {
        const collection = db.collection('entries');
        await collection.deleteOne({ _id: new ObjectId(req.params.beacon_id) });
        res.json({ status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /beacons/:beacon_id/upvote
app.post('/beacons/:beacon_id/upvote', async (req, res) => {
    try {
        const collection = db.collection('entries');
        await collection.updateOne(
            { _id: new ObjectId(req.params.beacon_id) },
            { $inc: { votes: 1 } }
        );
        res.json({ status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /beacons/:beacon_id/downvote
app.post('/beacons/:beacon_id/downvote', async (req, res) => {
    try {
        const collection = db.collection('entries');
        await collection.updateOne(
            { _id: new ObjectId(req.params.beacon_id) },
            { $inc: { votes: -1 } }
        );
        res.json({ status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});