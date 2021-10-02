db = db.getSiblingDB("hackathonDB");
db.event.drop();

db.example.insertOne( {
    hackathon : "HackDFW" , 
    location : "Frisco"
});