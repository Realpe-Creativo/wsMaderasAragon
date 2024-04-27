import axios, { AxiosError } from "axios"
import { config } from "../config/config"
import { token } from "../atoms/context"
const URL = `${config.api}/api`

export const get = async(_params:{api:string, options?:any}) =>{
  try{
    if(!_params.options){
      _params.options = {}
    }
    
    if(token.get()){
      _params.options.headers ={
        'Authorization': token.get()
      }
    }
    
    const response = await axios.get(`${URL}${_params.api}`, _params.options)
    const data = response.data
    return data
  } catch (error ) {
    if(error instanceof AxiosError){
      if(error?.response?.data){
        if(error?.response?.status === 401 && false){
          token.set(null)
        }
        return error.response.data
      } 
    } else {
      console.log('error', error)
    }
  }
}

export const post = async(_params:{api:string, options?:{data?:any, config?:any}}) =>{
  try{
    
    const _data = _params?.options?.data || {}
    const _config = _params?.options?.config || {}
    
    
    if(token.get()){
      _config.headers ={
        'Authorization': token.get()
      }
    }
    
    const response = await axios.post(`${URL}${_params.api}`, _data, _config )
    const data = response.data
    return data
  } catch (error ) {
    if(error instanceof AxiosError){
      if(error?.response?.data){
        if(error?.response?.status === 401 && false){
          token.set(null)
        }
        return error.response.data
      } 
    } else {
      console.log('error', error)
    }
  }
}