package com.capstone.Person.controller;

import com.capstone.Person.entities.TestScore;
import com.capstone.Person.repositories.TestScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test-scores")
public class TestScoreController {

    @Autowired
    private TestScoreRepository testScoreRepository;

    @PostMapping
    public TestScore saveTestScore(@RequestBody TestScore testScore) {

        return testScoreRepository.save(testScore);
    }
}
