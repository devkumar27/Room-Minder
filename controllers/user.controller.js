import asyncHandler from 'express-async-handler';
import User from '../db/models/user.model.js';
import generateToken from '../utils/generateToken.js';

// @desc        Authorize user & get token
// @route       POST /api/users/login
// @access      Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            email: user.email,
            userID: user.userID,
            firstName: user.firstName,
            lastName: user.lastName,
            roomNo: user.roomNo,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(401);
        throw new Error("Invalid E-mail or Password.");
    }
});

// @desc        Register a new user
// @route       POST /api/users
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
    const { userID, firstName, lastName, email, password, roomNo } = req.body;
    // if(!email.includes('vitbhopal.ac.in')) {
    //     res.status(400);
    //     throw new Error("Please enter your university e-mail address.");
    // }
    const userExists = await User.findOne({ email });

    if(userExists) {
        res.status(400);
        throw new Error("User already exists.");
    }

    const user = await User.create({
        userID,
        email,
        password,
        firstName, 
        lastName,
        roomNo
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            userID: user.userID,
            firstName: user.firstName,
            lastName: user.lastName,
            roomNo: user.roomNo,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400);
        throw new Error("Error creating new user, please try again later.");
    }
});

// @desc        Get user profile
// @route       GET /api/users/profile
// @access      Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body._id);//changed function parameter from req.user._id to req.body._id

    if(user) {
        res.json({
            _id: user._id,
            email: user.email,
            userID: user.userID,
            firstName: user.firstName,
            lastName: user.lastName,
            roomNo: user.roomNo,
            isAdmin: user.isAdmin,
        })
    }
    else {
        res.status(404);
        throw new Error("User not found.");
    }
})

// @desc        Update user profile
// @route       PUT /api/users/profile
// @access      Private/Admin
const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body._id);//changed function parameter from req.user._id to req.body._id

    if(user) {
        email = req.body.email || user.email;
        firstName = req.body.firstName || user.firstName;
        lastName = req.body.lastName || user.lastName;
        roomNo = req.body.roomNo || user.roomNo;
        isAdmin = req.body.isAdmin || user.isAdmin;

        if(req.body.password) {
            user.password = req.body.password;
        }

        const updateUser = await user.save();
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            firstName: updateUser.firstName,
            lastName: updateUser.lastName,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id)
        });
    }
    else {
        res.status(404);
        throw new Error("User not found.");
    }
})

// @desc        Get all users
// @route       GET /api/users
// @access      Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
})

export {
    authUser,
    registerUser,
    getUserProfile,
    updateProfile,
    getUsers
};
