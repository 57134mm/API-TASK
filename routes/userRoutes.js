const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, UpdatingUser, deleteUser } = require('../controllers/userController');
const fileUpload = require('../fileUpload');

router.post('/CreateUser', fileUpload, (req, res) => {
    // #swagger.tags = ['Users']
    createUser(req, res);
});

router.get('/GetAllusers', (req, res) => {
    // #swagger.tags = ['Users']
    getUsers(req, res);
});

router.get('/GetUserByID/:id', (req, res) => {
    // #swagger.tags = ['Users']
    getUserById(req, res);
});

router.put('/UpdateUser/:id', (req, res) => {
    // #swagger.tags = ['Users']
    updateUser(req, res);
});

router.patch('/UpdateUser/:id', (req, res) => {
    // #swagger.tags = ['Users']
    UpdatingUser(req, res);
});

router.delete('/DeleteUser/:id', (req, res) => {
    // #swagger.tags = ['Users']
    deleteUser(req, res);
});

module.exports = router;