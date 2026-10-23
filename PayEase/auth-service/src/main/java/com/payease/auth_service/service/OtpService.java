package com.payease.auth_service.service;

import com.payease.auth_service.dto.JwtResponse;
import org.springframework.beans.factory.annotation.Autowired;
import com.payease.auth_service.entity.Otp;
import com.payease.auth_service.repository.OtpRepository;
import org.springframework.stereotype.Service;
import com.payease.auth_service.repository.UserRepository;
import com.payease.auth_service.entity.User;
import java.time.LocalDateTime;
import com.payease.auth_service.dto.SetMpinRequest;
import com.payease.auth_service.entity.Mpin;
import com.payease.auth_service.repository.MpinRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private OtpRepository otpRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MpinRepository mpinRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    private final Random random = new Random();

    public String generateOtp() {
        return String.valueOf(100000 + random.nextInt(900000));
    }

    public String sendOtp(String mobileNumber) {

        String generatedOtpValue = generateOtp();

        Otp otpEntity = otpRepository.findByMobileNumber(mobileNumber)
                .orElse(new Otp());

        otpEntity.setMobileNumber(mobileNumber);
        otpEntity.setOtp(generatedOtpValue);
        otpEntity.setVerified(false);

        // Set OTP timestamps
        otpEntity.setCreatedAt(LocalDateTime.now());
        otpEntity.setExpiresAt(LocalDateTime.now().plusMinutes(5));

        otpRepository.save(otpEntity);

        return generatedOtpValue;
    }

    public JwtResponse verifyOtp(String mobileNumber, String otp) {

        Otp otpEntity = otpRepository.findByMobileNumber(mobileNumber)
                .orElse(null);

        if (otpEntity == null) {
            return new JwtResponse("Mobile number not found", null);
        }

        // ====== DEBUG LOGGING (temporary - remove after fix) ======
        System.out.println("DEBUG: Input mobile = [" + mobileNumber + "]");
        System.out.println("DEBUG: Input OTP = [" + otp + "]");
        System.out.println("DEBUG: Stored OTP = [" + otpEntity.getOtp() + "]");
        System.out.println("DEBUG: OTP length = " + otpEntity.getOtp().length());
        System.out.println("DEBUG: Input length = " + otp.length());
        System.out.println("DEBUG: Are equal? " + otpEntity.getOtp().equals(otp));
        System.out.println("DEBUG: Trim equal? " + otpEntity.getOtp().trim().equals(otp.trim()));
        System.out.println("DEBUG: OTP hash = " + otpEntity.getOtp().hashCode());
        System.out.println("DEBUG: Input hash = " + otp.hashCode());
        // ==========================================================

        if (LocalDateTime.now().isAfter(otpEntity.getExpiresAt())) {
            return new JwtResponse("OTP Expired", null);
        }

        // FIXED: Added .trim() to handle any whitespace issues
        if (!otpEntity.getOtp().trim().equals(otp.trim())) {
            return new JwtResponse("Invalid OTP", null);
        }

        otpEntity.setVerified(true);
        otpRepository.save(otpEntity);

        if (userRepository.findByMobileNumber(mobileNumber).isEmpty()) {

            User user = new User();
            user.setMobileNumber(mobileNumber);

            userRepository.save(user);

            System.out.println("New User Created: " + mobileNumber);

        } else {
            System.out.println("Existing User Logged In: " + mobileNumber);
        }

        String token = jwtService.generateToken(mobileNumber);

        return new JwtResponse("OTP Verified Successfully", token);
    }

    public String setMpin(SetMpinRequest request) {

        String mobileNumber = request.getMobileNumber();
        String mpin = request.getMpin();

        Mpin mpinEntity = mpinRepository.findByMobileNumber(mobileNumber)
                .orElse(new Mpin());

        mpinEntity.setMobileNumber(mobileNumber);

        String encodedMpin = passwordEncoder.encode(mpin);
        mpinEntity.setMpinHash(encodedMpin);

        mpinRepository.save(mpinEntity);

        return "MPIN Set Successfully";
    }

    // ====== LOGIN METHOD ADDED ======
    public JwtResponse login(String mobileNumber, String mpin) {
        
        // Check if user exists
        User user = userRepository.findByMobileNumber(mobileNumber).orElse(null);
        if (user == null) {
            return new JwtResponse("Mobile number not registered", null);
        }
        
        // Check if MPIN exists
        Mpin mpinEntity = mpinRepository.findByMobileNumber(mobileNumber).orElse(null);
        if (mpinEntity == null) {
            return new JwtResponse("MPIN not set. Please set MPIN first.", null);
        }
        
        // Verify MPIN using BCrypt
        if (!passwordEncoder.matches(mpin, mpinEntity.getMpinHash())) {
            return new JwtResponse("Invalid MPIN", null);
        }
        
        // Generate JWT token
        String token = jwtService.generateToken(mobileNumber);
        
        return new JwtResponse("Login successful", token);
    }
    // ==================================
}