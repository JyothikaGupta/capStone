package com.example.mapsbackend.Controller;
import com.example.mapsbackend.Service.SmsService;
import com.example.mapsbackend.model.LocationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/location")
@CrossOrigin(origins = "http://localhost:3000")
public class LocationController {

    @Autowired
    private SmsService smsService;

    @PostMapping("/share")
    public void shareLocation(@RequestBody LocationRequest request) {
        String message = "Emergency: I am here at this location: https://www.google.com/maps?q=" + request.getLat() + "," + request.getLng();
        request.getPhoneNumbers().forEach(phone -> smsService.sendSms(phone, message));
    }
}
