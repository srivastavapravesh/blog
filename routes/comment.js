const express = require('express');
const router =  express.Router();

const commentController = require('./../controllers/comment.controller');

router.post('/', commentController.create);
router.get('/', commentController.read);
router.put('/',commentController.update);
router.delete('/',commentController.delete);

module.exports = router;