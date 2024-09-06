package com.capstone.test.controller;

import com.capstone.test.client.TestClient;
import com.capstone.test.model.TestScore;
import com.capstone.test.model.TestScoreDto;
import com.capstone.test.model.UserDto;
import com.capstone.test.repository.TestScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TestScoreController {
    @Autowired
    private TestScoreRepository testScoreRepository;

    @Autowired
    private TestClient testClient;

    @PostMapping("/test-scores")
    public ResponseEntity<String> submitTestScore(@RequestBody TestScoreDto testScoreDto) {
        TestScore testScore = new TestScore();
        testScore.setUserId(testScoreDto.getUserId());
        testScore.setScore(testScoreDto.getScore());
        testScore.setDepressionLevel(testScoreDto.getDepressionLevel());
        testScore.setDate(testScoreDto.getDate());

        testScoreRepository.save(testScore);

        return ResponseEntity.ok("Test score saved successfully");
    }

    @GetMapping("/testHistory")
    public List<TestScore> getTestHistory(@RequestParam String userId) {
        return testScoreRepository.findByUserId(userId);
    }
}
