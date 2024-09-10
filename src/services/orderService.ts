import { get, post } from "../util/http"
const api = '/order'
export const orderService = {
  api,
  upsert: async(_params:any) => {
    return await post({api: `${api}/upsert`, options:{data: {..._params}}})
  },
  list: async(_params?:any) => {
    return await get({api, options:{ params:{ ...(_params ? _params : {})}}})
  },
  get: async({_id}:{_id:string}) =>{
    return await get({api: `${api}/get/${_id}`})
  },
}