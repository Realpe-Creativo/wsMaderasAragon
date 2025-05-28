import { ReactNode, useEffect } from 'react'
import Navbar from './components/PublicNavbar'
import Footer from './components/PublicFooter'
import { token } from '../atoms/context'
import socket from '../util/socket'

import './PublicLayout.scss'
import { ImWhatsapp } from 'react-icons/im'


export interface PublicLayoutProps {
  tab:string,
  children: ReactNode
}

export default function  (props: PublicLayoutProps) {
  props
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
    <div className='relative bg-stone-200 w-full overflow-x-hidden'>
      <Navbar tab={props?.tab}/>
      {props.children}
      <>
        <a target='_blank' className='flex bg-green-500 animate-pulse hover:animate-none transition-all text-white text-2xl p-3 rounded-full fixed bottom-4 right-4 z-50' href='https://wa.me/573125085185'>
          <ImWhatsapp className='flex' />
        </a>
      </>
      {props.tab !== 'know' && (
        <Footer tab={props.tab}/>
      )}
    </div>
  )
}