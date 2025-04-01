package com.climatetracker.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.climatetracker.backend.controller.auth_dto.AuthenticationRequest;
import com.climatetracker.backend.controller.auth_dto.RegisterRequest;
import com.climatetracker.backend.entity.User;
import com.climatetracker.backend.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/authentication")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    @CrossOrigin(origins = "*")
    public ResponseEntity<User> register(
        @RequestBody RegisterRequest request)
        {
            return service.register(request);
        }
    
    @PostMapping("/authenticate")
    @CrossOrigin(origins = "*")
    public ResponseEntity<User> register(
        @RequestBody AuthenticationRequest request
    ) {
            return service.authenticate(request);
    }
}
