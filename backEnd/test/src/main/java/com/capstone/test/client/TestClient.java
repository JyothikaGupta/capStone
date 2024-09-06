package com.capstone.test.client;

import com.capstone.test.model.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@FeignClient(name = "person", url = "http://localhost:8092")
public interface TestClient {

    @GetMapping("/users/{id}")
    UserDto getUserById(@PathVariable Long id);
}
