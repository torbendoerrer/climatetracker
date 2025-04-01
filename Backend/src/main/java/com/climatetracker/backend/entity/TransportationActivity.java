package com.climatetracker.backend.entity;


import java.time.LocalDateTime;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "\"TransportationActivity\"")
public class TransportationActivity {
    @Id
    @SequenceGenerator(
        name = "activity_sequence",
        sequenceName = "activity_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "activity_sequence"
    ) 
    private Long id;
    private LocalDateTime date;
    private Float distance;
    private int passengerCount;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private TransportationMethod transportationMethod;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    public TransportationActivity(
        LocalDateTime date,
        Float distance,
        int passengerCount,
        TransportationMethod transportationMethod,
        User user) {
            this.date = date;
            this.distance = distance;
            this.passengerCount = passengerCount;
            this.transportationMethod = transportationMethod;
            this.user = user;
        }
}
