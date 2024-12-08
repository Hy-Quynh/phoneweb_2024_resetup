const Comment = require('../models/comment');

module.exports = {
  createNewComment: async (userId, productId, content, star) => {
    try {
      const addRes = await Comment.insertMany([{ userId, productId, content, star }]);

      if (addRes) {
        return {
          success: true,
        };
      }
      throw new Error('Thêm bình luận thất bại');
    } catch (err) {
      return {
        success: false,
        error: {
          message: err.message,
        },
      };
    }
  },

  createCommentReply: async (commentId, userId, userEmail, content, isAdmin) => {
    try {
      const updateRes = await Comment.updateOne(
        { _id: commentId },
        {
          $push: {
            replies: {
              userId: userId,
              userEmail,
              content,
              timestamp: new Date(),
              isAdmin,
            },
          },
        }
      );

      if (updateRes) {
        return {
          success: true,
        };
      }
      throw new Error('Thêm bình luận thất bại');
    } catch (error) {
      return {
        success: false,
        error: {
          message: error.message,
        },
      };
    }
  },

  updateCommentContent: async (commentId, content) => {
    try {
      const updateRes = await Comment.findOneAndUpdate(
        { _id: commentId },
        {
          content,
        }
      );

      if (updateRes) {
        return {
          success: true,
        };
      } else {
        throw new Error('Không thể cập nhật nội dung bình luận');
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

  updateChildrenContent: async (commentId, childrenId, content) => {
    try {
      const updateRes = await Comment.updateOne(
        { _id: commentId, 'replies._id': childrenId },
        { $set: { 'replies.$.content': content } }
      );

      if (updateRes) {
        return {
          success: true,
        };
      } else {
        throw new Error('Không thể cập nhật nội dung bình luận');
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

  deleteChildrenComment: async (commentId, childrenId) => {
    try {
      const updateRes = await Comment.updateOne(
        { _id: commentId },
        {
          $pull: {
            replies: {
              _id: childrenId
            },
          },
        }
      );

      if (updateRes) {
        return {
          success: true,
        };
      } else {
        throw new Error('Không thể xoá nội dung bình luận');
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

  getAllComment: async (limit, offset, productId, status) => {
    try {
      const query = [
        {
          $match: {
            isDelete: false,
            $expr: {
              $eq: [{ $toString: '$productId' }, productId],
            },
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

      const cloneQuery = [...query]

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

      query.push(
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        }
      );

      query.push({
        $project: {
          _id: 1,
          userId: 1,
          content: 1,
          star: 1,
          replies: 1,
          status: 1,
          isDelete: 1,
          createdAt: 1,
          updatedAt: 1,
          userName: '$user.name',
          userEmail: '$user.email',
        },
      });

      const getComment = await Comment.aggregate(query);

      if (getComment) {
        const totalCommtent = await Comment.aggregate(cloneQuery);
        return {
          success: true,
          payload: {
            comment: getComment,
            total: totalCommtent?.length,
          },
        };
      } else {
        throw new Error('Lấy thông tin bình luận thất bại');
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

  deleteComment: async (commentId) => {
    try {
      const deleteProductReview = await Comment.findOneAndUpdate(
        { _id: commentId },
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

  updateCommentStatus: async (commentId, status) => {
    try {
      const updateRes = await Comment.findOneAndUpdate(
        { _id: commentId },
        {
          status,
        }
      );
      if (updateRes) {
        return {
          success: true,
        };
      } else {
        throw new Error('Không thể cập nhật thông tin bình luận');
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
