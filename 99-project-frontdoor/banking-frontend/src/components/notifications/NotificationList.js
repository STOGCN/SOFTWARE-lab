import React, { useState, useEffect } from 'react';
import { Table, Spinner, Alert, Badge, Button } from 'react-bootstrap';
import { notificationService } from '../../services/api';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [healthStatus, setHealthStatus] = useState(null);

  useEffect(() => {
    fetchNotifications();
    fetchHealthStatus();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would fetch actual notifications
      // For now, we'll use mock data to demonstrate the UI
      const mockNotifications = [
        {
          id: 1,
          type: 'TRANSFER_SUCCESS',
          message: 'Transfer of $500.00 completed successfully',
          timestamp: new Date().toISOString(),
          read: false
        },
        {
          id: 2,
          type: 'ACCOUNT_CREATED',
          message: 'New account #12345 created successfully',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          read: true
        },
        {
          id: 3,
          type: 'TRANSFER_FAILED',
          message: 'Transfer failed due to insufficient funds',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          read: false
        }
      ];
      setNotifications(mockNotifications);
      setError(null);
    } catch (err) {
      setError('Failed to fetch notifications: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchHealthStatus = async () => {
    try {
      const response = await notificationService.getHealth();
      setHealthStatus(response.data);
    } catch (err) {
      // Health check failed
      setHealthStatus({ status: 'DOWN' });
    }
  };

  const getNotificationTypeVariant = (type) => {
    switch (type) {
      case 'TRANSFER_SUCCESS': return 'success';
      case 'ACCOUNT_CREATED': return 'info';
      case 'TRANSFER_FAILED': return 'danger';
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
        <h2>Notifications</h2>
        <div>
          {healthStatus && (
            <Badge bg={healthStatus.status === 'UP' ? 'success' : 'danger'}>
              Service Status: {healthStatus.status}
            </Badge>
          )}
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Message</th>
            <th>Timestamp</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {notifications && notifications.length > 0 ? (
            notifications.map((notification) => (
              <tr key={notification.id} className={notification.read ? '' : 'table-warning'}>
                <td>
                  <Badge bg={getNotificationTypeVariant(notification.type)}>
                    {notification.type}
                  </Badge>
                </td>
                <td>{notification.message}</td>
                <td>{new Date(notification.timestamp).toLocaleString()}</td>
                <td>{notification.read ? 'Read' : 'Unread'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No notifications found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="mt-3">
        <Button variant="primary" onClick={fetchNotifications}>
          Refresh Notifications
        </Button>
      </div>
    </div>
  );
};

export default NotificationList;