package com.payease.transaction_service.service;

import com.payease.transaction_service.dto.SendMoneyRequest;
import com.payease.transaction_service.dto.TopUpRequest;
import com.payease.transaction_service.dto.TransactionResponse;
import com.payease.transaction_service.entity.IdempotencyRecord;
import com.payease.transaction_service.entity.Transaction;
import com.payease.transaction_service.entity.Wallet;
import com.payease.transaction_service.repository.IdempotencyRepository;
import com.payease.transaction_service.repository.TransactionRepository;
import com.payease.transaction_service.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private IdempotencyRepository idempotencyRepository;

    public BigDecimal getBalance(String customerId) {
        Wallet wallet = walletRepository.findByCustomerId(customerId)
                .orElseGet(() -> {
                    Wallet newWallet = new Wallet();
                    newWallet.setCustomerId(customerId);
                    newWallet.setBalance(BigDecimal.ZERO);
                    return walletRepository.save(newWallet);
                });

        return wallet.getBalance();
    }

    @Transactional(rollbackFor = Exception.class)
    public Transaction sendMoney(String fromCustomerId, SendMoneyRequest request, String idempotencyKey) {
        // 1. Check idempotency if key provided
        if (idempotencyKey != null && !idempotencyKey.trim().isEmpty()) {
            Optional<IdempotencyRecord> existing = idempotencyRepository.findByIdempotencyKeyAndCustomerId(idempotencyKey.trim(), fromCustomerId);
            if (existing.isPresent() && "COMPLETED".equals(existing.get().getStatus())) {
                return transactionRepository.findById(existing.get().getTransactionId())
                        .orElseThrow(() -> new RuntimeException("Transaction previously executed"));
            }
        }

        // 2. Fetch sender wallet with Pessimistic Write Lock (SELECT FOR UPDATE) to prevent race conditions
        Wallet senderWallet = walletRepository.findByCustomerIdForUpdate(fromCustomerId)
                .orElseGet(() -> {
                    Wallet newWallet = new Wallet();
                    newWallet.setCustomerId(fromCustomerId);
                    newWallet.setBalance(BigDecimal.ZERO);
                    return walletRepository.save(newWallet);
                });

        if (senderWallet.getBalance().compareTo(request.getAmount()) < 0) {
            throw new RuntimeException("Insufficient wallet balance. Please add money first.");
        }

        // 3. Atomically debit sender
        senderWallet.setBalance(
                senderWallet.getBalance().subtract(request.getAmount())
        );
        walletRepository.save(senderWallet);

        // 4. Atomically credit receiver (or initialize if first transaction)
        if (request.getToMobile() != null && !request.getToMobile().trim().isEmpty()) {
            Wallet receiverWallet = walletRepository.findByCustomerIdForUpdate(request.getToMobile().trim())
                    .orElseGet(() -> {
                        Wallet newReceiver = new Wallet();
                        newReceiver.setCustomerId(request.getToMobile().trim());
                        newReceiver.setBalance(BigDecimal.ZERO);
                        return walletRepository.save(newReceiver);
                    });
            receiverWallet.setBalance(receiverWallet.getBalance().add(request.getAmount()));
            walletRepository.save(receiverWallet);
        }

        // 5. Persist ledger record
        Transaction transaction = new Transaction();
        transaction.setId("TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        transaction.setSenderId(fromCustomerId);
        transaction.setReceiverId(request.getToMobile());
        transaction.setAmount(request.getAmount());
        transaction.setType("DEBIT");
        transaction.setStatus("SUCCESS");
        transaction.setRemarks(request.getRemarks() != null ? request.getRemarks() : "ApnaPay Transfer");

        Transaction savedTx = transactionRepository.save(transaction);

        // 6. Record idempotency key if present
        if (idempotencyKey != null && !idempotencyKey.trim().isEmpty()) {
            IdempotencyRecord record = new IdempotencyRecord(
                    idempotencyKey.trim(),
                    fromCustomerId,
                    savedTx.getId(),
                    "COMPLETED",
                    "SUCCESS"
            );
            idempotencyRepository.save(record);
        }

        return savedTx;
    }

    // Overload for backward compatibility
    public Transaction sendMoney(String fromCustomerId, SendMoneyRequest request) {
        return sendMoney(fromCustomerId, request, null);
    }

    @Transactional(rollbackFor = Exception.class)
    public Transaction topUp(String customerId, TopUpRequest request) {
        Wallet wallet = walletRepository.findByCustomerIdForUpdate(customerId)
                .orElseGet(() -> {
                    Wallet newWallet = new Wallet();
                    newWallet.setCustomerId(customerId);
                    newWallet.setBalance(BigDecimal.ZERO);
                    return walletRepository.save(newWallet);
                });

        wallet.setBalance(wallet.getBalance().add(request.getAmount()));
        walletRepository.save(wallet);

        Transaction transaction = new Transaction();
        transaction.setId("TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        transaction.setSenderId("BANK");
        transaction.setReceiverId(customerId);
        transaction.setAmount(request.getAmount());
        transaction.setType("CREDIT");
        transaction.setStatus("SUCCESS");
        transaction.setRemarks("Top up from " + (request.getSource() != null ? request.getSource() : "UPI / Bank"));

        return transactionRepository.save(transaction);
    }

    public List<TransactionResponse> getTransactionHistory(String customerId) {
        List<Transaction> transactions = transactionRepository
                .findBySenderIdOrReceiverIdOrderByCreatedAtDesc(customerId, customerId);

        return transactions.stream().map(t -> {
            TransactionResponse res = new TransactionResponse();
            res.setTransactionId(t.getId());
            res.setAmount(t.getAmount());
            res.setStatus(t.getStatus());
            res.setRemarks(t.getRemarks());
            res.setTimestamp(t.getCreatedAt());

            if (t.getSenderId().equals(customerId)) {
                res.setType("DEBIT");
                res.setWith(t.getReceiverId());
            } else {
                res.setType("CREDIT");
                res.setWith(t.getSenderId());
            }

            return res;
        }).collect(Collectors.toList());
    }
}
