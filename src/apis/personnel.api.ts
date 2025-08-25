import type { Personnel } from "@/types";
import { axiosInstance } from "@/utils";

export const personnelApi = {
  getList: async (
    page: number = 1,
    limit: number = 10
  ): Promise<Personnel[]> => {
    const res = await axiosInstance.get("/staff", {
      params: {
        _page: page,
        _limit: limit,
      },
    });
    return res.data;
  },
  getById: async (id: number): Promise<Personnel> => {
    const res = await axiosInstance.get(`/staff/${id}`);
    return res.data;
  },
  create: async (data: Personnel): Promise<Personnel> => {
    const res = await axiosInstance.post("/staff", data);
    return res.data;
  },
  update: async (id: string, data: Personnel): Promise<Personnel> => {
    const res = await axiosInstance.put(`/staff/${id}`, data);
    return res.data;
  },
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/staff/${id}`);
  },
};
