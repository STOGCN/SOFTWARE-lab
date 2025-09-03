const express = require('express');
const router = express.Router();

const category = require('../../json/occupation-cat.json');

router.get('/', (req, res) => {
  res.json(category);
});

module.exports = router;