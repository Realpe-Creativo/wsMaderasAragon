
import {  LuInfo, LuInstagram, LuMessageCircle, LuShoppingBag } from "react-icons/lu";
import { Link } from "react-router-dom"
import { car } from "../../atoms/context";
import { useStore } from "@nanostores/react";
import { useWindowScroll } from "@mantine/hooks";
import Button from "../../components/Button";


interface props{
  tab:String
}

export default function  (props:props) {
  const $car = useStore(car)
  
  const [scroll, scrollTo] = useWindowScroll()
  scroll
  return (
    <>
      <div className="flex z-50 flex-col fixed top-0 w-full">
        <div className="flex w-full bg-stone-900 p-2 backdrop-blur-sm" >

          <div className="flex flex-row w-full">
            <div className="flex w-1/2 justify-start ps-6 text-white align-middle content-center items-center">
              <span className="flex h-fit">
                <a href="https://instagram.com/maderasaragon" className="mx-1 hover:text-purple-500 transition-all" target="_blank">
                  <LuInstagram size={20}/>
                </a>
              </span>
            </div>
            <div className="flex w-1/2 min-h-8 text-sm justify-end pe-6">
              {
                window.location.href.includes("products") ? 
                  <Button onClick={() => car.set({...car.get(), open: !$car.open})}  bg="green" className="min-w-24 mx-1">Carrito <LuShoppingBag className="ms-2"/></Button>
                : null
              }
              {/* <Link bg="blue" className="min-w-24 mx-1">Pagos <LuCreditCard className="ms-2"/></Link> */}
            </div>

          </div>
        </div>
          <div className="flex bg-stone-900/65  flex-row">
            <div className="flex w-3/12 ms-16">
              <Link onClick={()=> setTimeout(()=>scrollTo({ y: 0 }),200)} to="/" className="flex w-full  items-center align-middle">
                <img src="/logo-white.png" className="w-14 mx-2 flex" alt="Logo Maderas Aragón" />
                <span className="hidden md:flex text-2xl font-title-bold text-white leading-5">Maderas Aragón</span>
              </Link>
            </div>
            <div className="flex w-6/12 p-2 justify-center">
              <Link  to="/products" className={`flex bg-stone-600 h-fit transition-all px-2 items-center align-middle rounded-3xl justify-center py-1 hover:drop-shadow-md hover:bg-stone-800 text-stone-200 hover:text-white mx-2 ${props.tab === 'products'?'bg-stone-800/75 text-white':''}`}>
                <LuShoppingBag className="flex m-1" />
                <span className="md:flex hidden">Productos</span>
                
              </Link>
              {/* <Link to="/services" className="mx-2"> Servicios </Link> */}
              <Link to="/know"  className={`flex bg-stone-600 h-fit transition-all px-2 items-center align-middle rounded-3xl justify-center py-1 hover:drop-shadow-md hover:bg-stone-800 text-stone-200 hover:text-white mx-2 ${props.tab === 'know'?'bg-stone-800/75 text-white':''}`}> 
                <LuInfo className="flex m-1" />
                <span className="md:flex hidden">Conócenos</span>
              </Link>
              <Link to="/contact"  className={`flex bg-stone-600 h-fit transition-all px-2 items-center align-middle rounded-3xl justify-center py-1 hover:drop-shadow-md hover:bg-stone-800 text-stone-200 hover:text-white mx-2 ${props.tab === 'contact'?'bg-stone-800/75 text-white':''}`}> 
                <LuMessageCircle className="flex m-1" />
                <span className="md:flex hidden">Conócenos</span>
              </Link>
            </div>
            <div className="flex w-3/12 ms-12">
            </div>
          </div>
      </div>
    </>
  )
}