
import { post } from "../util/http"
const api = '/maketo-order'
export const orderService = {
  api,
  upsert: async({order}: {order:any}) => {
    return await post({api: `${api}/upsert`, options:{data: {...order}}})
  },
}