const PostComment = require('../models/postComment');

module.exports = {
  createNewPostComment: async (userId, postId, content) => {
    try {
      const addRes = await PostComment.insertMany([{ userId, postId, content }]);

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

  createPostCommentReply: async (postCommentId, userId, userEmail, content, isAdmin) => {
    try {
      const updateRes = await PostComment.updateOne(
        { _id: postCommentId },
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

  updatePostCommentContent: async (postCommentId, content) => {
    try {
      const updateRes = await PostComment.findOneAndUpdate(
        { _id: postCommentId },
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

  updateChildrenContent: async (postCommentId, childrenId, content) => {
    try {
      const updateRes = await PostComment.updateOne(
        { _id: postCommentId, 'replies._id': childrenId },
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

  deleteChildrenPostComment: async (postCommentId, childrenId) => {
    try {
      const updateRes = await PostComment.updateOne(
        { _id: postCommentId },
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

  getAllPostComment: async (limit, offset, postId, status) => {
    try {
      const query = [
        {
          $match: {
            isDelete: false,
            $expr: {
              $eq: [{ $toString: '$postId' }, postId],
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
          replies: 1,
          status: 1,
          isDelete: 1,
          createdAt: 1,
          updatedAt: 1,
          userName: '$user.name',
          userEmail: '$user.email',
        },
      });

      const getPostComment = await PostComment.aggregate(query);

      if (getPostComment) {
        const totalCommtent = await PostComment.aggregate(cloneQuery);
        return {
          success: true,
          payload: {
            postComment: getPostComment,
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

  deletePostComment: async (postCommentId) => {
    try {
      const deleteProductReview = await PostComment.findOneAndUpdate(
        { _id: postCommentId },
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

  updatePostCommentStatus: async (postCommentId, status) => {
    try {
      const updateRes = await PostComment.findOneAndUpdate(
        { _id: postCommentId },
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
