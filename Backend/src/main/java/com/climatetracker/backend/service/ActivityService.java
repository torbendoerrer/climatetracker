package com.climatetracker.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.climatetracker.backend.controller.transportation_activity_dto.CreateActivityRequest;
import com.climatetracker.backend.controller.transportation_activity_dto.DeleteActivityRequest;
import com.climatetracker.backend.entity.TransportationActivity;
import com.climatetracker.backend.entity.TransportationMethod;
import com.climatetracker.backend.entity.User;
import com.climatetracker.backend.repository.ActivityRepository;
import com.climatetracker.backend.repository.MethodRepository;
import com.climatetracker.backend.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActivityService {
    
    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;
    private final MethodRepository methodRepository;

    public ResponseEntity<List<TransportationActivity>> getActivitiesByUsername(String username, String usernameFromAuthentication) {
        Boolean isAuthorizedToFind = (Objects.equals(username, usernameFromAuthentication));

        if (isAuthorizedToFind) {
        return ResponseEntity.ok(activityRepository.findAcivitiesByUsername(username));
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }


    public ResponseEntity<TransportationActivity> addActivity(CreateActivityRequest request, String usernameFromAuthentication) {
        User user = userRepository.findByUsername(request.getUsername()).get();
        TransportationMethod method = methodRepository.findByName(request.getMethodName()).get();
        Boolean isAuthorizedToAdd = (user != null && method != null && Objects.equals(usernameFromAuthentication, user.getUsername()));

        if (isAuthorizedToAdd) {
        TransportationActivity activity = TransportationActivity.builder()
        .distance(request.getDistance())
        .passengerCount(request.getPassengerCount())
        .date(LocalDateTime.parse(request.getDate()))
        .user(user)
        .transportationMethod(method)
        .build();
        activityRepository.saveAndFlush(activity);
        return ResponseEntity.ok(activity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Transactional
    public ResponseEntity<Void> deleteActivity(DeleteActivityRequest request, String usernameFromAuthentication){
        TransportationActivity activity = activityRepository.findByDateTime(LocalDateTime.parse(request.getDate())).get();
        Long activityId = activity.getId();
        String activityUsername = activity.getUser().getUsername();
        Boolean isAuthorizedToDelete = (Objects.equals(activityUsername, usernameFromAuthentication));
        
        if (isAuthorizedToDelete) {
        activityRepository.deleteById(activityId);
        activityRepository.flush();
        return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
