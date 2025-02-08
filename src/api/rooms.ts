import { ApiResponse, QueryParams } from "@/types"
import request from "@/utils/axiosClient"

export const RoomsApi = {
    getAll: async (params?: QueryParams) : Promise<ApiResponse> => {
        return await request("/assistants/rooms", {params})
    }
}