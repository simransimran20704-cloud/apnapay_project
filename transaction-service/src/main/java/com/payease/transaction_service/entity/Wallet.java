package com.payease.transaction_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "wallet")
public class Wallet {

@Id
private String customerId;

private BigDecimal balance = BigDecimal.ZERO;

private LocalDateTime updatedAt = LocalDateTime.now();

    // Getters and Setters
public String getCustomerId() { return customerId; }
public void setCustomerId(String customerId) { this.customerId = customerId; }

public BigDecimal getBalance() { return balance; }
public void setBalance(BigDecimal balance) { this.balance = balance; }

public LocalDateTime getUpdatedAt() { return updatedAt; }
public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}