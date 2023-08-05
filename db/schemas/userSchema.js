import mongoose from "mongoose";
import { Schema } from "mongoose";

// We have two types of users- Students, who are staying in the hostel, and the hostel authority, who take care of the hostel room maintenance

// This is the student schema
const studentSchema = new Schema({
    email: String,
    password: String,
    reg_no: String,
    firstName: String, 
    lastName: String,
    roomNo: String,
    noOfBeds: Number,
});

// This is the Hostel Authority Schema
const hostelAuthoritySchema = new Schema({
    email: String,
    password: String,
    emp_id: String,
    firstName: String, 
    lastName: String
});

// Making mongoose model
const Student = mongoose.model('Student', studentSchema);
const HostelAuthority = mongoose.model('HostelAuthority', hostelAuthoritySchema);

// Exporting our model for use in our application
module.exports = Student;
module.exports = HostelAuthority;