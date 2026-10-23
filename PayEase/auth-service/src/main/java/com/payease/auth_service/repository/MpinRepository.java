package com.payease.auth_service.repository;

import com.payease.auth_service.entity.Mpin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MpinRepository extends JpaRepository<Mpin, Long> {

    Optional<Mpin> findByMobileNumber(String mobileNumber);

}