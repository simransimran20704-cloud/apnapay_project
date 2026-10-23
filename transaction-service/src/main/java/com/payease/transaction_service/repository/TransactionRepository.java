package com.payease.transaction_service.repository;

import com.payease.transaction_service.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, String> {
    List<Transaction> findBySenderIdOrReceiverIdOrderByCreatedAtDesc(String senderId, String receiverId);
}