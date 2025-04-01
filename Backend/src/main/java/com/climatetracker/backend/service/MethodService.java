package com.climatetracker.backend.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.climatetracker.backend.controller.transportation_method_dto.MethodDeleteRequest;
import com.climatetracker.backend.entity.TransportationMethod;
import com.climatetracker.backend.repository.MethodRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MethodService {
                                                                                                        
    private final MethodRepository methodRepository;

    public List<TransportationMethod> getMethods() {
        return methodRepository.findAll();
    }

    public ResponseEntity<TransportationMethod> addMethod(TransportationMethod request) {
        return ResponseEntity.ok(methodRepository.saveAndFlush(request));
    }

    public ResponseEntity<Void> deleteMethod(MethodDeleteRequest request){
        Long methodId = methodRepository.findByName(request.getName()).get().getId();
        
        methodRepository.deleteById(methodId);
        return ResponseEntity.ok().build();
    }
}
