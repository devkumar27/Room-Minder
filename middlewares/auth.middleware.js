import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../db/models/user.model.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            next();
        }
        catch(err) {
            res.status(401);
            throw new Error("Invalid auth token."); 
        }
    }

    if(!token) {
        res.status(401);
        throw new Error("Token not found");
    }

});

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    }
    else {
        throw new Error("Access Denied!");
    }
};

export { protect, isAdmin };