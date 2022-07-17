import mongoose from 'mongoose';

import Users from '../models/users.js';

/**
 * find => returns an array
 * findOne => returns a single object
 */

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.find();
    res.json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getSingleUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const query = { _id: userId }; // _id comes from DB by default (automated feild)
    // const query = { name }; // name comes from req.body and it's exist in model
    // const query = { name: userName }; // if userName varible name is different
    // const selectedUser = await Users.find(query); // this will return array
    // const selectedUser = await Users.findOne(query); // this will return object
    const selectedUser = await Users.findById(userId); // this will return object

    res.status(200).json(selectedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createNewUser = async (req, res) => {
  // const userObject = req.body; // {name: userObject.name, ...}
  // const userObject = req.body; // copy by referrence // {...userObject}
  // const {...rest} = req.body; // copy by value // {...rest}
  // const {name, age, rule} = req.body; // {name, age, rule}
  // const ahmed = {...req.body, name: "mohammed" } // this will override name
  const userObject = req.body;
  try {
    // const newUser = new Users({
    //   ...userObject,
    // });d
    // newUser.save(); // old way
    const newUser = await Users.create(userObject); // new way
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const userObject = req.body;
  const userId = req.params.id;
  try {
    // const selectedUser = await Users.findOneAndUpdate({ id: userId }, { ...userObject });
    const selectedUser = await Users.findByIdAndUpdate(userId, { ...userObject });

    res.status(200).json(selectedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await Users.findByIdAndDelete(userId);

    res.status(200).json({ message: `${deletedUser.name} is deleted succefully` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
