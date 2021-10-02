package com.hackathon.project.repository.mongo;

import com.hackathon.project.repository.mongo.model.Event;

import org.springframework.data.geo.Distance;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.aggregation.LimitOperation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    GeoResults<Event> findEventsNearBy(Point p, Distance d, LimitOperation limitOperation);
}
