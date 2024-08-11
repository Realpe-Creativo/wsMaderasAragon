import { FormEvent, useState } from "react"
import AuthService from "../services/authService"
import { access, token, user } from "../atoms/context"
import { useNavigate } from "react-router-dom";

export interface AuthProps {
}

export default function  (props?: AuthProps) {
  props
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  let location = useNavigate();

  const authService = new AuthService('/auth')

  const handleLogin = async (e: FormEvent) => {
    
    e.preventDefault()
    const response = await authService.login({username, password}, 'maketo')
    if(response.token){
      token.set(response.token)
      user.set(response.user)
      
      if(response.home){
        access.set({
          can: response.can,
          home: response.home
        })
      }
      location(`/${response.home}`)
    } else {

    }
  }

  return (
    <div className="flex w-full h-full">
    <div className="flex w-1/2 h-full align-middle justify-center items-center">
      <form className="flex flex-col" onSubmit={(e)=>{handleLogin(e)}}>
        
        <div className="flex mb-3">
          <label className="flex flex-col font-title text-green-950 font-medium" htmlFor="username">Usuario:
            <input value={username} onChange={(e)=>{setUsername(e.target.value)}} id="username" type="text" name="username" required className="flex border border-solid border-green-100 transition-all focus:border-green-200 focus:shadow-md bg-green-100 outline-none px-2 py-1 w-56 rounded-xl" />
          </label>
        </div>
        <div className="flex mb-6">
          <label className="flex flex-col font-title text-green-950 font-medium" htmlFor="password">Contraseña:
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} id="password"  minLength={6} type="password" name="password" required className="flex border border-solid border-green-100 transition-all focus:border-green-200 focus:shadow-md bg-green-100 outline-none px-2 py-1 w-56 rounded-xl" />
          </label>
        </div>
        <div className="flex flex-col justify-center items-center content-center mb-3">
          <button data-onclick="login" className={`to-send transition-all leading-none flex font-title justify-center text-white bg-green-500 text-lg mx-2 cursor-pointer hover:bg-white w-32 content-center  px-2 pt-3 pb-2 rounded-full shadow-md hover:text-green-500`}>Conectarme</button>
        </div>
      </form>
    </div>
    <div className="flex align-middle border-l border-green-200  content-center justify-center items-center w-1/2">
      <img src="/logo.png" className="h-96 w-96 flex" alt="Logo de atorie"/>
    </div>
  </div>
  )
}