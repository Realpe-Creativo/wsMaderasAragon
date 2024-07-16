import { brand } from "../atoms/context"
import { get, post } from "../util/http"
const api = '/tag'
export const tagService = {
  api,
  list: async(_params?:any) => {
    return await get({api:api, options:{ params:{ ...(_params ? _params : {})}}})
  },
  get: async({_id}:{_id:string}) =>{
    return await get({api: `${api}/get/${_id}`})
  },
  update: async (_params?:any) =>{
    return await post({api:`${api}/update`, options: {data: {brand: brand.get()?._id, ..._params} }})
  },
  create: async (_params?:any) =>{
    return await post({api:`${api}/create`, options: {data: {brand: brand.get()?._id, ..._params} }})
  }
}