const express = require('express');
const router =  express.Router();

const resetpasswordController = require('./../controllers/resetpassword.controller.js');

router.post('/', resetpasswordController.resetPassword);

module.exports = router;