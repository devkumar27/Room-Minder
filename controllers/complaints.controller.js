import asyncHandler from 'express-async-handler';
import Complaint from '../db/models/complaint.model.js';
import decodeToken from '../utils/decodeToken.js';
import User from '../db/models/user.model.js';
import 'dotenv/config';
import Complaints from '../db/models/complaint.model.js';


// @desc        File a new complaint
// @route       POST /api/complaints/
// @access      Public
const raiseComplaint = asyncHandler(async (req, res) => {
    try {
        const { complaintType, description } = req.body;
        const bearerHeader = req.headers.authorization; 
        const token = bearerHeader.split(' ')[1];
        const decoded = decodeToken(token);
        const filedBy = decoded.id;

        if(complaintType && description) {
            const newComplaint = new Complaint({
                complaintType,
                filedBy,
                regDate: new Date(),
                description
            });
            const filedComplaint = await newComplaint.save();

            if(filedComplaint) {
                res.status(201).json({
                    filedComplaint,
                    success: true,
                    message: "Complaint filed successfully!"
                });
            }
            else {
                res.status(401).json({
                    success: false,
                    message: 'An error occurred while filing the complaint. Please try again.'
                });
            }
        } 
        else {
            res.status(400).json({
                success: false,
                message: 'Both, "Complaint Type" and "Description" are required!'
            });
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
    
});

// @desc        Fetch all complaints
// @route       GET /api/complaints/all
// @access      Private/Admin
const allComplaints = asyncHandler(async (req, res) => {
    try {
        const complaints = await Complaint.find({ });
        res.status(200).json(complaints);
    } catch(err) {
        res.status(400);
        console.log('Error retrieving data. Please try again later.')
    }
});

// @desc        Fetch history of complaints for the logged in user
// @route       GET /api/complaints/history
// @access      Public
const complaintHistory = asyncHandler(async (req, res) => {
    try {
        const bearerHeader = req.headers.authorization; 
        const token = bearerHeader.split(' ')[1];
        const decoded = decodeToken(token);
        const filedBy = decoded.id;

        const complaints = await Complaints.find({ filedBy });

        if(complaints.length !== 0) {
            res.status(200).json({
                success: true,
                message: "Complaints fetched successfully!",
                complaints
            })
        }
        else {
            res.status(204).json({
                success: true,
                message: 'No complaints found.'
            });
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            message: "Could not fetch complaints, please try again later"
        })
    }
});

export {
    raiseComplaint,
    allComplaints,
    complaintHistory
};