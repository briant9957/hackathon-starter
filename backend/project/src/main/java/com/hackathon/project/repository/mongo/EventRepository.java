package com.hackathon.project.repository.mongo;

import com.hackathon.project.repository.mongo.model.Event;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface EventRepository extends MongoRepository<Event, String> {
}
