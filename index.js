import express from 'express';
import cors from 'cors';
import mongoose  from "mongoose";
// import './db/config.js/';
import 'dotenv/config';

import userRoutes from './routes/user.route.js';
import complaintRoutes from './routes/complaints.route.js';
import cookieParser from 'cookie-parser';

const app = express();

mongoose.connect(process.env.DB_URI).then(() => {
    console.log("Connected to DB Succesfully.");
}).catch((err) => {
    console.log(err.message);
})

app.use(cors(({ credentials: true, origin: 'https://roomminder.onrender.com' })));
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/complaints', complaintRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
})