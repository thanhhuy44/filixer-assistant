import { ApiResponse, QueryParams } from "@/types";
import request from "@/utils/axiosClient";

type SendMessageBody = {
  room?: string;
  content: string;
};

export const RoomsApi = {
  getAll: async (params?: QueryParams): Promise<ApiResponse> => {
    return await request("/assistants/rooms", { params });
  },
  getOne: async (id: string, params?: QueryParams): Promise<ApiResponse> => {
    return await request("/assistants/rooms/" + id, { params });
  },
  getMessages: async (
    room: string,
    params?: QueryParams
  ): Promise<ApiResponse> => {
    return await request(`/assistants/rooms/${room}/messages`, { params });
  },
  sendMessage: async (
    body: SendMessageBody,
    params?: QueryParams
  ): Promise<ApiResponse> => {
    return await request.post("/assistants", body, { params });
  },
};
