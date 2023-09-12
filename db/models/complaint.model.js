import mongoose from "mongoose";

// Schema design for complaints filed by hostellers
const complaintSchema = new mongoose.Schema({
    ticketNo: {
        type: Number,
        required: true,
        // unique: true 
    },
    complaintType: { // look into how you can select a value for this field fromo a few options
        type: String,
        required: true,
    },
    filedBy: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    isResolved: {
        type: Boolean,
        required: true,
        default: false
    },
    regDate: {
        type: Date,
        required: true
    },
    resolutionDate: {
        type: Date,
        default: null
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    adminRemarks: {
        type: String,
        trim: true
    }
},
{
    timestamps: true
}
);

// Making complaint model
const Complaints = mongoose.model('Complaints', complaintSchema);

// Exporting Complaints model as default for this file
export default Complaints;



// There can be TWO INTERFACES FOR COMPLAINTS- Hosteller and Hostel Administration

//[indexing(complaint number)], [type of complaint], [remarks], [room number], [who filed the complaint], [status(resolved or not)], [date of complaint reg], [date of resolution]
