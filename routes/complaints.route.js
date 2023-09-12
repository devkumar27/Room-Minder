import express from 'express';
import {
    raiseComplaint,
    allComplaints,
    complaintHistory
} from '../controllers/complaints.controller.js';
import { protect, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/').post(raiseComplaint);
router.route('/all').get(allComplaints, protect, isAdmin);
router.route('/history').get(complaintHistory);

export default router;

/**
 * --BRAINSTORM--
 * so what routes can we have for complaints?
 * so we have two kind of users - Hosteller and Admin
 * a Hosteller need not every complaint in the database, so we will findBy(roomNo) for Hosteller
 * Whereas Admin shall see all the complaints in the database.(we can later decide in which order it will be displayed to him/her)
 * Also, Admin can also edit the status of the complaint, so may need to bind it in a PUT request.
 * NOW, lets see what routes we can have for the aforementioned conditions.
 * 1. getAllComplaints (Admin only) DONE
 * 2. getUserComplaintHistory  (for hosteller) DONE
 * 3. putEditComplaintStatus  (admin only) WILL WORK ON IT AFTERWARDS
 * 4. postUserComplaint  (user only) DONE
 * 
 * Now we will decide what controllers we need for the above routes, then we will write the routes here accordingly.
 */
