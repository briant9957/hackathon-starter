db = db.getSiblingDB("hackathonDB");
db.example.drop();

db.example.insertOne( {
    hackathon : "HackDFW" , 
    location : "Frisco"
});