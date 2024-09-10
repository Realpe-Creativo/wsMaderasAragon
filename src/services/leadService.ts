import { get, post } from "../util/http"
const api = '/lead'
export const leadService = {
  api,
  list: async(_params:any) => {
    return await get({api, options:{ params:{...(_params ? _params : {})}}})
  },
  get: async({_id}:{_id:string}) =>{
    return await get({api: `${api}/get/${_id}`})
  },
  upsert: async(_params:any) => {
    return await post({api:`${api}/upsert`, options:{ data:{ ...(_params ? _params : {})}}})
  },
  external: async(_params:any) => {
    return await post({api:`${api}/external`, options:{ data:{ ...(_params ? _params : {})}}})
  },
  ghost: async(_params?:any) => {
    return await post({api: `${api}/ghost`, options:{data :{ ...(_params ? _params : {})}}})
  },
  getAdviserInfo: async(_params?:{user?:string, contact:string, campaign?:string}) => {
    return await post({api: `${api}/adviser-info`, options:{data :{ ...(_params ? _params : {})}}})
  },
}

