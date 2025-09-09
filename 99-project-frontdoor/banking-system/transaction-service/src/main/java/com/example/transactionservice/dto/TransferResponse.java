package com.example.transactionservice.dto;

public class TransferResponse {
    private String transactionId;
    private String status;

    // Constructors
    public TransferResponse() {}

    public TransferResponse(String transactionId, String status) {
        this.transactionId = transactionId;
        this.status = status;
    }

    // Getters and Setters
    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}