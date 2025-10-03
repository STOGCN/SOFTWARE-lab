const e = require('express');
const express = require('express');
const { stat } = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];

app.get('/health', (req, res) => {
    res.send('status: "ok"');
});

app.get('/users', (req, res) => {
    const id = String(req.query.id);
    if (id) {return res.json
    res.json(users);
}); 

app.listen(port, () => {
    console.log("Server is running on http://localhost:3000") );
});