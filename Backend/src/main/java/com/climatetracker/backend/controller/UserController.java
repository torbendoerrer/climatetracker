package com.climatetracker.backend.controller;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.climatetracker.backend.controller.user_dto.DeleteUserRequest;
import com.climatetracker.backend.controller.user_dto.ElevateUserRequest;
import com.climatetracker.backend.entity.User;
import com.climatetracker.backend.service.UserService;

import lombok.AllArgsConstructor;



@RestController
@AllArgsConstructor
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @GetMapping
    @CrossOrigin(origins = "*")
     public List<User> getUsers() {
     return userService.getUsers();
    }

    @GetMapping("/find")
    @CrossOrigin(origins = "*")
    public ResponseEntity<User> getUser(@RequestParam String username, @AuthenticationPrincipal UserDetails requestUser) {
        String usernameFromAuthentication = requestUser.getUsername();
        return userService.getUser(username, usernameFromAuthentication);
    }

    @DeleteMapping("/delete")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Void> deleteUser(@RequestBody DeleteUserRequest request, @AuthenticationPrincipal UserDetails requestUser) {
        String usernameFromAuthentication = requestUser.getUsername();
        return userService.deleteUser(request, usernameFromAuthentication);
    }

    @PutMapping("/elevate")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Void> elevateUser(@RequestBody ElevateUserRequest request) {
        return userService.elevateUser(request);
    }

}
