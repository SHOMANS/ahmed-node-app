import express from 'express';
import mongoose from 'mongoose';

import usersRouter from './src/routes/users.js'; // import user router from its file

const app = express();

app.use(express.json()); // it has to be bofore all routes

app.use('/users', usersRouter); // we wrote users here and remove it from router paths

const CONNECTION_URL = 'mongodb+srv://SHOMANS:ffs1TAgYeh7hu9l0@cluster0.wmrug.mongodb.net/?retryWrites=true&w=majority';
const PORT = 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log('server running on port', PORT)))
  .catch((err) => console.log(err));
