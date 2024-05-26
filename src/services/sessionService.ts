import { session } from "../atoms/context"
import {  post } from "../util/http"
const api = '/brand-session'
export const bookService = {
  api,
  session: async(_params:any) => {
    _params.session = session
    return await post({api:`${api}/log`, options:{ data:{...(_params ? _params : {})}}})
  }
}

