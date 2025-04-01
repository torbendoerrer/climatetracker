package com.climatetracker.backend.controller.transportation_activity_dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateActivityRequest {
    private String date;
    private Float distance;
    private int passengerCount;
    private String methodName;
    private String username;
}
