const express = require('express');
const { createUser, getUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/user', (req, res) => {
    // #swagger.tags = ['Users']
    createUser(req, res);
});

router.get('/GetAllusers', (req, res) => {
    // #swagger.tags = ['Users']
    getUsers(req, res);
});

module.exports = router;