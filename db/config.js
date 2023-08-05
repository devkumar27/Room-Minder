import mongoose  from "mongoose";
import 'dotenv/config';

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to DB Succesfully.");
}).catch((err) => {
    console.log(err.message);
})


