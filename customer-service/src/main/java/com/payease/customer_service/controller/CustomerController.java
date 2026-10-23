package com.payease.customer_service.controller;

import com.payease.customer_service.dto.CustomerRequest;
import com.payease.customer_service.dto.CustomerResponse;
import com.payease.customer_service.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody CustomerRequest request) {
        try {
            CustomerResponse customer = customerService.registerCustomer(request);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("message", "Customer registered successfully. Please verify OTP.");
            response.put("data", customer);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "ERROR");
            response.put("message", e.getMessage());
            response.put("data", null);

            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("X-Customer-Id") String customerId) {
        try {
            // TODO: Get mobile from customerId or use customerId directly
            CustomerResponse customer = customerService.getProfile(customerId);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("message", "Profile fetched");
            response.put("data", customer);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "ERROR");
            response.put("message", e.getMessage());
            response.put("data", null);

            return ResponseEntity.badRequest().body(response);
        }
    }
}