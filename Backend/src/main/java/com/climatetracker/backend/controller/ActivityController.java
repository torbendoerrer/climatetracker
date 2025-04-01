package com.climatetracker.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.climatetracker.backend.controller.transportation_activity_dto.CreateActivityRequest;
import com.climatetracker.backend.controller.transportation_activity_dto.DeleteActivityRequest;
import com.climatetracker.backend.entity.TransportationActivity;
import com.climatetracker.backend.service.ActivityService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/activity")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ActivityController {
    
    @Autowired
    private final ActivityService activityService;

    @GetMapping
    @CrossOrigin(origins = "*")
     public ResponseEntity<List<TransportationActivity>> getActivities(@RequestParam String username, @AuthenticationPrincipal UserDetails requestUser) {
        String usernameFromAuthentication = requestUser.getUsername();
        return activityService.getActivitiesByUsername(username, usernameFromAuthentication);
    }

    @PostMapping
    @CrossOrigin(origins = "*")
    public ResponseEntity<TransportationActivity> addActivity(@RequestBody CreateActivityRequest request, @AuthenticationPrincipal UserDetails requestUser) {
        String usernameFromAuthentication = requestUser.getUsername();
        return activityService.addActivity(request, usernameFromAuthentication);
    }

    @DeleteMapping
    @CrossOrigin(origins = "*")
    public ResponseEntity<Void> deleteActivity(@RequestBody DeleteActivityRequest request, @AuthenticationPrincipal UserDetails requestUser) {
        String usernameFromAuthentication = requestUser.getUsername();
        return activityService.deleteActivity(request, usernameFromAuthentication);
    }

}
