package com.payease.transaction_service.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "idempotency_keys")
public class IdempotencyRecord {

    @Id
    @Column(name = "idempotency_key", length = 100)
    private String idempotencyKey;

    @Column(name = "customer_id", length = 50)
    private String customerId;

    @Column(name = "transaction_id", length = 50)
    private String transactionId;

    @Column(name = "status", length = 20)
    private String status;

    @Column(name = "response_body", columnDefinition = "TEXT")
    private String responseBody;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public IdempotencyRecord() {}

    public IdempotencyRecord(String idempotencyKey, String customerId, String transactionId, String status, String responseBody) {
        this.idempotencyKey = idempotencyKey;
        this.customerId = customerId;
        this.transactionId = transactionId;
        this.status = status;
        this.responseBody = responseBody;
        this.createdAt = LocalDateTime.now();
    }

    public String getIdempotencyKey() { return idempotencyKey; }
    public void setIdempotencyKey(String idempotencyKey) { this.idempotencyKey = idempotencyKey; }

    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getResponseBody() { return responseBody; }
    public void setResponseBody(String responseBody) { this.responseBody = responseBody; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
