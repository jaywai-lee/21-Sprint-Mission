import { api } from "./axios";

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;

export const todoApi = {
  getItems: () => api.get(`/${TENANT_ID}/items`),
  addItem: (name: string) => api.post(`/${TENANT_ID}/items`, { name }),
  toggleItem: (id: number, isCompleted: boolean) =>
    api.patch(`/${TENANT_ID}/items/${id}`, { isCompleted }),
  deleteItem: (id: number) => api.delete(`/${TENANT_ID}/items/${id}`),
};
