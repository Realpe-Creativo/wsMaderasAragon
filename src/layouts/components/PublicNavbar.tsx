import Button from "../../components/Button";
import {  LuFacebook, LuInstagram, LuShoppingBag } from "react-icons/lu";
import { Link } from "react-router-dom"
import { car } from "../../atoms/context";
import { useStore } from "@nanostores/react";


interface props{
  tab:String
}

export default function  (props:props) {
  const $car = useStore(car)
  return (
    <>
      <div className="flex z-50 flex-col fixed top-0 w-full">
        <div className="flex w-full bg-stone-900 p-2 backdrop-blur-sm" >

          <div className="flex flex-row w-full">
            <div className="flex w-1/2 justify-start ps-6 text-white align-middle content-center items-center">
              <span className="flex h-fit">
                <a href="https://instagram.com/maderasAragón" className="mx-1 hover:text-purple-500 transition-all" target="_blank">
                  <LuInstagram size={20}/>
                </a>
                <a href="https://instagram.com/maderasAragón" className="mx-1 hover:text-blue-500 transition-all" target="_blank">
                  <LuFacebook size={20}/>
                </a>
              </span>
            </div>
            <div className="flex w-1/2 text-sm justify-end pe-6">
              {
                window.location.href.includes("products") ? 
                  <Button onClick={() => car.set({...car.get(), open: !$car.open})}  bg="green" className="min-w-24 mx-1">Carrito <LuShoppingBag className="ms-2"/></Button>
                : null
              }
              {/* <Button bg="blue" className="min-w-24 mx-1">Pagos <LuCreditCard className="ms-2"/></Button> */}
            </div>

          </div>
        </div>
          <div className="hidden md:flex bg-stone-900/65  flex-row">
            <div className="flex w-3/12 ms-16">
              <Link to="/" className="flex w-full  items-center align-middle">
                <img src="/logo-white.png" className="w-14 mx-2 flex" alt="Logo Maderas Aragón" />
                <span className="text-2xl font-title-bold text-white leading-5">Maderas Aragón</span>
              </Link>
            </div>
            <div className="flex w-6/12 p-2 justify-center">
              <Button bg={`${'stone'}`} bgAccent={`${props.tab === 'products' ? 950 :''}`} href="/products" className="mx-2"> Productos </Button>
              {/* <Button bg={`${'stone'}`} bgAccent={`${props.tab === 'services' ? 950 :''}`} href="/services" className="mx-2"> Servicios </Button> */}
              <Button bg={`${'stone'}`} bgAccent={`${props.tab === 'know' ? 950 :''}`} href="/know"  className="mx-2"> Conócenos </Button>
              <Button bg={`${'stone'}`} bgAccent={`${props.tab === 'contact' ? 950 :''}`} href="/contact"  className="mx-2"> Contáctanos </Button>
            </div>
            <div className="flex w-3/12 ms-12">
            </div>
          </div>
      </div>
    </>
  )
}