import mongoose from 'mongoose';

import Users from '../models/users.js';

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.find();
    res.json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const getSingleUser = (req, res) => {
  res.json('hello man');
};
export const createNewUser = (req, res) => {
  const { name, age, rule } = req.body;

  const newUser = new Users({
    name,
    age,
    rule,
  });
  newUser.save();
  res.status(201).json(newUser);
};
export const updateUser = (req, res) => {
  res.json('hello man');
};
export const deleteUser = (req, res) => {
  res.json('hello man');
};
