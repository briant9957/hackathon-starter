db = db.getSiblingDB("hackathonDB");
db.event.drop();

db.event.createIndex({ location: "2dsphere" })

// db.event.insertOne({

// });