const express =  require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.get('/', postController.getAllPost);
router.get('/:postId', postController.getPostById);
router.get('/:postId/relative', postController.getRelativePost);
router.post('/', postController.addNewPost);
router.delete('/:postId', postController.deletePost);
router.put('/:postId', postController.updatePost)
router.patch('/:postId/status', postController.updatePostStatus)

module.exports = router;