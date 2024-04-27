import { ReactNode, useEffect } from 'react'
import Container from './components/Container'
import Navbar from './components/Navbar'
import { token } from '../atoms/context'
import socket from '../util/socket'

import './MasterLayout.scss'


export interface MasterLayoutProps {
  tab:string,
  children: ReactNode
}

export default function  (props: MasterLayoutProps) {

  useEffect(()=>{
    setTimeout(()=>{

      token.listen((value, _value)=>{
        if(value){
          socket?.connect({force:true})
        }
      })
    },500)
  }, [])

  return(
    <div className='relative'>
      <Navbar tab={props?.tab}/>
      <Container  tab={props?.tab}/>
      <div className="content has-[section]:overflow-hidden relative  border border-solid border-green-50 has-[section]:border has-[section]:border-solid has-[section]:border-green-200 shadow-md p-3 has-[section]:shadow-green-500">
        {props.children}
      </div>
    </div>
  )
}