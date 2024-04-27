import { useStore } from "@nanostores/react"
import {  LuBook, LuFileSpreadsheet, LuGhost, LuHelpingHand, LuHexagon, LuHome } from "react-icons/lu"
import { loading } from "../../atoms/context"

interface props{
  tab:String
}

export default function  (props:props) {
  const $loading = useStore(loading)
  return (
    <>
    <div className={`${$loading ? 'animate-pulse' : ''} sub-icon text-green-300`}>
      {
        props.tab === 'home'?
        <LuHome size="200px" />
        : null
      }
      {
        props.tab === 'books:books'?
        <LuBook size="200px" />
        : null
      }
      {
        props.tab === 'books:sheets'?
        <LuFileSpreadsheet size="200px" />
        : null
      }
      {
        props.tab === 'books:employees'?
        <LuHelpingHand size="200px" />
        : null
      }
      {
        props.tab === 'auth'?
        <LuGhost size="200px" />
        : null
      }
      {
        props.tab === 'index'?
        <LuHexagon size="200px" />
        : null
      }
    </div>
    
    </>
  )
}