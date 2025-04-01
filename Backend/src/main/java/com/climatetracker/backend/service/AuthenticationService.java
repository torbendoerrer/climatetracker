package com.climatetracker.backend.service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.climatetracker.backend.controller.auth_dto.AuthenticationRequest;
import com.climatetracker.backend.controller.auth_dto.RegisterRequest;
import com.climatetracker.backend.entity.User;
import com.climatetracker.backend.entity.User.Role;
import com.climatetracker.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<User> register(RegisterRequest request) {
        User user = User.builder().username(request.getUsername()).password(passwordEncoder.encode(request.getPassword())).role(Role.USER).build();
        userRepository.saveAndFlush(user);
        return ResponseEntity.ok(user);
    }

    public ResponseEntity<User> authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        return ResponseEntity.ok(user);
    }
}
