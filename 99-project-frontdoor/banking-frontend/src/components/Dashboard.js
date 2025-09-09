import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="mb-4">Banking System Dashboard</h1>
      <Row>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Accounts</Card.Title>
              <Card.Text>
                Manage customer accounts, view account details, and check balances.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/accounts')}>
                View Accounts
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Transfer Money</Card.Title>
              <Card.Text>
                Transfer funds between accounts securely.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/transfer')}>
                Transfer Funds
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Transactions</Card.Title>
              <Card.Text>
                View transaction history and details.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/transactions')}>
                View Transactions
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Notifications</Card.Title>
              <Card.Text>
                View system notifications and alerts.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/notifications')}>
                View Notifications
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Create Account</Card.Title>
              <Card.Text>
                Create a new customer account.
              </Card.Text>
              <Button variant="success" onClick={() => navigate('/accounts/create')}>
                Create New Account
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;