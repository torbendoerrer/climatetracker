package com.climatetracker.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.climatetracker.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    
    @Query("SELECT s FROM User s WHERE s.username = ?1")
    Optional<User> findByUsername(String username);

}
