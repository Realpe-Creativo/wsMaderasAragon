import { brand } from "./../atoms/context"
import { get, post } from "../util/http"
const api = '/product'
export const productService = {
  api,
  list: async(_params?:{brand?:string}) => {
    return await get({api, options:{ params:{brand: brand.get()?._id, ...(_params ? _params : {})}} })
  },
  search: async(_params?:any) => {
    return await post({api: `${api}/search`, options:{ data:{brand: brand.get()?._id, ...(_params ? _params : {})}} })
  },
  get: async({_id}:{_id:string}) =>{
    return await get({api: `${api}/get/${_id}`})
  },
  update: async({product}:{product:any}) =>{
    return await post({api: `${api}/update/${product._id}`, options:{data: {...product}}})
  },
  create: async({product}:{product:any}) =>{
    return await post({api: `${api}/create`, options:{data: {...product}}})
  },
}