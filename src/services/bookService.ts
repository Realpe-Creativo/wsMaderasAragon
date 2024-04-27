import { get, post } from "../util/http"
const api = '/books-book'
export const bookService = {
  api,
  list: async(_params:any) => {
    return await get({api, options:{ params:{...(_params ? _params : {})}}})
  },
  listTransactions: async(_params:any) => {
    return await get({api:`${api}/list-transactions`, options:{ params:{...(_params ? _params : {})}}})
  },
  upsertTransaction: async(_params:any) => {
    return await post({api:`${api}/upsert-transaction`, options:{ data:{...(_params ? _params : {})}}})
  },
  deleteTransaction: async(_params:any) => {
    return await post({api:`${api}/delete-transaction`, options:{ data:{...(_params ? _params : {})}}})
  },
  get: async({_id}:{_id:string}) =>{
    return await get({api: `${api}/get/${_id}`})
  }
}

