package com.hackathon.project.repository.mongo;

import com.hackathon.project.repository.mongo.model.Example;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MongoHackathonRepository extends MongoRepository<Example, String> {
    public Example findByHackathon(String hackathon);
}
