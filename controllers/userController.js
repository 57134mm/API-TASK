const { User } = require('../models');

exports.createUser = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }

    try {
        const user = await User.create({ name, email });
        return res.status(201).json({
            message: 'User created successfully',
            user,
        });
    } catch (error) {
        console.error('Error creating user:', error);

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Validation error',
                details: error.errors.map(err => err.message),
            });
        }

        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred while creating the user.',
            details: error.message,
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        if (users.length === 0) {
            return res.status(404).json({
                message: 'No users found.'
            });
        }

        res.status(200).json({
            message: 'Users fetch successfully',
            users,
        });
    } catch (error) {
        console.error('Error fetching users:', error);

        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred while fetching users.',
            details: error.message,
        });
    }
};

