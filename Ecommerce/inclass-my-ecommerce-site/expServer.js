const express = require('express');
const path = require('path');

const app = express();
//server static files from current projject folder
app.use(express.static(__dirname));

app.get('/', (req,res) => {
    res.senFile(path.join(__dirname, "index.html"))
});
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000")
});
