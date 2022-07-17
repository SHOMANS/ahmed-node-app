import mongoose from 'mongoose';

const usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  rule: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
});

const Users = mongoose.model('Users', usersSchema); // this will create table with name Users and has usersSchema as a structure

export default Users;
