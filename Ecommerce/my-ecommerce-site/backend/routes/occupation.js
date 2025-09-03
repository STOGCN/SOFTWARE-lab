const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.get('/:category', (req, res) => {
  const category = req.params.category.toLowerCase();
  const filePath = path.join(__dirname, '../../json/', category + '.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

module.exports = router;
