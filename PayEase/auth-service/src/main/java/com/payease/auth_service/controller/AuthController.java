package com.payease.auth_service.controller;

import com.payease.auth_service.dto.JwtResponse;
import com.payease.auth_service.dto.LoginRequest;
import com.payease.auth_service.dto.OtpRequest;
import com.payease.auth_service.dto.OtpVerifyRequest;
import com.payease.auth_service.dto.SetMpinRequest;
import com.payease.auth_service.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private OtpService otpService;

    @PostMapping("/otp/send")
    public ResponseEntity<?> sendOtp(@RequestBody OtpRequest request) {
        String otp = otpService.sendOtp(request.getMobileNumber());
        
        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("message", "OTP sent to " + request.getMobileNumber());
        
        Map<String, Object> data = new HashMap<>();
        data.put("otp", otp);
        data.put("expiresInSeconds", 300);
        response.put("data", data);
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/otp/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpVerifyRequest request) {
        JwtResponse jwtResponse = otpService.verifyOtp(
            request.getMobileNumber(), 
            request.getOtp()
        );
        
        Map<String, Object> response = new HashMap<>();
        
        if (jwtResponse.getToken() != null) {
            response.put("status", "SUCCESS");
            response.put("message", jwtResponse.getMessage());
            
            Map<String, Object> data = new HashMap<>();
            data.put("token", jwtResponse.getToken());
            data.put("tokenType", "Bearer");
            data.put("expiresIn", 86400);
            response.put("data", data);
        } else {
            response.put("status", "ERROR");
            response.put("message", jwtResponse.getMessage());
            response.put("data", null);
        }
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/mpin/set")
    public ResponseEntity<?> setMpin(@RequestBody SetMpinRequest request) {
        if (!request.getMpin().equals(request.getConfirmMpin())) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "ERROR");
            response.put("message", "MPIN and Confirm MPIN do not match.");
            response.put("data", null);
            return ResponseEntity.badRequest().body(response);
        }
        
        String result = otpService.setMpin(request);
        
        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("message", result);
        
        Map<String, Object> data = new HashMap<>();
        data.put("mobileNumber", request.getMobileNumber());
        data.put("accountStatus", "ACTIVE");
        response.put("data", data);
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        JwtResponse jwtResponse = otpService.login(
            request.getMobileNumber(),
            request.getMpin()
            
        );
        
        Map<String, Object> response = new HashMap<>();
        
        if (jwtResponse.getToken() != null) {
            response.put("status", "SUCCESS");
            response.put("message", jwtResponse.getMessage());
            
            Map<String, Object> data = new HashMap<>();
            data.put("mobileNumber", request.getMobileNumber());
            data.put("token", jwtResponse.getToken());
            data.put("tokenType", "Bearer");
            data.put("expiresIn", 86400);
            response.put("data", data);
        } else {
            response.put("status", "ERROR");
            response.put("message", jwtResponse.getMessage());
            response.put("data", null);
        }
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/otp/test")
    public ResponseEntity<?> test() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("message", "Auth Service is running!");
        return ResponseEntity.ok(response);
    }
}