// The main web framework that makes building web servers easier.
const express = require('express');
// Allows your server to accept requests from other domains (like your frontend running separately).
const cors = require('cors');
// Middleware to parse incoming request bodies, especially useful for POST data.
const bodyParser = require('body-parser');

const app = express(); // The actual web server object.
const PORT = 4400; // Port number the server will listen on

// Tells the server to accept cross-origin requests (useful when frontend and backend run on different ports).
app.use(cors());
// Automatically parses JSON in the request body so you can use req.body.
app.use(bodyParser.json());

app.use('/api/subject', require('./routes/subject'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/subscribe', require('./routes/subscribe'));

app.use('/api/user', require('./routes/user'));


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




