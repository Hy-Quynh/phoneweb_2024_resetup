import axiosConfig from '../axiosConfig';

const URL = '/post-comment';

export const postCommentAPI = {
  getAllPostComment: async (limit: number, offset: number, postId: string, status?: boolean) => {
    const response = await axiosConfig.get(
      `${URL}?limit=${limit}&offset=${offset}&postId=${postId}&status=${status}`
    );
    return response;
  },

  addNewPostComment: async (data: {
    userId: string;
    postId: string;
    content: string;
  }) => {
    const response = await axiosConfig.post(`${URL}`, { ...data });
    return response;
  },

  addPostCommentChildren: async (
    postCommentId: string,
    data: {
      userId: string;
      userEmail?: string;
      content: string;
      isAdmin?: boolean;
    }
  ) => {
    const response = await axiosConfig.post(`${URL}/${postCommentId}/reply`, {
      ...data,
    });
    return response;
  },

  updatePostComment: async (postCommentId: string, content: string) => {
    const response = await axiosConfig.put(`${URL}/${postCommentId}`, {
      content,
    });
    return response;
  },

  updatePostCommentChildren: async (
    postCommentId: string,
    childrenId: string,
    content: string
  ) => {
    const response = await axiosConfig.put(`${URL}/${postCommentId}/reply/${childrenId}`, {
      content,
    });
    return response;
  },

  deletePostComment: async (postCommentId: string) => {
    const response = await axiosConfig.delete(`${URL}/${postCommentId}`);
    return response;
  },

  deletePostCommentChildren: async (postCommentId: string, childrenId: string) => {
    const response = await axiosConfig.delete(`${URL}/${postCommentId}/reply/${childrenId}`);
    return response;
  },

  updatePostCommentStatus: async (postCommentId: string, status: boolean) => {
    const response = await axiosConfig.patch(`${URL}/${postCommentId}/status`, {
      status,
    });
    return response;
  },
};
