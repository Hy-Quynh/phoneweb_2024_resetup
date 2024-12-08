const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

router.get('/', commentController.getAllComment);
router.post('/', commentController.addNewComment);
router.post('/:commentId/reply', commentController.addCommentReply);
router.put('/:commentId', commentController.updateCommentContent);
router.put('/:commentId/reply/:childrenId', commentController.updateChildrenContent);
router.delete('/:commentId/reply/:childrenId', commentController.deleteChildrenContent);
router.delete('/:commentId', commentController.deleteComment);
router.patch('/:commentId/status', commentController.updateCommentStatus);

module.exports = router;
