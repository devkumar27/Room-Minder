import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from 'bcrypt';

// We have user- Students, who are staying in the hostel, and admin- the hostel authority, who take care of maintenance of hostel rooms

// This is the user schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        uppercase: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    }, 
    lastName: {
        type: String,
        trim: true
    },
    roomNo: {
        type: String,
        required: true,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},
    {
        timestamps: true
    }
);

// Bcrypt variable definitions
const saltRounds = 10;

// Methods
userSchema.methods = {
    authenticate: async function (plainText) {
        return await bcrypt.compare(plainText, this.hashedPassword);
    }
};

// User Schema Methods
userSchema.methods = {
    matchPassword: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    }
};

// Pre-hook
userSchema.pre('save', async function (next) {
    if(!this.isModified('hashedPassword')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, salt);
});

// Making mongoose model
const User = mongoose.model('User', userSchema);

// Exporting our model for use in our application
module.exports = User;