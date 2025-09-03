var http = require('http');


const fs = require('fs');
const path = require('path');


const PORT = 4000;

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'GET' && req.url === '/api/subject') {
    const subject = require('./data/contact_subject.json');
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(subject);
  /*} else if (req.method === 'POST' && req.url === '/api/contact') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const contactData = JSON.parse(body);
      console.log('Contact form submitted:', contactData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'Message received!' }));
    });*/
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log('Server running at http://localhost:${PORT}');
});