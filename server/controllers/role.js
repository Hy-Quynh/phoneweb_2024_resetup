const asyncHandler = require('express-async-handler');
const roleMiddleware = require('../middlewares/role');

module.exports = {
  getAllRole: asyncHandler(async (req, res) => {
    const {status} = req?.query
    const results = await roleMiddleware.getAllRole(status);
    res.json(results);
  }),

  getRoleById: asyncHandler(async (req, res) => {
    const { roleId } = req.params;
    const results = await roleMiddleware.getRoleById(roleId);
    res.json(results);
  }),

  addNewRole: asyncHandler(async (req, res) => {
    const { name, listRoles } = req.body;
    const results = await roleMiddleware.addNewRole(name, listRoles);
    res.json(results);
  }),

  deleteRole: asyncHandler(async (req, res) => {
    const { roleId } = req.params;
    const results = await roleMiddleware.deleteRole(roleId);
    res.json(results);
  }),

  updateRole: asyncHandler(async (req, res) => {
    const { roleId } = req.params;
    const { name, listRoles } = req.body;
    const results = await roleMiddleware.updateRoleInfo(
      roleId,
      name,
      listRoles
    );
    res.json(results);
  }),

  updateRoleStatus: asyncHandler(async (req, res) => {
    const { roleId } = req.params;
    const { status } = req.body;
    const results = await roleMiddleware.updateRoleStatus(roleId, status);
    res.json(results);
  }),
};
