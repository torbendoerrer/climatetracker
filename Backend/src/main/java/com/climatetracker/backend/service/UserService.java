package com.climatetracker.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.climatetracker.backend.controller.user_dto.DeleteUserRequest;
import com.climatetracker.backend.controller.user_dto.ElevateUserRequest;
import com.climatetracker.backend.entity.User;
import com.climatetracker.backend.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {


    private final UserRepository userRepository;
    
    public List<User> getUsers() {
        return new ArrayList<>(userRepository.findAll());
    }

    public ResponseEntity<User> getUser(String username, String usernameFromToken) {
        User user = userRepository.findByUsername(username).get();
        Boolean isAuthorizedToSearch = (user != null && Objects.equals(usernameFromToken, user.getUsername()));

        if (isAuthorizedToSearch) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Transactional
    public ResponseEntity<Void> deleteUser(DeleteUserRequest request, String usernameFromAuthentication) {
        User user = userRepository.findByUsername(request.getUsername()).get();
        Boolean isAuthorizedToDelete = (user != null && Objects.equals(usernameFromAuthentication, user.getUsername()));

        if (isAuthorizedToDelete) {
            userRepository.deleteById(user.getId());
            userRepository.flush();
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Transactional
    public ResponseEntity<Void> elevateUser(ElevateUserRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).get();

        if (user != null) {
            user.setRole(User.Role.ADMIN);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
