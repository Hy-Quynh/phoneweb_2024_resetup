const express = require('express');
const router = express.Router();
const postCommentController = require('../controllers/postComment');

router.get('/', postCommentController.getAllPostComment);
router.post('/', postCommentController.addNewPostComment);
router.post('/:postCommentId/reply', postCommentController.addPostCommentReply);
router.put('/:postCommentId', postCommentController.updatePostCommentContent);
router.put('/:postCommentId/reply/:childrenId', postCommentController.updateChildrenContent);
router.delete('/:postCommentId/reply/:childrenId', postCommentController.deleteChildrenContent);
router.delete('/:postCommentId', postCommentController.deletePostComment);
router.patch('/:postCommentId/status', postCommentController.updatePostCommentStatus);

module.exports = router;
