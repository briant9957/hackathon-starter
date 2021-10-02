package com.hackathon.project.controller;

import com.hackathon.project.repository.mongo.EventRepository;
import com.hackathon.project.repository.mongo.MongoHackathonRepository;
import com.hackathon.project.repository.mongo.model.Event;
import com.hackathon.project.repository.mongo.model.Example;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class ConnectionCheckController {

	private EventRepository eventRepository;
	private MongoHackathonRepository repository;

	@GetMapping(value = "/check")
	@CrossOrigin
	public ResponseEntity<Example> check() {
		return ResponseEntity.ok(repository.findByHackathon("HackDFW"));
	}

	@PostMapping(value = "/events")
	public ResponseEntity<Event> createEvent(@RequestBody Event event){
		return ResponseEntity.ok(eventRepository.insert(event));
	}
}