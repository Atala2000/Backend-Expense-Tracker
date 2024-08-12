import { User } from '../models/models';
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { saveModelData } from "../services/db.service";
import { SessionData } from 'express-session';

const hashPassword = async (password: string) => {
    return bcrypt.hash(password, 10);
};

const validatePassword = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
};

declare module 'express-session' {
	interface SessionData {
		user?: {id: string, email: string}
	}
}

const loginUser = async (email: string, password: string, req: Request, res: Response) => {
    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Validate the password
        const isPasswordValid = await validatePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If password is valid, create session
        req.session.user = { id: user._id.toString(), email: user.email };
        return res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const Register = async (req: Request, res: Response) => {
    const { name, email, password, phoneNumber, address, role } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password || !phoneNumber || !address || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Hash the password before saving
        const hashedPassword = await hashPassword(password);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            address,
            role
        });

        await saveModelData(user);

        // Login the user after registration
        return loginUser(email, password, req, res);

    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: `Error creating user: ${err}` });
    }
};

const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Use the common login logic
    return loginUser(email, password, req, res);
};

const Logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error logging out');
        } else {
            res.send('Logged out');
        }
    });
};

export { Register, Login, Logout };
