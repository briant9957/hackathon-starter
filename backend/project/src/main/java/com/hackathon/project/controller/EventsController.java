package com.hackathon.project.controller;

import com.hackathon.project.repository.mongo.EventRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import com.hackathon.project.repository.mongo.model.Event;
import com.hackathon.project.repository.mongo.model.MemberName;
import com.mongodb.internal.connection.ClusterDescriptionHelper.Predicate;

import org.springframework.data.annotation.QueryAnnotation;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.aggregation.LimitOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	@CrossOrigin
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

	@PostMapping(value = "/events/{id}/attendees/")
	public ResponseEntity<Event> memberAdd(
		@RequestBody MemberName memberName,
		@PathVariable String id
	) throws Exception{
		System.out.println(id);
		Event event = eventRepository.getEventByUuid(id);
		List<String> memberList = event.getMemberNames();
		memberList.add(memberName.getMemberName());
		event.setMemberNames(memberList);
		return ResponseEntity.ok(eventRepository.save(event));
	}
}