const { User } = require('../models');

exports.createUser = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }

    try {
        const files = req.files ? req.files.map(file => file.filename) : [];

        const userData = {
            name,
            email,
            files,
            ...req.body,
        };

        const user = await User.create(userData);

        return res.status(201).json({
            message: 'User created successfully',
            user,
        });
    } catch (error) {
        console.error('Error creating user:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: 'Email already exists',
                message: 'A user with this email already exists.',
            });
        }

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
            message: 'Users fetched successfully',
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

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        return res.status(200).json({
            message: 'User fetched successfully',
            user,
        });
    } catch (error) {
        console.error('Error fetching user:', error);

        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred while fetching the user.',
            details: error.message,
        });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();

        return res.status(200).json({
            message: 'User updated successfully',
            user,
        });
    } catch (error) {
        console.error('Error updating user:', error);

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Validation error',
                details: error.errors.map(err => err.message),
            });
        }

        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred while updating the user.',
            details: error.message,
        });
    }
};

exports.UpdatingUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name && !email) {
        return res.status(400).json({ error: 'At least one of name or email is required to update.' });
    }

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();

        return res.status(200).json({
            message: 'User updated successfully',
            user,
        });
    } catch (error) {
        console.error('Error updating user:', error);

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Validation error',
                details: error.errors.map(err => err.message),
            });
        }

        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred while updating the user.',
            details: error.message,
        });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        await user.destroy();

        return res.status(200).json({
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting user:', error);

        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred while deleting the user.',
            details: error.message,
        });
    }
};


