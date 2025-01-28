import User from '../Models/user.model.js';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;

        // Create new user
        const user = new User({
            name,
            email,
            password, // In production, you should hash this
            phoneNumber,
            accountBalance: 10000, // Starting balance
            stocks: [],
            activities: []
        });

        const savedUser = await user.save();

        res.status(201).json({
            message: 'User created successfully',
            userId: savedUser._id,
            name: savedUser.name,
            email: savedUser.email
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: error.message });
    }
};