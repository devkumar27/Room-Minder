import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import './db/config.js/';
import 'dotenv/config';

import userRoutes from './routes/user.route.js';
import complaintRoutes from './routes/complaints.route.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/complaints', complaintRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
})