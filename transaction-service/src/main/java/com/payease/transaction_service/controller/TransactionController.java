package com.payease.transaction_service.controller;

import com.payease.transaction_service.dto.SendMoneyRequest;
import com.payease.transaction_service.dto.TopUpRequest;
import com.payease.transaction_service.dto.TransactionResponse;
import com.payease.transaction_service.entity.Transaction;
import com.payease.transaction_service.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/balance")
    public ResponseEntity<?> getBalance(@RequestHeader("X-Customer-Id") String customerId) {
        try {
            BigDecimal balance = transactionService.getBalance(customerId);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("message", "Balance fetched");
            response.put("data", Map.of(
                "customerId", customerId,
                "balance", balance,
                "currency", "INR"
            ));

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "ERROR");
            response.put("message", e.getMessage());
            response.put("data", null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendMoney(@RequestHeader("X-Customer-Id") String customerId,
                                       @RequestHeader(value = "X-Idempotency-Key", required = false) String idempotencyKey,
                                       @RequestBody SendMoneyRequest request) {
        try {
            Transaction transaction = transactionService.sendMoney(customerId, request, idempotencyKey);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("message", "Money sent successfully");
            response.put("data", Map.of(
                "transactionId", transaction.getId(),
                "amount", transaction.getAmount(),
                "status", transaction.getStatus()
            ));

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "ERROR");
            response.put("message", e.getMessage());
            response.put("data", null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/wallet/topup")
    public ResponseEntity<?> topUp(@RequestHeader("X-Customer-Id") String customerId,
                                   @RequestBody TopUpRequest request) {
        try {
            Transaction transaction = transactionService.topUp(customerId, request);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("message", "Wallet topped up successfully");
            response.put("data", Map.of(
                "transactionId", transaction.getId(),
                "amount", transaction.getAmount(),
                "newBalance", transactionService.getBalance(customerId)
            ));

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "ERROR");
            response.put("message", e.getMessage());
            response.put("data", null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> getHistory(@RequestHeader("X-Customer-Id") String customerId) {
        try {
            List<TransactionResponse> history = transactionService.getTransactionHistory(customerId);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("message", "Transaction history fetched");
            response.put("data", Map.of(
                "transactions", history,
                "totalTransactions", history.size()
            ));

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "ERROR");
            response.put("message", e.getMessage());
            response.put("data", null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok(Map.of(
            "status", "SUCCESS",
            "message", "Transaction Service is running!"
        ));
    }
}
