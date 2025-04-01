package com.climatetracker.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "\"TransportationMethod\"")
public class TransportationMethod {
    @Id
    @SequenceGenerator(
        name = "method_sequence",
        sequenceName = "method_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "method_sequence"
    )
    private Long id;
    private String name;
    private Double emissionFactor;
    private Double fuelAdjustment;

    public TransportationMethod(
        String name,
        Double emissionFactor,
        Double fuelAdjustment){
            this.name = name;
            this.emissionFactor = emissionFactor;
            this.fuelAdjustment = fuelAdjustment;
        }
  
}
