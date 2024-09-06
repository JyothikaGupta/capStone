package com.capstone.test.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data


public class TestScoreDto {
    @Id
    private int id;
    private String userId;
    private LocalDate date;
    private int score;
    private String depressionLevel;
}
