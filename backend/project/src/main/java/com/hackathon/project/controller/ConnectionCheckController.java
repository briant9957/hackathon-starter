package com.hackathon.project.controller;

import java.util.List;

import com.hackathon.project.repository.mongo.MongoHackathonRepository;
import com.hackathon.project.repository.mongo.model.Example;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class ConnectionCheckController {

	private MongoHackathonRepository repository;

	@GetMapping(value = "/check")
	@CrossOrigin
	public ResponseEntity<Example> check() {
		return ResponseEntity.ok(repository.findByHackathon("HackDFW"));
	}

	// @GetMapping(value = "/events-nearby")
	// @CrossOrigin
	// public ResponseEntity<List<Events>> eventsNearby(@RequestBody(required = true) int radius, @RequestBody(required = false) int limit) {
	// 	return ResponseEntity.ok("");
	// }
}