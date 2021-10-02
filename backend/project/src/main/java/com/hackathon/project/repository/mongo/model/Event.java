package com.hackathon.project.repository.mongo.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import lombok.Data;

@Data
public class Event {
    @Id
    Integer id;
    String title;
    LocalDateTime dateTimeStart;
    LocalDateTime dateTimeEnd;
    Integer capacity;
    LocalDateTime dateTimeCreated;
    String description;
    String[] memberNames;
    
}
