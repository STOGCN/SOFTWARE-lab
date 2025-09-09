import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Spinner, Alert, Card, ListGroup } from 'react-bootstrap';
import { accountService } from '../../services/api';

const AccountDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    balance: '',
    status: 'ACTIVE'
  });

  useEffect(() => {
    fetchAccount();
  }, [id]);

  const fetchAccount = async () => {
    try {
      setLoading(true);
      const response = await accountService.getAccount(id);
      setAccount(response.data);
      setFormData({
        ownerName: response.data.ownerName,
        email: response.data.email,
        balance: response.data.balance,
        status: response.data.status
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch account: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accountData = {
        ownerName: formData.ownerName,
        email: formData.email,
        balance: parseFloat(formData.balance),
        status: formData.status
      };
      
      await accountService.updateAccount(id, accountData);
      setEditMode(false);
      fetchAccount(); // Refresh the account data
    } catch (err) {
      setError('Failed to update account: ' + err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await accountService.deleteAccount(id);
        navigate('/accounts');
      } catch (err) {
        setError('Failed to delete account: ' + err.message);
      }
    }
  };

  const handlePatch = async () => {
    // Example of partial update
    try {
      const patchData = {
        status: formData.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE'
      };
      
      await accountService.patchAccount(id, patchData);
      fetchAccount(); // Refresh the account data
    } catch (err) {
      setError('Failed to update account status: ' + err.message);
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
        <h2>Account Details</h2>
        <Button variant="secondary" onClick={() => navigate('/accounts')}>
          Back to Accounts
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {account && (
        <div>
          {editMode ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Owner Name</Form.Label>
                <Form.Control
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Balance</Form.Label>
                <Form.Control
                  type="number"
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="SUSPENDED">SUSPENDED</option>
                  <option value="CLOSED">CLOSED</option>
                </Form.Select>
              </Form.Group>
              
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
              <Button 
                variant="secondary" 
                className="ms-2" 
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            </Form>
          ) : (
            <div>
              <Card>
                <Card.Body>
                  <Card.Title>Account Information</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>ID:</strong> {account.id}</ListGroup.Item>
                    <ListGroup.Item><strong>Owner Name:</strong> {account.ownerName}</ListGroup.Item>
                    <ListGroup.Item><strong>Email:</strong> {account.email}</ListGroup.Item>
                    <ListGroup.Item><strong>Balance:</strong> ${account.balance?.toFixed(2)}</ListGroup.Item>
                    <ListGroup.Item><strong>Status:</strong> {account.status}</ListGroup.Item>
                    <ListGroup.Item><strong>Created At:</strong> {new Date(account.createdAt).toLocaleString()}</ListGroup.Item>
                    <ListGroup.Item><strong>Updated At:</strong> {new Date(account.updatedAt).toLocaleString()}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
              
              <div className="mt-3">
                <Button 
                  variant="primary" 
                  className="me-2" 
                  onClick={() => setEditMode(true)}
                >
                  Edit Account
                </Button>
                <Button 
                  variant="warning" 
                  className="me-2" 
                  onClick={handlePatch}
                >
                  Toggle Status
                </Button>
                <Button 
                  variant="danger" 
                  onClick={handleDelete}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountDetails;