import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from 'bcrypt';

// We have two types of users- Hostellers, who are residing in the hostel, and admin- the hostel authority, who take care of maintenance of hostel rooms

// This is the user schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
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
    complaints: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Complaints'
        }
    ],
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},
{
    methods: {
        async matchPassword(plainText) {
            return await bcrypt.compare(plainText, this.password);
        }
    }
},
    {
        timestamps: true
    }
);

// Bcrypt variable definitions
const saltRounds = 10;

// Methods
userSchema.methods.authenticate = {
    async function (plainText) {
        return await bcrypt.compare(plainText, this.password);
    }
};

// // User Schema Methods
// userSchema.methods = {
//     matchPassword: function(plainText) {
//         return bcrypt.encryptPassword(plainText) === this.password;
//     }
// };

// Pre-hook
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
});

// Making mongoose model
const User = mongoose.model('User', userSchema);

// Exporting our model for use in our application
export default User;