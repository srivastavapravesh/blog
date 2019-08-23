const express = require('express');
const router =  express.Router();

const PostController = require('./../controllers/post.controller.js');

router.get('/', PostController.getlist);
router.post('/', PostController.postlist);
router.put('/', PostController.updatelist);
router.delete('/', PostController.deletelist);
module.exports = router;