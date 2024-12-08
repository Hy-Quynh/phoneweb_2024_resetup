const bcrypt = require('bcryptjs');
const SALT_ROUND = 10;
const User = require('../models/user');

module.exports = {
  userSignUp: async (email, phone, password) => {
    try {
      const checkExist = await User.findOne({
        email,
        isDelete: false,
      })
        .lean()
        .exec();

      if (!checkExist?._id) {
        const hashPassword = bcrypt.hashSync(password, SALT_ROUND);
        const insertAccount = await User.insertMany([
          {
            phone,
            email,
            password: hashPassword,
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

  userLogin: async (email, password) => {
    try {
      const checkExist = await User.findOne({
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
          return {
            success: true,
            payload: {
              _id: checkExist?._id,
              email: checkExist?.email,
              name: checkExist?.name,
              phone: checkExist?.phone,
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

  getAllUser: async () => {
    try {
      const userRes = await User.find({ isDelete: false }).lean().exec();

      return {
        success: true,
        payload: {
          user: userRes,
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

  getUserById: async (userId) => {
    try {
      const userRes = await User.findOne({ _id: userId }).lean().exec();

      return {
        success: true,
        payload: userRes,
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

  updateUserInfo: async (userId, name, email, phone, address) => {
    try {
      const checkExist = await User.findOne({
        email,
        isDelete: false,
      })
        .lean()
        .exec();

      if (
        checkExist?._id &&
        userId?.toString() !== checkExist?._id?.toString()
      ) {
        throw new Error('Email đã tồn tại');
      }

      const updateRes = await User.findOneAndUpdate(
        { _id: userId },
        {
          name,
          email,
          phone,
          address,
        }
      );
      if (updateRes) {
        return {
          success: true,
        };
      } else {
        throw new Error('Không thể cập nhật thông tin người dùng');
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

  deleteUserId: async (userId) => {
    try {
      const deleteProductReview = await User.findOneAndUpdate(
        { _id: userId },
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
  updateUserStatus: async (userId, status) => {
    try {
      const updateRes = await User.findOneAndUpdate(
        { _id: userId },
        {
          status,
        }
      );
      if (updateRes) {
        return {
          success: true,
        };
      } else {
        throw new Error('Không thể cập nhật thông tin người dùng');
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
