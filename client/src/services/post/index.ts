import axiosConfig from '../axiosConfig';

const URL = '/post';

export const postAPI = {
  getAllPost: async (limit?: number, offset?: number, search?: string, status?: boolean) => {
    const response = await axiosConfig.get(`${URL}?limit=${limit}&offset=${offset}&search=${search}&status=${status}`);
    return response;
  },

  getPostById: async (postId: string) => {
    const response = await axiosConfig.get(`${URL}/${postId}`);
    return response;
  },

  getRelativePost: async (postId: string, limit?: number, offset?: number, status?: boolean) => {
    const response = await axiosConfig.get(`${URL}/${postId}/relative?limit=${limit}&offset=${offset}&status=${status}`);
    return response;
  },

  addNewPost: async (data: {name: string, image: string, description: string}) => {
    const response = await axiosConfig.post(`${URL}`, { ...data });
    return response;
  },

  deletePost: async (postId: string) => {
    const response = await axiosConfig.delete(`${URL}/${postId}`);
    return response;
  },

  updatePost: async (postId: string, data: {name: string, image: string, description: string}) => {
    const response = await axiosConfig.put(`${URL}/${postId}`, {
      ...data,
    });
    return response;
  },

  updatePostStatus: async (postId: string, status: boolean) => {
    const response = await axiosConfig.patch(`${URL}/${postId}/status`, {
      status,
    });
    return response;
  },
};
