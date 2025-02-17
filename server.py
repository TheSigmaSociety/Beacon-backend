from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from bson import ObjectId
import os

load_dotenv()
app = Flask(__name__)
CORS(app)

dbClient = MongoClient(
    os.getenv("MONGO_URI"),
    username=os.getenv("MONGO_USERNAME"),
    password=os.getenv("MONGO_PASSWORD"),
)

db = dbClient.get_database("beacon")
# Request JSON format: {entry: {id, "id", title: "title", description: "description", location: "location", votes: (int)votes, image: "binary", wheelchairAccessible: boolean, audioAccessible: boolean, visionAccessible: boolean}}
@app.route("/beacons", methods=["GET", "POST"])
def beacons():
    if request.method == "GET":
        collection = db["entries"]
        beacons = list(collection.find())
        for beacon in beacons:
            beacon["_id"] = str(beacon["_id"])
        return jsonify(beacons)

    elif request.method == "POST":
        collection = db["entries"]
        data = request.get_json()
        collection.insert_one(data)
        return jsonify({"status": "success"}), 201

# impl delete
@app.route("/ansel/<beacon_id>", methods=["DELETE"]) # adds readme file 
def deleteBeacon(beacon_id):
    collection = db["entries"]
    collection.delete_one({"_id": ObjectId(beacon_id)})
    return jsonify({"status": "success"}), 200

@app.route("/beacons/<beaconId>/upvote", methods=["POST"])
def upvoteEntry(beaconId):
    collection = db["entries"]
    collection.update_one({"_id": ObjectId(beaconId)}, {"$inc": {"entry.votes": 1}})
    return jsonify({"status": "success"}), 200

@app.route("/beacons/<beaconId>/downvote", methods=["POST"])
def downvoteEntry(beaconId):
    collection = db["entries"]
    collection.update_one({"_id": ObjectId(beaconId)}, {"$inc": {"entry.votes": -1}})
    return jsonify({"status": "success"}), 200

if __name__ == "__main__":
    app.run(debug=True)