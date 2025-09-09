package com.example.notificationservice.listener;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class TransactionEventListener {

    @Value("${app.kafka.topic.transactions}")
    private String transactionsTopic;

    @KafkaListener(topics = "${app.kafka.topic.transactions}")
    public void handleTransactionEvent(String transactionEvent) {
        // In a real implementation, we would process the transaction event
        // and send notifications to users (email, SMS, etc.)
        System.out.println("Received transaction event: " + transactionEvent);
        
        // For demo purposes, we'll just print the event
        // In a real application, you would:
        // 1. Parse the event
        // 2. Determine what kind of notification to send
        // 3. Send the notification via email, SMS, push notification, etc.
    }
}