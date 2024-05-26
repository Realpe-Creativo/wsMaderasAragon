
import { persistentAtom } from '@nanostores/persistent'
import { atom } from 'nanostores'
import shortid from 'shortid'

const token = persistentAtom('token',null, {
  encode: JSON.stringify,
  decode: JSON.parse,
}) 

const user = persistentAtom('user',null, {
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


export { token, user, loading,access,session ,can }