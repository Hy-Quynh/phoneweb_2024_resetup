const bcrypt = require('bcryptjs');
const SALT_ROUND = 10;
const Admin = require('../models/admin');
const Role = require('../models/role');

module.exports = {
  adminSignUp: async (name, email, password, roleId) => {
    try {
      const checkExist = await Admin.findOne({
        email,
        isDelete: false,
      })
        .lean()
        .exec();

      if (!checkExist?._id) {
        const hashPassword = bcrypt.hashSync(password, SALT_ROUND);
        const insertAccount = await Admin.insertMany([
          {
            name,
            email,
            password: hashPassword,
            roleId,
          },
        ]);

        if (insertAccount?.[0]?._id) {
          return {
            success: true,
          };
        }
      } else {
        throw new Error('Email đã tồn tại');
      }
    } catch (err) {
      return {
        success: false,
        error: {
          message: err.message,
        },
      };
    }
  },

  adminLogin: async (email, password) => {
    try {
      const checkExist = await Admin.findOne({
        email,
        isDelete: false,
      })
        .lean()
        .exec();

      if (checkExist?._id) {
        if (!checkExist?.status) {
          throw new Error('Tài khoản bị vô hiệu hoá');
        }

        if (bcrypt.compareSync(password, checkExist?.password)) {
          const roleRes = await Role.findOne({ _id: checkExist?.roleId })
            .lean()
            .exec();
          return {
            success: true,
            payload: {
              isMainAdmin: checkExist?.mainAdmin ? true : false,
              roleList: roleRes?.listRoles,
              _id: checkExist?._id,
              name: checkExist?.name,
              email: checkExist?.email,
              isAdmin: true
            },
          };
        } else {
          throw new Error('Sai mật khẩu');
        }
      } else {
        throw new Error('Thông tin đăng nhập không chính xác');
      }
    } catch (err) {
      return {
        success: false,
        error: {
          message: err.message,
        },
      };
    }
  },

  getAllAdmin: async () => {
    try {
      const adminRes = await Admin.find({ isDelete: false }).lean().exec();

      return {
        success: true,
        payload: {
          admin: adminRes,
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

  getAdminById: async (adminId) => {
    try {
      const adminRes = await Admin.findOne({ _id: adminId }).lean().exec();

      return {
        success: true,
        payload: adminRes,
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

  updateAdminInfo: async (adminId, name, email, roleId) => {
    try {
      const checkExist = await Admin.findOne({
        email,
        isDelete: false,
      })
        .lean()
        .exec();

      if (
        checkExist?._id &&
        adminId?.toString() !== checkExist?._id?.toString()
      ) {
        throw new Error('Email đã tồn tại');
      }

      const updateRes = await Admin.findOneAndUpdate(
        { _id: adminId },
        {
          name,
          email,
          roleId,
        }
      );
      if (updateRes) {
        return {
          success: true,
        };
      } else {
        throw new Error('Không thể cập nhật thông tin quản trị viên');
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

  deleteAdminId: async (adminId) => {
    try {
      const deleteProductReview = await Admin.findOneAndUpdate(
        { _id: adminId },
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
  updateAdminStatus: async (adminId, status) => {
    try {
      const updateRes = await Admin.findOneAndUpdate(
        { _id: adminId },
        {
          status,
        }
      );
      if (updateRes) {
        return {
          success: true,
        };
      } else {
        throw new Error('Không thể cập nhật thông tin quản trị viên');
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
