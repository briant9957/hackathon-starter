package com.hackathon.project.repository.mongo.model;

import org.springframework.data.annotation.Id;
import lombok.Data;

@Data
public class Example {
    @Id
    private String id;

    private String hackathon;
    private String location;
}
