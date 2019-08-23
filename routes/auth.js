const express = require('express');
const router = express.Router();

const AuthController = require('./../controllers/auth.controller.js');

router.post('/signUp', AuthController.signUp);
router.post('/signIn', AuthController.signIn);
//router.post('/resetPassword',AuthController.resetPassword);

module.exports = router;