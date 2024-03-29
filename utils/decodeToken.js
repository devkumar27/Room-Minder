import jwt from 'jsonwebtoken';
import 'dotenv/config';

const decodeToken = (token) => {
    try {
        const objId = jwt.verify(token, process.env.JWT_SECRET);
        return objId;
    } catch(err) {
        return err.message;
    }
}

export default decodeToken;