const asyncHandler = require('express-async-handler');
const postCommentMiddleware = require('../middlewares/postComment');

module.exports = {
  getAllPostComment: asyncHandler(async (req, res) => {
    const { limit, offset, postId, status } = req.query;
    const results = await postCommentMiddleware.getAllPostComment(
      limit,
      offset,
      postId,
      status
    );
    res.json(results);
  }),

  addNewPostComment: asyncHandler(async (req, res) => {
    const { userId, postId, content } = req.body;
    const results = await postCommentMiddleware.createNewPostComment(
      userId,
      postId,
      content
    );
    res.json(results);
  }),

  addPostCommentReply: asyncHandler(async (req, res) => {
    const { postCommentId } = req.params;
    const { userId, userEmail, content, isAdmin } = req.body;
    const results = await postCommentMiddleware.createPostCommentReply(
      postCommentId,
      userId,
      userEmail,
      content,
      isAdmin
    );
    res.json(results);
  }),

  updatePostCommentContent: asyncHandler(async (req, res) => {
    const { postCommentId } = req.params;
    const { content } = req.body;
    const results = await postCommentMiddleware.updatePostCommentContent(
      postCommentId,
      content
    );
    res.json(results);
  }),

  updateChildrenContent: asyncHandler(async (req, res) => {
    const { postCommentId, childrenId } = req.params;
    const { content } = req.body;
    const results = await postCommentMiddleware.updateChildrenContent(
      postCommentId,
      childrenId,
      content
    );
    res.json(results);
  }),

  deleteChildrenContent: asyncHandler(async (req, res) => {
    const { postCommentId, childrenId } = req.params;
    const results = await postCommentMiddleware.deleteChildrenPostComment(
      postCommentId,
      childrenId
    );
    res.json(results);
  }),

  deletePostComment: asyncHandler(async (req, res) => {
    const { postCommentId } = req.params;
    const results = await postCommentMiddleware.deletePostComment(
      postCommentId
    );
    res.json(results);
  }),

  updatePostCommentStatus: asyncHandler(async (req, res) => {
    const { postCommentId } = req.params;
    const { status } = req.body;
    const results = await postCommentMiddleware.updatePostCommentStatus(
      postCommentId,
      status
    );
    res.json(results);
  }),
};
