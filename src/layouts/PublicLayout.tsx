



import { ReactNode, useEffect } from 'react'
import Navbar from './components/PublicNavbar'
import Footer from './components/PublicFooter'
import { token } from '../atoms/context'
import socket from '../util/socket'

import './PublicLayout.scss'


export interface PublicLayoutProps {
  tab:string,
  children: ReactNode
}

export default function  (props: PublicLayoutProps) {

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
    <>
      <Navbar tab={props?.tab}/>
      {props.children}
      <Footer tab={props?.tab}/>
    </>
  )
}