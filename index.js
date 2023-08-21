import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import './db/config.js/';
import 'dotenv/config';

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
})