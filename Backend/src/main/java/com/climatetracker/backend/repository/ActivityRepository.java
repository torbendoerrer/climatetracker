package com.climatetracker.backend.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.climatetracker.backend.entity.TransportationActivity;


@Repository
public interface ActivityRepository extends  JpaRepository<TransportationActivity, Long>{

    @Query("SELECT s FROM TransportationActivity s WHERE s.date = ?1")
    Optional<TransportationActivity> findByDateTime(LocalDateTime date);

    @Query("SELECT s FROM TransportationActivity s WHERE s.user.username = ?1")
    List<TransportationActivity> findAcivitiesByUsername(String username);
}
