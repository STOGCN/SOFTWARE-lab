package com.example.transactionservice.service;

import com.example.transactionservice.dto.TransferRequest;
import com.example.transactionservice.dto.TransferResponse;
import com.example.transactionservice.model.Transaction;
import com.example.transactionservice.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    @Value("${app.kafka.topic.transactions}")
    private String transactionsTopic;

    public Page<Transaction> getAllTransactions(Pageable pageable) {
        return transactionRepository.findAll(pageable);
    }

    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transaction not found with id: " + id));
    }

    @Transactional
    public TransferResponse transferMoney(TransferRequest transferRequest) {
        // Create transaction record
        Transaction transaction = new Transaction();
        transaction.setFromAccountId(Long.parseLong(transferRequest.getFromAccount()));
        transaction.setToAccountId(Long.parseLong(transferRequest.getToAccount()));
        transaction.setAmount(transferRequest.getAmount());
        transaction.setCreatedAt(Instant.now());
        transaction.setUpdatedAt(Instant.now());
        
        // For demo purposes, we'll assume the transfer is successful
        transaction.setStatus(Transaction.TransactionStatus.SUCCESS);
        
        // Save transaction
        Transaction savedTransaction = transactionRepository.save(transaction);
        
        // Send event to Kafka
        sendTransactionEvent(savedTransaction);
        
        // Return response
        return new TransferResponse("tx-" + savedTransaction.getId(), "SUCCESS");
    }

    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public Transaction updateTransaction(Long id, Transaction transactionDetails) {
        Transaction transaction = getTransactionById(id);
        
        transaction.setFromAccountId(transactionDetails.getFromAccountId());
        transaction.setToAccountId(transactionDetails.getToAccountId());
        transaction.setAmount(transactionDetails.getAmount());
        transaction.setStatus(transactionDetails.getStatus());
        transaction.setReason(transactionDetails.getReason());
        
        return transactionRepository.save(transaction);
    }

    public Transaction patchTransaction(Long id, Transaction transactionDetails) {
        Transaction transaction = getTransactionById(id);
        
        if (transactionDetails.getFromAccountId() != null) {
            transaction.setFromAccountId(transactionDetails.getFromAccountId());
        }
        if (transactionDetails.getToAccountId() != null) {
            transaction.setToAccountId(transactionDetails.getToAccountId());
        }
        if (transactionDetails.getAmount() != null) {
            transaction.setAmount(transactionDetails.getAmount());
        }
        if (transactionDetails.getStatus() != null) {
            transaction.setStatus(transactionDetails.getStatus());
        }
        if (transactionDetails.getReason() != null) {
            transaction.setReason(transactionDetails.getReason());
        }
        
        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(Long id) {
        Transaction transaction = getTransactionById(id);
        transactionRepository.delete(transaction);
    }

    private void sendTransactionEvent(Transaction transaction) {
        // In a real implementation, we would send a more detailed event
        // For now, we'll just send the transaction ID and status
        String event = String.format("{\"id\": %d, \"status\": \"%s\", \"timestamp\": \"%s\"}", 
            transaction.getId(), transaction.getStatus(), Instant.now().toString());
        
        kafkaTemplate.send(transactionsTopic, "transaction-" + transaction.getId(), event);
    }
}