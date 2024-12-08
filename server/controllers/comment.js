const asyncHandler = require('express-async-handler');
const commentMiddleware = require('../middlewares/comment');

module.exports = {
  getAllComment: asyncHandler(async (req, res) => {
    const { limit, offset, productId, status } = req.query;
    const results = await commentMiddleware.getAllComment(limit, offset, productId, status);
    res.json(results);
  }),

  addNewComment: asyncHandler(async (req, res) => {
    const { userId, productId, content, star } = req.body;
    const results = await commentMiddleware.createNewComment(
      userId,
      productId,
      content,
      star
    );
    res.json(results);
  }),

  addCommentReply: asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { userId, userEmail, content, isAdmin } = req.body;
    const results = await commentMiddleware.createCommentReply(
      commentId,
      userId,
      userEmail,
      content,
      isAdmin
    );
    res.json(results);
  }),

  updateCommentContent: asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const results = await commentMiddleware.updateCommentContent(
      commentId,
      content
    );
    res.json(results);
  }),

  updateChildrenContent: asyncHandler(async (req, res) => {
    const { commentId, childrenId } = req.params;
    const { content } = req.body;
    const results = await commentMiddleware.updateChildrenContent(
      commentId,
      childrenId,
      content
    );
    res.json(results);
  }),

  deleteChildrenContent: asyncHandler(async (req, res) => {
    const { commentId, childrenId } = req.params;
    const results = await commentMiddleware.deleteChildrenComment(
      commentId,
      childrenId
    );
    res.json(results);
  }),

  deleteComment: asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const results = await commentMiddleware.deleteComment(commentId);
    res.json(results);
  }),

  updateCommentStatus: asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { status } = req.body;
    const results = await commentMiddleware.updateCommentStatus(
      commentId,
      status
    );
    res.json(results);
  }),
};
