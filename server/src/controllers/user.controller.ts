import { Request, Response } from 'express';
import UserModel, { UserDocument } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            username,
            password: hashedPassword,
            role: role || 'user',
            details: {
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                location: '',
                profilePic: '',
                gender: '',
                socialMedia: {
                    LinkedIn: '',
                    Instagram: '',
                    Telegram: '',
                    X: '',
                },
            },
        });

        await user.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET || '', {
            expiresIn: '1h',
        });

        return res.status(200).json({ token, userId: user._id, username: user.username });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        const result = await UserModel.updateOne(
            { _id: userId },
            {
                $set: {
                    details: {
                        ...updateData.details,
                        profilePic: '', // todo
                    },
                },
            }
        );

        if (result.modifiedCount === 1) {
            const updatedUser = await UserModel.findById(userId);
            return res.status(200).json(updatedUser);
        } else {
            return res.status(500).json({ message: 'Failed to update user' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
