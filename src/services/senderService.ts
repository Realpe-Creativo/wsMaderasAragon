import { brand } from "./../atoms/context"
import { post } from "../util/http"
const api = '/sender'
export const senderService = {
  api,
  sendSMS: async(_params?:any) => {
    return await post({api: `${api}/send-sms`, options:{ data:{brand: brand.get()?._id, ...(_params ? _params : {})}} })
  }
}