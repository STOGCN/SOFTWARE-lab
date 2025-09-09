import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavigationBar from './components/NavigationBar';
import AccountList from './components/accounts/AccountList';
import CreateAccount from './components/accounts/CreateAccount';
import AccountDetails from './components/accounts/AccountDetails';
import TransactionList from './components/transactions/TransactionList';
import TransferMoney from './components/transactions/TransferMoney';
import NotificationList from './components/notifications/NotificationList';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounts" element={<AccountList />} />
            <Route path="/accounts/create" element={<CreateAccount />} />
            <Route path="/accounts/:id" element={<AccountDetails />} />
            <Route path="/transactions" element={<TransactionList />} />
            <Route path="/transfer" element={<TransferMoney />} />
            <Route path="/notifications" element={<NotificationList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;