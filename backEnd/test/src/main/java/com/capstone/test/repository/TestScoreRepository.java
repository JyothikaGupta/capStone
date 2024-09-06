package com.capstone.test.repository;

import com.capstone.test.model.TestScore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestScoreRepository extends JpaRepository<TestScore,Long> {
    List<TestScore> findByUserId(String userId);
}

