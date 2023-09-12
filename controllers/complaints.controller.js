import asyncHandler from 'express-async-handler';
import Complaint from '../db/models/complaint.model.js';
// import generateToken from '../utils/generateToken';
import User from '../db/models/user.model.js';
import 'dotenv/config';


// @desc        File a new complaint
// @route       POST /api/complaints/
// @access      Public
const raiseComplaint = asyncHandler(async (req, res) => {
    const { complaintType, description } = req.body;

    const currTicketNo = process.env.TICKET_NO;
    if(complaintType && description) {
        const newComplaint = new Complaint({
            ticketNo: currTicketNo,
            complaintType,
            filedBy: "64edeec9440cf56a2588dd00",
            regDate: new Date(),
            description
        });
        process.env.TICEKT_NO += 1;
        const filedComplaint = await newComplaint.save();

        if(filedComplaint) {
            res.status(201).json(filedComplaint);
        }
        else {
            res.status(401);
            throw new Error('An error occurred while filing the complaint. Please try again.');
        }
    } 
    else {
        res.status(400);
        throw new Error('Both, "Complaint Type" and "Description" are required!');
    }
});

// @desc        Fetch all complaints
// @route       GET /api/complaints/all
// @access      Private/Admin
const allComplaints = asyncHandler(async (req, res) => {
    try {
        const complaints = await Complaint.find({ });
        res.json(complaints);
    } catch(err) {
        res.status(400);
        console.log('Error retrieving data. Please try again later.')
    }
});

// @desc        Fetch history of complaints for the logged in user
// @route       GET /api/complaints/history
// @access      Public
const complaintHistory = asyncHandler(async (req, res) => {
    const { userID } = req.body;
    if(userID) {
        const userComplaintsHist = await User.find({ userID });
        res.json(userComplaintsHist.complaints);
    }
    else {
        res.status(500);
        throw new Error('CHError-Something went wrong. Please try again later.');
    }
});



export {
    raiseComplaint,
    allComplaints,
    complaintHistory
};