const express = require('express');
const router = express.Router();

const UserController = require('./../controllers/user.controller.js');

router.get('/getList', UserController.getList);

module.exports = router;