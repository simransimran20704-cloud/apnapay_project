package com.payease.auth_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "otp")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Otp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mobileNumber;

    private String otp;

    private boolean verified;

    // Time when OTP was generated
    private LocalDateTime createdAt;

    // OTP expiry time
    private LocalDateTime expiresAt;
}