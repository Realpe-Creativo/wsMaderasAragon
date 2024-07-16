
import { get } from "../util/http"
const api = '/brand'
export const brandService = {
  get: async({domain}:{domain:string}) =>{
    return await get({api: `${api}/get-brand`,options:{params:{domain}}})
  },
}