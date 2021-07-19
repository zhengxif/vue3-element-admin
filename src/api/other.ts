import request from '@/api/config/request'
import { ApiResponse } from './type'

export const getAvatarImg = (url: string): Promise<ApiResponse> => {
    return request.get(url, {
        responseType: 'arraybuffer'
    })
}
