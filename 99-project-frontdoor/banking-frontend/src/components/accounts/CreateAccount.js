import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { accountService } from '../../services/api';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    initialBalance: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const accountData = {
        ownerName: formData.ownerName,
        email: formData.email,
        initialBalance: parseFloat(formData.initialBalance) || 0
      };
      
      await accountService.createAccount(accountData);
      setSuccess(true);
      // Reset form
      setFormData({
        ownerName: '',
        email: '',
        initialBalance: ''
      });
      // Redirect to accounts list after 2 seconds
      setTimeout(() => {
        navigate('/accounts');
      }, 2000);
    } catch (err) {
      setError('Failed to create account: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create New Account</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Account created successfully!</Alert>}
      
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
          <Form.Label>Initial Balance</Form.Label>
          <Form.Control
            type="number"
            name="initialBalance"
            value={formData.initialBalance}
            onChange={handleChange}
            step="0.01"
            min="0"
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Account'}
        </Button>
        <Button 
          variant="secondary" 
          className="ms-2" 
          onClick={() => navigate('/accounts')}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default CreateAccount;