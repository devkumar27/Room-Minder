import asyncHandler from 'express-async-handler';
import User from '../db/models/user.model.js';
import generateToken from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// @desc        Authorize user & get token
// @route       POST /api/users/login
// @access      Public
const authUser = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "Both the fields are required." });
        }

        const user = await User.findOne({ email });

        if(user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);
            // res.cookie("token", token, {
            //     withCredentials: true,
            //     httpOnly: true
            // })
            res.json({
                _id: user._id,
                email: user.email,
                userID: user.userID,
                firstName: user.firstName,
                lastName: user.lastName,
                roomNo: user.roomNo,
                message: "Logged in successfully!",
                success: true,
                token
            })
            next();
        }
        else {
            res.status(401).json({
                message: "Invalid e-mail or password.",
                success: false            
            });
        }
    } catch(err) {
        console.log(err);
    }
});

// @desc        Register a new user
// @route       POST /api/users
// @access      Public
const registerUser = asyncHandler(async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, userID, roomNo } = req.body;
        const userExists = await User.findOne({ email });

        if(userExists) {
            res.status(409).json({
                message: "User already exists!", 
                success: false
            });
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
                message: "User registered successfully.",
                success: true,
            })
            next();
        }
        else {
            res.status(400).json({
                message: "Error registering, please try again later.",
                success: false
            });
        }
    } catch(err) {
        console.log(err);
    }
});

// @desc        Log the user out
// @route       GET /api/users/logout
// @access      Public
const logoutUser = asyncHandler(async (req, res, next) => {
    try {
        res.status(200).json({
            message: "User logged out successfully!",
            success: true 
        });
    } catch(err) {
        res.status(500).json({
            message: "Internal server error. Please try again.",
            success: false
        })
    }
})

// @desc        fetch the user by JWT verification
// @route       GET /api/users/refetch
// @access      Public
const refetchUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    jwt.verify(token, process.env.SECRET_KEY, {}, async(err, data) => {
        if(err) {
            res.status(404).json({
                message: err,
                success: false
            })
        }
        res.status(200).json({
            data,
            success: true            
        });
    })
})

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
        res.status(404).json({
            message: "User not found.", 
            success: false
        });
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
    logoutUser,
    refetchUser,
    getUserProfile,
    updateProfile,
    getUsers
};
