package com.climatetracker.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.climatetracker.backend.controller.transportation_method_dto.MethodDeleteRequest;
import com.climatetracker.backend.entity.TransportationMethod;
import com.climatetracker.backend.service.MethodService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/method")
@CrossOrigin(origins = "*")
public class MethodController {

    private final MethodService methodService;

    @GetMapping
    @CrossOrigin(origins = "*")
    public List<TransportationMethod> getMethods() {
        return methodService.getMethods();
    }

    @PostMapping
    @CrossOrigin(origins = "*")
    public ResponseEntity<TransportationMethod> createMethod(@RequestBody TransportationMethod request) {
        return methodService.addMethod(request);
    }

    @DeleteMapping
    @CrossOrigin(origins = "*")
    public ResponseEntity<Void> deleteMethod(@RequestBody MethodDeleteRequest request) {
        return methodService.deleteMethod(request);
    }
}