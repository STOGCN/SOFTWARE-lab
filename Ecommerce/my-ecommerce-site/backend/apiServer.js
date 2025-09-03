const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4400;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/category', require('./routes/category.js'));
app.use('/api/occupation', require('./routes/occupation.js'))
app.use('/api/register', require('./routes/register.js'))
app.use('/api/login', require('./routes/login.js'))

app.listen(PORT, () => {
    console.log("Server running at http://localhost:"+PORT);

})
