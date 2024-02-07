import express from 'express';
import cors from 'cors';
import './db/config.js/';
import 'dotenv/config';

import userRoutes from './routes/user.route.js';
import complaintRoutes from './routes/complaints.route.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors(({ credentials: true, origin: 'http://localhost:3000' })));
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/complaints', complaintRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
})