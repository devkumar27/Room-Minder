import express from "express";
import {
    authUser,
    registerUser,
    getUserProfile,
    updateProfile,
    getUsers
} from '../controllers/user.controller.js';
import { protect, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(getUserProfile).put(updateProfile);