package com.payease.customer_service.repository;

import com.payease.customer_service.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
    Optional<Customer> findByMobile(String mobile);
    boolean existsByMobile(String mobile);
}