require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: "Invalid Header"
        });
    }

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        } else {
            res.status(401).json({
                error: "Invalid User"
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(401).json({
            error: "Unknown error"
        });
    }
};

module.exports = {
    authMiddleware
};