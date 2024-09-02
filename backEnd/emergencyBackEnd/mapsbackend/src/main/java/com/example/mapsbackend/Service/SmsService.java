package com.example.mapsbackend.Service;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsService {


    private String accountSid="ACe17534a977ee8d065beccbef7f187ab8";


    private String authToken = "62c35a9adc941e4eae31ab7cec97603c";


    private String fromPhoneNumber = "+12569078997";

    public SmsService() {
        Twilio.init(accountSid, authToken);
    }

    public void sendSms(String toPhoneNumber, String message) {
        Message.creator(new PhoneNumber(toPhoneNumber), new PhoneNumber(fromPhoneNumber), message).create();
    }
}

