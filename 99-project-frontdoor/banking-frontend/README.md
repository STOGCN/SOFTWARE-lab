# Banking Frontend Application

This is the frontend application for the Banking Microservices system, built with React.

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## How to Run the Application

### Installation

First, install the required dependencies:

```bash
npm install
```

### Running in Development Mode

To start the development server:

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000) in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

### Building for Production

To build the app for production:

```bash
npm run build
```

The build will be stored in the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Integration with Backend Services

This frontend application connects to the following backend services:
- Account Service: http://localhost:8080
- Transaction Service: http://localhost:8081
- Notification Service: http://localhost:8082

Make sure to start the backend services before running the frontend application. See the main project README.md for detailed instructions on how to start the backend services.

## Available Scripts

In the project directory, you can also run:

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## How to Test the Frontend Application

### Running Tests

To run the test suite:

```bash
npm test
```

This will launch the test runner in interactive watch mode.

### Testing Components

The application includes unit tests for components and services. Tests are located in files with the `.test.js` extension.

### Manual Testing Guide

1. **Starting the Application**
   - Ensure backend services are running (see main README)
   - Run `npm start` to launch the frontend
   - Open [http://localhost:3000](http://localhost:3000) in your browser

2. **Testing Account Features**
   - Navigate to the "Accounts" section using the navigation bar
   - Click "Create Account" to open the account creation form
   - Fill in the required fields and submit
   - Verify the new account appears in the accounts list
   - Click on an account to view its details

3. **Testing Transaction Features**
   - Navigate to the "Transactions" section
   - Click "Transfer Money" to open the transfer form
   - Enter valid account IDs and transfer amount
   - Submit the transfer and verify success message
   - Check the transactions list for the new transaction

4. **Testing Navigation**
   - Use the navigation bar to switch between sections
   - Verify all links work correctly
   - Check that the active section is highlighted

5. **Testing Error Handling**
   - Try to create an account with invalid data
   - Try to transfer more money than available in an account
   - Verify appropriate error messages are displayed

### Testing with API Calls (Using Postman or curl)

You can also test all HTTP methods (GET, POST, PUT, DELETE, PATCH) using tools like Postman or curl directly against the backend services:

#### 1. Account Service (http://localhost:8080)

**POST /accounts** - Create a new account
```bash
curl -X POST http://localhost:8080/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "ownerName": "John Doe",
    "email": "john.doe@example.com",
    "initialBalance": 1000.00
  }'
```

**GET /accounts** - Get all accounts
```bash
curl http://localhost:8080/accounts
```

**GET /accounts/{id}** - Get account by ID
```bash
curl http://localhost:8080/accounts/1
```

**PUT /accounts/{id}** - Update entire account
```bash
curl -X PUT http://localhost:8080/accounts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "ownerName": "John Smith",
    "email": "john.smith@example.com",
    "balance": 1500.00,
    "status": "ACTIVE"
  }'
```

**PATCH /accounts/{id}** - Partially update account
```bash
curl -X PATCH http://localhost:8080/accounts/1 \
  -H "Content-Type: application/merge-patch+json" \
  -d '{
    "ownerName": "John Updated",
    "balance": 2000.00
  }'
```

**DELETE /accounts/{id}** - Delete account
```bash
curl -X DELETE http://localhost:8080/accounts/1
```

#### 2. Transaction Service (http://localhost:8081)

**POST /transactions/transfer** - Transfer money
```bash
curl -X POST http://localhost:8081/transactions/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccount": 1,
    "toAccount": 2,
    "amount": 100.00
  }'
```

**POST /transactions** - Create a transaction manually
```bash
curl -X POST http://localhost:8081/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": 1,
    "toAccountId": 2,
    "amount": 50.00,
    "reason": "Manual transaction"
  }'
```

**GET /transactions** - Get all transactions
```bash
curl http://localhost:8081/transactions
```

**GET /transactions/{id}** - Get transaction by ID
```bash
curl http://localhost:8081/transactions/1
```

**PUT /transactions/{id}** - Update entire transaction
```bash
curl -X PUT http://localhost:8081/transactions/1 \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": 1,
    "toAccountId": 3,
    "amount": 75.00,
    "status": "CANCELED",
    "reason": "Cancel transfer"
  }'
```

**PATCH /transactions/{id}** - Partially update transaction
```bash
curl -X PATCH http://localhost:8081/transactions/1 \
  -H "Content-Type: application/merge-patch+json" \
  -d '{
    "reason": "Updated reason",
    "status": "CANCELED"
  }'
```

**DELETE /transactions/{id}** - Delete transaction
```bash
curl -X DELETE http://localhost:8081/transactions/1
```

### API Documentation

You can also access the Swagger UI for each service to test directly:
- Account Service: http://localhost:8080/swagger-ui.html
- Transaction Service: http://localhost:8081/swagger-ui.html

These Swagger UIs provide interactive documentation where you can:
1. See all available endpoints
2. View request/response schemas
3. Test each endpoint directly in the browser
4. See example requests and responses

Both Postman and the frontend application are valid ways to test the system. Postman gives you more direct control over the HTTP requests, while the frontend provides a user-friendly interface that demonstrates how a real user would interact with the system.

### Common Testing Scenarios

1. **Successful Account Creation**
   - Create a new account with valid data
   - Verify the account appears in the list
   - Verify account details are correct

2. **Successful Money Transfer**
   - Create two accounts
   - Transfer money between them
   - Verify both account balances are updated
   - Verify the transaction appears in the transaction list

3. **Error Handling**
   - Try to transfer negative amounts
   - Try to transfer to non-existent accounts
   - Verify appropriate error messages are displayed

4. **UI Responsiveness**
   - Test on different screen sizes
   - Verify the layout adjusts appropriately
   - Check that all elements are accessible
