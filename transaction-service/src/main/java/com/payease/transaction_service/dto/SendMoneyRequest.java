package com.payease.transaction_service.dto;

import java.math.BigDecimal;

public class SendMoneyRequest {
    private String toMobile;
    private BigDecimal amount;
    private String remarks;

    // Getters and Setters
    public String getToMobile() { return toMobile; }
    public void setToMobile(String toMobile) { this.toMobile = toMobile; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}