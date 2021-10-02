db = db.getSiblingDB("hackathonDB");
db.event.drop();

db.event.createIndex({ location: "2dsphere" })

db.event.insertOne({
    "id": "e04881ea-ea98-467e-bd20-9f8b9346d9b2",
    "title": "A fun DND party with Dallas Locals",
    "start": "2021-10-10T07:21:10.492",
    "end": "2021-10-10T17:21:10.492",
    "capacity": 5,
    "createdAt": "2021-10-02T15:35:28.21277",
    "description": "This is going to be a fun DND event with your Dallas locals! Bring your own snacks",
    "location": {
        "x": -96.8191505,
        "y": 33.1005563,
        "type": "Point",
        "coordinates": [
            -96.8191505,
            33.1005563
        ]
    },
    "memberNames": null
});

db.event.insertOne({
    "id": "e04881ea-ea98-467e-bd20-9f8b9346d9b3",
    "title": "Baseball Game",
    "start": "2021-10-11T20:00:10.492",
    "end": "2021-10-11T23:00:10.492",
    "capacity": 16,
    "createdAt": "2021-10-02T16:35:28.21277",
    "description": "Friendly pickup baseball game, looking for people of all skills and ages!",
    "location": {
        "x": -96.81972650438595,
        "y": 33.09902841888221,
        "type": "Point",
        "coordinates": [
            -96.81972650438595,
            33.09902841888221
        ]
    },
    "memberNames": [
        "Brian T", "Chance B", "Ted A"
    ]
});

db.event.insertOne({
    "id": "bb1c9d56-98cb-4255-b94c-9046fd7330ee",
    "title": "A Walk in the Park",
    "start": "2021-10-10T07:21:10.492",
    "end": "2021-10-10T17:21:10.492",
    "capacity": 2,
    "createdAt": "2021-10-02T16:00:04.568205",
    "description": "Looking for someone to walk and chat.",
    "location": {
        "x": -96.81688604503918,
        "y": 33.10413338800569,
        "type": "Point",
        "coordinates": [
            -96.81688604503918,
            33.10413338800569
        ]
    },
    "memberNames": [
        "Brian T"
    ]
})

db.event.insertOne({
    "id": "27f2e990-216b-42eb-9342-002934f526a4",
    "title": "Hooked on Fishing",
    "start": "2021-10-12T23:00:00.000",
    "end": "2021-10-13T00:00:00.000",
    "capacity": 4,
    "createdAt": "2021-10-01T16:13:19.886807",
    "description": "Looking for a small fishing group. Beginners are welcomed! Rods provided.",
    "location": {
        "x": -96.82086443156052,
        "y": 33.10364807559655,
        "type": "Point",
        "coordinates": [
            -96.82086443156052,
            33.10364807559655
        ]
    },
    "memberNames": [
        "Brian T",
        "Chance B.",
        "Jimmy N",
        "Ted A"
    ]
})

db.event.insertOne({
        "id": "c3ca038d-3d3e-4da4-8a8c-0d2d7791fd1d",
        "title": "Garden Watching",
        "start": "2021-10-14T14:21:10.492",
        "end": "2021-10-14T16:21:10.492",
        "capacity": 5,
        "createdAt": "2021-10-02T16:36:48.6847",
        "description": "Wanted to enjoy some company while looking at flowers",
        "location": {
            "x": -96.7186675,
            "y": 32.8211334,
            "type": "Point",
            "coordinates": [
                -96.7186675,
                32.8211334
            ]
        },
        "memberNames": [
            "Brian T",
            "Chance B."
        ]
})

db.event.insertOne({
    "id": "70787466-88ed-49ef-8b21-52450bbb9775",
    "title": "Newbie Golf",
    "start": "2021-10-16T14:21:10.492",
    "end": "2021-10-16T17:21:10.492",
    "capacity": 4,
    "createdAt": "2021-10-02T16:41:33.863644",
    "description": "I am a new golf player. Looking for a group to try out this course together!",
    "location": {
        "x": -96.6928234,
        "y": 33.0740292,
        "type": "Point",
        "coordinates": [
            -96.6928234,
            33.0740292
        ]
    },
    "memberNames": [
        "Brian T"
    ]
})