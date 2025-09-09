import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { accountService } from '../../services/api';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccounts();
  }, [page]);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await accountService.getAccounts(page, 10);
      setAccounts(response.data.content || response.data);
      setTotalPages(response.data.totalPages || 1);
      setError(null);
    } catch (err) {
      setError('Failed to fetch accounts: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await accountService.deleteAccount(id);
        fetchAccounts(); // Refresh the list
      } catch (err) {
        setError('Failed to delete account: ' + err.message);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
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
        <h2>Accounts</h2>
        <Button variant="primary" onClick={() => navigate('/accounts/create')}>
          Create Account
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Owner Name</th>
            <th>Email</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts && accounts.length > 0 ? (
            accounts.map((account) => (
              <tr key={account.id}>
                <td>{account.id}</td>
                <td>{account.ownerName}</td>
                <td>{account.email}</td>
                <td>${account.balance?.toFixed(2)}</td>
                <td>{account.status}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/accounts/${account.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(account.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No accounts found
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

export default AccountList;