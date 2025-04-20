import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '12h' });
};

export const signup = async (req, res) => {
  try {
    const { id, password, name, mobileNo, policeStaitionId } = req.body;
    const user = await User.create(id, password, name, mobileNo, policeStaitionId);
    const token = generateToken(user.unique_id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed' });
  }
};

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { id, password } = req.body;
    const user = await User.findById(id);


    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user.unique_id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }

};

export const getCurrentUser = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  };


