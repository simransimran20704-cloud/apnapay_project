package com.payease.customer_service.service;

import com.payease.customer_service.dto.CustomerRequest;
import com.payease.customer_service.dto.CustomerResponse;
import com.payease.customer_service.entity.Customer;
import com.payease.customer_service.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public CustomerResponse registerCustomer(CustomerRequest request) {
        // Check if mobile already exists
        if (customerRepository.existsByMobile(request.getMobile())) {
            throw new RuntimeException("Mobile number already registered");
        }

        Customer customer = new Customer();
        customer.setId("CUST-" + UUID.randomUUID().toString().substring(0, 8));
        customer.setName(request.getName());
        customer.setMobile(request.getMobile());
        customer.setEmail(request.getEmail());
        customer.setStatus(Customer.Status.ACTIVE);

        customerRepository.save(customer);

        CustomerResponse response = new CustomerResponse();
        response.setCustomerId(customer.getId());
        response.setName(customer.getName());
        response.setMobile(customer.getMobile());
        response.setEmail(customer.getEmail());
        response.setStatus(customer.getStatus().name());
        response.setCreatedAt(customer.getCreatedAt());

        return response;
    }

    public CustomerResponse getProfile(String mobile) {
        Customer customer = customerRepository.findByMobile(mobile)
                .orElseGet(() -> {
                    Customer newCust = new Customer();
                    String custId = "CUST-" + (mobile.length() >= 6 ? mobile.substring(mobile.length() - 6) : "USER");
                    newCust.setId(custId);
                    newCust.setName("PayEase Member");
                    newCust.setMobile(mobile);
                    newCust.setEmail(mobile + "@payease.com");
                    newCust.setStatus(Customer.Status.ACTIVE);
                    return customerRepository.save(newCust);
                });

        CustomerResponse response = new CustomerResponse();
        response.setCustomerId(customer.getId());
        response.setName(customer.getName());
        response.setMobile(customer.getMobile());
        response.setEmail(customer.getEmail());
        response.setStatus(customer.getStatus().name());
        response.setCreatedAt(customer.getCreatedAt());

        return response;
    }
}
