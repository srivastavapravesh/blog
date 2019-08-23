module.exports = async function(req, res, next) {
    if (!req.currentUser || req.currentUser === null) {
        return res.status(401).json({ success: false, message: 'Invalid Permission' });
    }
    next();
};