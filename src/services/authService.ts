import { post } from "../util/http"
const API = '/auth'

export default class AuthService {
  private api:string

  constructor (api:string) {
    this.api = api
  }

  public async login ({username, password}: {username:string,password:string}, app?: any)  {
    
    const response = await post({api:`${this.api || API}/login`, options: {data: {username, password, app} }})
    return response
  }
  public async loginCode ({user, code, brand}: {user:string,code:string,brand:string}, app: any = 'maketo')  {
    const response = await post({api:`${this.api || API}/login-code`, options: {data: {user, code, brand, app} }})
    return response
  }

  public async logout ()  {
  }
}