const Post = require('../models/post');

module.exports = {
  getAllPost: async (limit, offset, search, status) => {
    try {
      const newSearch = search && search !== 'undefined' ? search : '';

      const query = [
        {
          $match: {
            name: { $regex: new RegExp(newSearch.toLowerCase(), 'i') },
            isDelete: false,
          },
        },
      ];

      if (status !== 'undefined') {
        query.push({
          $match: {
            status: !!status
          },
        })
      }

      if (offset === 'undefined' && limit && limit !== 'undefined') {
        query.push(
          ...[
            {
              $skip: 0,
            },
            {
              $limit: limit,
            },
          ]
        );
      }

      if (offset && limit && offset !== 'undefined' && limit !== 'undefined') {
        query.push(
          ...[
            {
              $skip: Number(offset),
            },
            {
              $limit: Number(limit),
            },
          ]
        );
      }

      query.push({
        $project: {
          _id: 1,
          name: 1,
          image: 1,
          description: 1,
          status: 1,
          isDelete: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      });

      const postRes = await Post.aggregate(query);

      const totalItem = await Post.find({
        isDelete: false,
        name: { $regex: new RegExp(newSearch.toLowerCase(), 'i') },
      })
        .lean()
        .exec();

      return {
        success: true,
        payload: {
          post: postRes,
          total: totalItem?.length,
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

  getPostById: async (postId) => {
    try {
      const postRes = await Post.findOne({ _id: postId }).lean().exec();

      return {
        success: true,
        payload: postRes,
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

  addNewPost: async (name, description, image) => {
    try {
      const addRes = await Post.insertMany([{ name, description, image }]);

      if (addRes) {
        return {
          success: true,
        };
      }
      throw new Error('Thêm bài viết thất bại');
    } catch (error) {
      return {
        success: false,
        error: {
          message: error.message,
        },
      };
    }
  },

  updatePostInfo: async (postId, name, description, image) => {
    try {
      const checkExist = await Post.findOne({
        name,
        isDelete: false,
      })
        .lean()
        .exec();

      if (
        checkExist?._id &&
        postId?.toString() !== checkExist?._id?.toString()
      ) {
        throw new Error('Tên bài viết đã tồn tại');
      }

      const updateRes = await Post.findOneAndUpdate(
        { _id: postId },
        {
          name,
          description,
          image,
        }
      );

      if (updateRes) {
        return {
          success: true,
        };
      } else {
        throw new Error('Không thể cập nhật thông tin bài viết');
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

  deletePost: async (postId) => {
    try {
      const deleteProductReview = await Post.findOneAndUpdate(
        { _id: postId },
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

  updatePostStatus: async (postId, status) => {
    try {
      const updateRes = await Post.findOneAndUpdate(
        { _id: postId },
        {
          status,
        }
      );
      if (updateRes) {
        return {
          success: true,
        };
      } else {
        throw new Error('Không thể cập nhật thông tin bài viết');
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

  getRelativePost: async (limit, offset, postId, status) => {
    try {
      const query = [
        {
          $match: {
            $expr: {
              $ne: [{ $toString: '$_id' }, postId],
            },
            isDelete: false,
          },
        },
      ];

      if (status !== 'undefined') {
        query.push({
          $match: {
            status: !!status
          },
        })
      }

      if (offset === 'undefined' && limit && limit !== 'undefined') {
        query.push(
          ...[
            {
              $skip: 0,
            },
            {
              $limit: limit,
            },
          ]
        );
      }

      if (offset && limit && offset !== 'undefined' && limit !== 'undefined') {
        query.push(
          ...[
            {
              $skip: Number(offset),
            },
            {
              $limit: Number(limit),
            },
          ]
        );
      }

      query.push({
        $project: {
          _id: 1,
          name: 1,
          image: 1,
          description: 1,
          status: 1,
          isDelete: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      });

      const postRes = await Post.aggregate(query);

      const totalItem = await Post.find({
        isDelete: false,
        $expr: {
          $ne: [{ $toString: '$_id' }, postId],
        },
      })
        .lean()
        .exec();

      return {
        success: true,
        payload: {
          post: postRes,
          total: totalItem?.length,
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
};
