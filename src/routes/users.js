import express from 'express';

import { createNewUser, deleteUser, getAllUsers, getSingleUser, updateUser } from '../contollers/users.js';

const router = express.Router(); // constructor for sub module in express

router.get('/all', getAllUsers);
router.get('/:id', getSingleUser);
router.post('/create', createNewUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;
