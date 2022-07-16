import express from 'express';
import mongoose from 'mongoose';

const CONNECTION_URL = 'mongodb+srv://SHOMANS:ffs1TAgYeh7hu9l0@cluster0.wmrug.mongodb.net/?retryWrites=true&w=majority';
const PORT = 5000;

const app = express();

const fakeData = [
  { id: 1, name: 'Ahmed', age: 38, rule: 'admin' },
  { id: 2, name: 'Mohammed', age: 23, rule: 'customer' },
];

app.use(express.json());

// this midlleware is for checking if the user rule in the body equals admin,
// it will continue if not it will respond with error

// app.use('/', (req, res, next) => {
//   if (req.body.rule === 'admin') {
//     next();
//   }
//   res.status(401).json({ error: 'you are not allowed to request' });
// });

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log('server running on port', PORT)))
  .catch((err) => console.log(err));

app.get('/users/all', (req, res) => {
  console.log('congrats! you are getting data from / url');
  res.status(200).json(fakeData); // http://localhost:5000/users/all
});

// get single user
app.get('/user/:id', (req, res) => {
  console.log('congrats! you are getting data from / url');

  const userId = req.params.id;

  // find single user from fake data array
  const user = fakeData.find((user) => Number(userId) === user.id);

  if (!user) res.status(404).json({ error: 'user not found' }); // if not exist on array http://localhost:5000/user/3
  res.status(200).json(user); // send the single user if found http://localhost:5000/user/1
});

// create new user
app.post('/user/create', async (req, res) => {
  console.log('congrats! you are creating new data');
  const { name, age, rule } = req.body; // distruction data from body
  if (name && age && rule) {
    const newUser = { name, age, rule, id: Math.floor(Math.random() * 100) }; // new user object
    fakeData.push(newUser); // push the new customer to the data
    res.status(201).json(newUser); // if body is correct
  }
  res.status(400).json({ error: 'bad request' }); // if there is issue in the body
});

// update current user
app.put('/user/update/:id', (req, res) => {
  console.log('You are updating current user');
  const userId = Number(req.params.id);
  if (!fakeData.some((user) => user.id === userId)) {
    res.status(404).json({ error: 'User not found' });
  }
  const { name, age, rule } = req.body;
  let newUser = {};
  if (name && age && rule) {
    fakeData.map((user) => {
      if (user.id === userId) {
        newUser = { ...user, name, rule, age };
        return newUser;
      }
      return user;
    });
    res.status(200).json(newUser);
  }
  res.status(400).json({ error: 'bad request' });
});

/**
 * req has:
 *  params: like id => /user/update/:id
 *  query: like limit =? /users/all?limit=100
 *  body: the data that end user sent
 *  headers: some information about request, also used in authorisation token
 */

app.delete('/user/delete/:id', (req, res) => {
  console.log('you are deleting user');
  const userId = Number(req.params.id);
  if (!fakeData.some((user) => user.id === userId)) {
    res.status(404).json({ error: 'User not found' });
  }
  /**
   * this filter is like (map, forEach, some ...) and they are called higher order functions,
   * this will filter the date depends on the condetion,
   * if returns true it will keep it in the array,
   * if returns false it will remove it from it.
   */
  fakeData.filter((user) => user.id !== userId);
  res.status(200).json({ message: 'deleted successfully for ' + userId });
});

// 'deleted successfully for ' + userId
// `deleted successfully for ${userId}`

/**
 * arrow finction and regular function syntax
 *
 * function sum(x, y) {
 *  return x + y
 * }
 *
 * const sum = (x, y) => x + y
 * Or
 * const sum = (x, y) => {
 *    return x + y
 * }
 */

/**
 * variable declaration keywords
 *  - var: ES5 it has some issues, prefere not to use it
 *  - let: ES6 to declare new block scoop variable
 *  - const: ES6 to declare new constant variable
 */
