package com.hackathon.project.controller;

import com.hackathon.project.repository.mongo.EventRepository;
import java.util.List;
import java.util.stream.Collectors;

import com.hackathon.project.repository.mongo.model.Event;

import org.springframework.data.geo.Distance;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.aggregation.LimitOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class EventsController {

	private EventRepository eventRepository;

	@PostMapping(value = "/events")
	public ResponseEntity<Event> createEvent(@RequestBody Event event){
		return ResponseEntity.ok(eventRepository.insert(event));
	}

	@GetMapping(value = "/events-nearby")
	@CrossOrigin
	public ResponseEntity<List<Event>> eventsNearby(
		@RequestParam double radius,
		@RequestParam double longitude,
		@RequestParam double latitude,
    	@RequestParam int limit) {

		GeoResults<Event> eventGeoResults = eventRepository.findEventsNearBy(
			new Point(longitude, latitude), 
			new Distance(radius, Metrics.MILES),
			new LimitOperation(limit));
		List<Event> list = eventGeoResults.getContent()
			.stream()
			.map(GeoResult::getContent)
			.collect(Collectors.toList());
		return ResponseEntity.ok(list);
	}
}