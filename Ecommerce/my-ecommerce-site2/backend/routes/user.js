const express = require('express');
const router = express.Router();

const user = require('../services/userService');

router.post('/:action', (req, res) => {
    const action = req.params.action;
    if(action == 'register'){
        console.log(action);
        const response = user.register(req.body)
        res.status(200).json(response);
    } 
    
    if(action == 'login'){
        console.log(action);
        const response = user.login(req.body)
        res.status(200).json(response);
    }
});

module.exports = router;
  