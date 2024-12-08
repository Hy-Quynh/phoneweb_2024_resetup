import axiosConfig from '../axiosConfig';

const URL = '/comment';

export const commentAPI = {
  getAllComment: async (limit: number, offset: number, productId: string, status?: boolean) => {
    const response = await axiosConfig.get(
      `${URL}?limit=${limit}&offset=${offset}&productId=${productId}&status=${status}`
    );
    return response;
  },

  addNewComment: async (data: {
    userId: string;
    productId: string;
    content: string;
    star: number;
  }) => {
    const response = await axiosConfig.post(`${URL}`, { ...data });
    return response;
  },

  addCommentChildren: async (
    commentId: string,
    data: {
      userId: string;
      userEmail?: string;
      content: string;
      isAdmin?: boolean;
    }
  ) => {
    const response = await axiosConfig.post(`${URL}/${commentId}/reply`, {
      ...data,
    });
    return response;
  },

  updateComment: async (commentId: string, content: string) => {
    const response = await axiosConfig.put(`${URL}/${commentId}`, {
      content,
    });
    return response;
  },

  updateCommentChildren: async (
    commentId: string,
    childrenId: string,
    content: string
  ) => {
    const response = await axiosConfig.put(`${URL}/${commentId}/reply/${childrenId}`, {
      content,
    });
    return response;
  },

  deleteComment: async (commentId: string) => {
    const response = await axiosConfig.delete(`${URL}/${commentId}`);
    return response;
  },

  deleteCommentChildren: async (commentId: string, childrenId: string) => {
    const response = await axiosConfig.delete(`${URL}/${commentId}/reply/${childrenId}`);
    return response;
  },

  updateCommentStatus: async (commentId: string, status: boolean) => {
    const response = await axiosConfig.patch(`${URL}/${commentId}/status`, {
      status,
    });
    return response;
  },
};
