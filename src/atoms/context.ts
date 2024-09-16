
import { persistentAtom } from '@nanostores/persistent'
import { atom } from 'nanostores'
import shortid from 'shortid'
import { brandService } from '../services/brandService'
import moment from 'moment'

const token = persistentAtom('token',null, {
  encode: JSON.stringify,
  decode: JSON.parse,
}) 

const user = persistentAtom('user',null, {
  encode: JSON.stringify,
  decode: JSON.parse,
}) 

const brand = persistentAtom('brand',null, {
  encode: JSON.stringify,
  decode: JSON.parse,
}) 

if(brand.get() === null || !brand.get()._recover || moment.utc(brand.get()._recover ).isBefore(moment.utc().add(-5, 'days'))){
  (async()=>{
    const response = await brandService.get({domain:'maderasaragon.com'})
    if(response.brand){
      brand.set({...response.brand, _recover: moment.utc().toISOString()})
    }
  })()
}

const car = persistentAtom('car',{open: false, items:[]}, {
  encode: JSON.stringify,
  decode: JSON.parse,
}) 


const session = persistentAtom('session',shortid.generate(), {
  encode: JSON.stringify,
  decode: JSON.parse,
}) 


const access = persistentAtom('access',null, {
  encode: JSON.stringify,
  decode: JSON.parse,
}) 


const can = (what:string) =>{
  return access?.get()?.can?.includes('all') || access?.get()?.can?.includes(what) 
}

const loading = atom(false) 


export { token, user, loading,access,session ,can, brand, car }  