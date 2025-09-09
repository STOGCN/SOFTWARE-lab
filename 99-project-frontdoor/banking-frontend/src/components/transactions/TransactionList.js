import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert, Pagination, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { transactionService } from '../../services/api';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionService.getTransactions(page, 10);
      setTransactions(response.data.content || response.data);
      setTotalPages(response.data.totalPages || 1);
      setError(null);
    } catch (err) {
      setError('Failed to fetch transactions: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionService.deleteTransaction(id);
        fetchTransactions(); // Refresh the list
      } catch (err) {
        setError('Failed to delete transaction: ' + err.message);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'SUCCESS': return 'success';
      case 'FAILED': return 'danger';
      case 'PENDING': return 'warning';
      case 'CANCELED': return 'secondary';
      default: return 'primary';
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Transactions</h2>
        <Button variant="primary" onClick={() => navigate('/transfer')}>
          Transfer Money
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>From Account</th>
            <th>To Account</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Reason</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.fromAccountId}</td>
                <td>{transaction.toAccountId}</td>
                <td>${transaction.amount?.toFixed(2)}</td>
                <td>
                  <Badge bg={getStatusVariant(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </td>
                <td>{transaction.reason || '-'}</td>
                <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/transactions/${transaction.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          {[...Array(totalPages).keys()].map((pageNum) => (
            <Pagination.Item
              key={pageNum}
              active={pageNum === page}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </div>
  );
};

export default TransactionList;