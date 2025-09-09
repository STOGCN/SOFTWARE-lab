package com.example.accountservice.service;

import com.example.accountservice.model.Account;
import com.example.accountservice.repository.AccountRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public Page<Account> getAllAccounts(Pageable pageable) {
        return accountRepository.findAll(pageable);
    }

    public Account getAccountById(Long id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Account not found with id: " + id));
    }

    public Account createAccount(Account account) {
        // Check if email already exists
        if (accountRepository.findByEmail(account.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Account with email " + account.getEmail() + " already exists");
        }
        return accountRepository.save(account);
    }

    public Account updateAccount(Long id, Account accountDetails) {
        Account account = getAccountById(id);
        
        account.setOwnerName(accountDetails.getOwnerName());
        account.setEmail(accountDetails.getEmail());
        account.setBalance(accountDetails.getBalance());
        account.setStatus(accountDetails.getStatus());
        
        return accountRepository.save(account);
    }

    public Account patchAccount(Long id, Account accountDetails) {
        Account account = getAccountById(id);
        
        if (accountDetails.getOwnerName() != null) {
            account.setOwnerName(accountDetails.getOwnerName());
        }
        if (accountDetails.getEmail() != null) {
            // Check if email already exists for another account
            Optional<Account> existingAccount = accountRepository.findByEmail(accountDetails.getEmail());
            if (existingAccount.isPresent() && !existingAccount.get().getId().equals(id)) {
                throw new IllegalArgumentException("Account with email " + accountDetails.getEmail() + " already exists");
            }
            account.setEmail(accountDetails.getEmail());
        }
        if (accountDetails.getBalance() != null) {
            account.setBalance(accountDetails.getBalance());
        }
        if (accountDetails.getStatus() != null) {
            account.setStatus(accountDetails.getStatus());
        }
        
        return accountRepository.save(account);
    }

    public void deleteAccount(Long id) {
        Account account = getAccountById(id);
        accountRepository.delete(account);
    }

    public BigDecimal getAccountBalance(Long id) {
        Account account = getAccountById(id);
        return account.getBalance();
    }
}