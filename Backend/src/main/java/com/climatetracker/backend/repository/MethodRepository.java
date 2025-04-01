package com.climatetracker.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.climatetracker.backend.entity.TransportationMethod;

@Repository
public interface MethodRepository extends JpaRepository<TransportationMethod, Long>{
    
    @Query("SELECT s FROM TransportationMethod s WHERE s.name = ?1")
    Optional<TransportationMethod> findByName(String name);
} 
