package com.hackathon.project.controller.dto;

import lombok.Data;

@Data
public class GeoQueryContext {
    private double radius;
    private double longitude;
    private double latitude;
    private int limit;
}