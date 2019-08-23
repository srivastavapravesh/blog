const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const jwt = require('jsonwebtoken');
const config = require('./../configs/');

module.exports = async function(req, res, next) {
    const token = req.headers.authorization;
    if (token && token !== null) {
        const verifyToken = jwt.verify(token, config.security.privateKey);
        if (!verifyToken) {
            return res.status(401).json({ success: false, message: 'Invalid Token' });
        }
        const decodedToken = jwt.decode(token);
        
        const userInfo = await mongoose.connection.collection('users').findOne({_id: ObjectId(decodedToken._id)});
       
        if (userInfo && userInfo !== null) {
            req.currentUser = userInfo;
        }
    }
    next();
};