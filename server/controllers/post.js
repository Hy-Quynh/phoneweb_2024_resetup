const asyncHandler = require('express-async-handler');
const postMiddleware = require('../middlewares/post');

module.exports = {
  getAllPost: asyncHandler(async (req, res) => {
    const { limit, offset, search, status } = req.query;
    const results = await postMiddleware.getAllPost(limit, offset, search, status);
    res.json(results);
  }),

  getRelativePost: asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { limit, offset, status } = req.query;
    const results = await postMiddleware.getRelativePost(limit, offset, postId, status);
    res.json(results);
  }),

  getPostById: asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const results = await postMiddleware.getPostById(postId);
    res.json(results);
  }),

  addNewPost: asyncHandler(async (req, res) => {
    const { name, description, image } = req.body;
    const results = await postMiddleware.addNewPost(name, description, image);
    res.json(results);
  }),

  deletePost: asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const results = await postMiddleware.deletePost(postId);
    res.json(results);
  }),

  updatePost: asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { name, description, image } = req.body;
    const results = await postMiddleware.updatePostInfo(
      postId,
      name,
      description,
      image
    );
    res.json(results);
  }),

  updatePostStatus: asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { status } = req.body;
    const results = await postMiddleware.updatePostStatus(postId, status);
    res.json(results);
  }),
};
