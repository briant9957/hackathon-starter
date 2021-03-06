package com.hackathon.project.repository.mongo.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;

import lombok.Data;

@Data
public class Event {
    @Id
    private String id;
    private String uuid;
    private String title;
    private LocalDateTime start;
    private LocalDateTime end;
    private Integer capacity;

    @CreatedDate
    private LocalDateTime createdAt;
    private String description;

    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private GeoJsonPoint location;
    
    private List<String> memberNames;
    
}
