const Role = require('../models/role');

module.exports = {
  getAllRole: async (status) => {
    try {
      const query = {isDelete: false}
      if (status !== 'undefined') {
        query.status = status
      }

      const roleRes = await Role.find(query).lean().exec();

      return {
        success: true,
        payload: {
          role: roleRes,
        },
      };
    } catch (err) {
      return {
        success: false,
        error: {
          message: err.message,
        },
      };
    }
  },

  getRoleById: async (roleId) => {
    try {
      const roleRes = await Role.findOne({ _id: roleId }).lean().exec();

      return {
        success: true,
        payload: roleRes,
      };
    } catch (err) {
      return {
        success: false,
        error: {
          message: err.message,
        },
      };
    }
  },

  addNewRole: async (name, listRoles) => {
    try {
      const addRes = await Role.insertMany([{ name, listRoles }]);

      if (addRes) {
        return {
          success: true,
        };
      }
      throw new Error('Thêm quyền thất bại');
      
    } catch (error) {
      return {
        success: false,
        error: {
          message: error.message,
        },
      };
    }
  },

  updateRoleInfo: async (roleId, name, listRoles) => {
    try {
      const checkExist = await Role.findOne({
        name,
        isDelete: false,
      })
        .lean()
        .exec();

      if (
        checkExist?._id &&
        roleId?.toString() !== checkExist?._id?.toString()
      ) {
        throw new Error('Tên quyền đã tồn tại');
      }

      const updateRes = await Role.findOneAndUpdate(
        { _id: roleId },
        {
          name,
          listRoles,
        }
      );

      if (updateRes) {
        return {
          success: true,
        };
      } else {
        throw new Error('Không thể cập nhật thông tin quyền');
      }
    } catch (error) {
      return {
        success: false,
        error: {
          message: error.message,
        },
      };
    }
  },

  deleteRole: async (roleId) => {
    try {
      const deleteProductReview = await Role.findOneAndUpdate(
        { _id: roleId },
        {
          isDelete: true,
        }
      );

      if (deleteProductReview) {
        return {
          success: true,
        };
      }
      throw new Error('Kiểm tra các thông tin ràng buộc khác của người dùng');
    } catch (error) {
      return {
        success: false,
        error: {
          message: error.message,
        },
      };
    }
  },

  updateRoleStatus: async (roleId, status) => {
    try {
      const updateRes = await Role.findOneAndUpdate(
        { _id: roleId },
        {
          status,
        }
      );
      if (updateRes) {
        return {
          success: true,
        };
      } else {
        throw new Error('Không thể cập nhật thông tin quyền');
      }
    } catch (error) {
      return {
        success: false,
        error: {
          message: error.message,
        },
      };
    }
  },
};
