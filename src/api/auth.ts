import { ApiResponse } from "@/types";
import { LoginBody } from "@/types/auth";
import request from "@/utils/axiosClient";

export const AuthApi = {
  login: async (body: LoginBody): Promise<ApiResponse> => {
    return request.post("/auth/login", body);
  },
  refreshToken: async (refreshToken: string) : Promise<ApiResponse> => {
    return request.get("/auth/refresh-token", {
      headers: {
        "x-refresh-token": refreshToken
      }
    });
  }};
