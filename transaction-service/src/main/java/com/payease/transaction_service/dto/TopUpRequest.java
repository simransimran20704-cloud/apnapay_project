package com.payease.transaction_service.dto;

import java.math.BigDecimal;

public class TopUpRequest {
    private BigDecimal amount;
    private String source;

    // Getters and Setters
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
}