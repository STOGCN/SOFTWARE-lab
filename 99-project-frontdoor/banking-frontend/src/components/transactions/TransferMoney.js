import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { transactionService } from '../../services/api';

const TransferMoney = () => {
  const [formData, setFormData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [transactionResult, setTransactionResult] = useState(null);
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
    setSuccess(false);
    setTransactionResult(null);
    
    try {
      const transferData = {
        fromAccount: formData.fromAccount,
        toAccount: formData.toAccount,
        amount: parseFloat(formData.amount)
      };
      
      const response = await transactionService.transferMoney(transferData);
      setTransactionResult(response.data);
      setSuccess(true);
      // Reset form
      setFormData({
        fromAccount: '',
        toAccount: '',
        amount: ''
      });
    } catch (err) {
      setError('Failed to transfer money: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Transfer Money</h2>
      
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Transfer Funds</Card.Title>
          <p>Transfer money between accounts securely.</p>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">
            Transfer successful! Transaction ID: {transactionResult?.transactionId}
          </Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>From Account ID</Form.Label>
              <Form.Control
                type="text"
                name="fromAccount"
                value={formData.fromAccount}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>To Account ID</Form.Label>
              <Form.Control
                type="text"
                name="toAccount"
                value={formData.toAccount}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                min="0.01"
                required
              />
            </Form.Group>
            
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Processing...' : 'Transfer Money'}
            </Button>
            <Button 
              variant="secondary" 
              className="ms-2" 
              onClick={() => navigate('/transactions')}
            >
              View Transactions
            </Button>
          </Form>
        </Card.Body>
      </Card>
      
      <Card>
        <Card.Body>
          <Card.Title>Important Notes</Card.Title>
          <ul>
            <li>Ensure sufficient balance in the source account</li>
            <li>Double-check account numbers before submitting</li>
            <li>All transfers are final and cannot be reversed</li>
            <li>Transfers may take a few seconds to process</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TransferMoney;