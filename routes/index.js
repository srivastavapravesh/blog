const express = require('express');
const router = express.Router();
const verifyLogin = require('./../middlewares/verifyLogin');

router.use('/api/auth', require('./auth'));
router.use('/api/users',verifyLogin, require('./user'));
router.use('/api/posts',verifyLogin, require('./post'));
router.use('/api/comments',verifyLogin,require('./comment'));


module.exports = router;