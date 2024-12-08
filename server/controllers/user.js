const asyncHandler = require('express-async-handler');
const userMiddleware = require('../middlewares/user');

module.exports = {
  userSignUp: asyncHandler(async (req, res) => {
    const { email, phone, password } = req?.body;
    const response = await userMiddleware.userSignUp(email, phone, password);
    res.json(response);
  }),

  userLogin: asyncHandler(async (req, res) => {
    const { email, password } = req?.body;
    const response = await userMiddleware.userLogin(email, password);
    res.json(response);
  }),

  getAllUser: asyncHandler(async (req, res) => {
    const response = await userMiddleware.getAllUser();
    res.json(response);
  }),

  getUserById: asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const results = await userMiddleware.getUserById(userId);
    res.json(results);
  }),

  updateUserInfo: asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { name, email, phone, address } = req.body;
    const results = await userMiddleware.updateUserInfo(
      userId,
      name,
      email,
      phone,
      address
    );
    res.json(results);
  }),

  deleteUserId: asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const results = await userMiddleware.deleteUserId(userId);
    res.json(results);
  }),

  updateUserStatus: asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { status } = req.body;
    const results = await userMiddleware.updateUserStatus(userId, status);
    res.json(results);
  }),
};
