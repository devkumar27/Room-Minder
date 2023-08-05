import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import './db/config.js/';
import 'dotenv/config';

const app = express();



app.listen(process.env.PORT, () => {
    console.log("Listening on Port: 5000");
})