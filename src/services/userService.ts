import { brand } from "./../atoms/context"
import { get, post } from "../util/http"
const api = '/user'
export const userService = {
  api,
  addAddress: async(_params?:any) => {
    return await post({api: `${api}/upsert-address`, options:{ data:{brand: brand.get()?._id, ...(_params ? _params : {})}} })
  }
}