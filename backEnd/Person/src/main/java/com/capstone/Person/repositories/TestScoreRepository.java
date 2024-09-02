package com.capstone.Person.repositories;

import com.capstone.Person.entities.TestScore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestScoreRepository extends JpaRepository<TestScore,Long> {
}
