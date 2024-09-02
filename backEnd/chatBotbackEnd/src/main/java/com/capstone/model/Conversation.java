package com.capstone.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;

@Entity
@Data
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 1000) // Adjust length as needed
    @NotNull
    private String prompt;

    @Column(nullable = false, length = 1000) // Adjust length as needed
    @NotNull
    private String response;

    // Default constructor is needed for JPA
    public Conversation() {}

    // Parameterized constructor
    public Conversation(String prompt, String response) {
        this.prompt = prompt;
        this.response = response;
    }
}
