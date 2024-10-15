const express = require('express');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.post('/user', (req, res) => {
    // #swagger.tags = ['Users']
    createUser(req, res);
});

router.get('/GetAllusers', (req, res) => {
    // #swagger.tags = ['Users']
    getUsers(req, res);
});

router.get('/users/:id', (req, res) => {
    // #swagger.tags = ['Users']
    getUserById(req, res);
});

router.put('/users/:id', (req, res) => {
    // #swagger.tags = ['Users']
    updateUser(req, res);
});

router.delete('/users/:id', (req, res) => {
    // #swagger.tags = ['Users']
    deleteUser(req, res);
});

module.exports = router;