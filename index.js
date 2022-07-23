import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import usersRouter from './src/routes/users.js'; // import user router from its file

const app = express(); // install it (npm i cors) then use it as middleware to allow you make requests from anyware

app.use(express.json()); // it has to be bofore all routes
app.use(cors());

app.use('/users', usersRouter); // we wrote users here and remove it from router paths

app.use('/', (req, res) => {
  res.json('welcome to server');
}); // it should be the last end point

const CONNECTION_URL = process.env.DB_URL || 'mongodb+srv://SHOMANS:ffs1TAgYeh7hu9l0@cluster0.wmrug.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log('server running on port', PORT)))
  .catch((err) => console.log(err));
