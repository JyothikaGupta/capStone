package com.example.mapsbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocationRequest {
    private double lat;
    private double lng;
    private List<String> phoneNumbers;
}
