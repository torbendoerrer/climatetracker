package com.climatetracker.backend.controller.transportation_method_dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MethodDeleteRequest {
    private String name;
}
