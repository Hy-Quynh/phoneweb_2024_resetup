import { RoleBody } from '../../types/role';
import axiosConfig from '../axiosConfig';

const URL = '/role';

export const roleAPI = {
  getAllRole: async (status?: boolean) => {
    const response = await axiosConfig.get(`${URL}?status=${status}`);
    return response;
  },

  getRoleById: async (roleId: number) => {
    const response = await axiosConfig.get(`${URL}/${roleId}`);
    return response;
  },

  addNewRole: async (data: RoleBody) => {
    const response = await axiosConfig.post(`${URL}`, { ...data });
    return response;
  },

  deleteRole: async (roleId: string) => {
    const response = await axiosConfig.delete(`${URL}/${roleId}`);
    return response;
  },

  updateRole: async (roleId: string, data: RoleBody) => {
    const response = await axiosConfig.put(`${URL}/${roleId}`, {
      ...data,
    });
    return response;
  },

  updateRoleStatus: async (roleId: string, status: boolean) => {
    const response = await axiosConfig.patch(`${URL}/${roleId}/status`, {
      status,
    });
    return response;
  },
};
