import axios from 'axios';

// Base URLs for our services (these will need to be updated when the backend is running)
const ACCOUNT_SERVICE_URL = 'http://localhost:8080';
const TRANSACTION_SERVICE_URL = 'http://localhost:8081';
const NOTIFICATION_SERVICE_URL = 'http://localhost:8082';

// Account Service API
export const accountService = {
  // Get all accounts
  getAccounts: (page = 0, size = 10, sort = 'id,asc') => {
    return axios.get(`${ACCOUNT_SERVICE_URL}/accounts`, {
      params: { page, size, sort }
    });
  },

  // Get account by ID
  getAccount: (id) => {
    return axios.get(`${ACCOUNT_SERVICE_URL}/accounts/${id}`);
  },

  // Create a new account
  createAccount: (accountData) => {
    return axios.post(`${ACCOUNT_SERVICE_URL}/accounts`, accountData);
  },

  // Update an account
  updateAccount: (id, accountData) => {
    return axios.put(`${ACCOUNT_SERVICE_URL}/accounts/${id}`, accountData);
  },

  // Partially update an account
  patchAccount: (id, accountData) => {
    return axios.patch(`${ACCOUNT_SERVICE_URL}/accounts/${id}`, accountData, {
      headers: {
        'Content-Type': 'application/merge-patch+json'
      }
    });
  },

  // Delete an account
  deleteAccount: (id) => {
    return axios.delete(`${ACCOUNT_SERVICE_URL}/accounts/${id}`);
  },

  // Get account balance
  getAccountBalance: (id) => {
    return axios.get(`${ACCOUNT_SERVICE_URL}/accounts/${id}/balance`);
  },

  // Get account statements
  getAccountStatements: (id) => {
    return axios.get(`${ACCOUNT_SERVICE_URL}/accounts/${id}/statements`);
  }
};

// Transaction Service API
export const transactionService = {
  // Transfer money between accounts
  transferMoney: (transferData) => {
    return axios.post(`${TRANSACTION_SERVICE_URL}/transactions/transfer`, transferData);
  },

  // Get all transactions
  getTransactions: (page = 0, size = 10, sort = 'id,asc') => {
    return axios.get(`${TRANSACTION_SERVICE_URL}/transactions`, {
      params: { page, size, sort }
    });
  },

  // Get transaction by ID
  getTransaction: (id) => {
    return axios.get(`${TRANSACTION_SERVICE_URL}/transactions/${id}`);
  },

  // Create a transaction
  createTransaction: (transactionData) => {
    return axios.post(`${TRANSACTION_SERVICE_URL}/transactions`, transactionData);
  },

  // Update a transaction
  updateTransaction: (id, transactionData) => {
    return axios.put(`${TRANSACTION_SERVICE_URL}/transactions/${id}`, transactionData);
  },

  // Partially update a transaction
  patchTransaction: (id, transactionData) => {
    return axios.patch(`${TRANSACTION_SERVICE_URL}/transactions/${id}`, transactionData, {
      headers: {
        'Content-Type': 'application/merge-patch+json'
      }
    });
  },

  // Delete a transaction
  deleteTransaction: (id) => {
    return axios.delete(`${TRANSACTION_SERVICE_URL}/transactions/${id}`);
  }
};

// Notification Service API
export const notificationService = {
  // Get health status
  getHealth: () => {
    return axios.get(`${NOTIFICATION_SERVICE_URL}/health`);
  },

  // Get notifications (if endpoint exists)
  getNotifications: () => {
    // This is a placeholder - would need to be implemented based on actual API
    return Promise.resolve({ data: [] });
  }
};

export default {
  accountService,
  transactionService,
  notificationService
};