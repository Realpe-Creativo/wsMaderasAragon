
import {  LuFacebook, LuInfo, LuInstagram, LuMessageCircle, LuShoppingBag, LuNewspaper } from "react-icons/lu";
import { Link } from "react-router-dom"
import { useWindowScroll } from "@mantine/hooks";


interface props{
  tab:String
}

export default function  (props:props) {

  const [scroll, scrollTo] = useWindowScroll()
  scroll
  return (
    <>
      <div className="flex z-50 flex-col fixed top-0 w-full">
        <div className="flex w-full bg-[#394930] p-2 backdrop-blur-sm" >

          <div className="flex flex-row w-full">
            <div className="flex w-full justify-end pe-6 text-white align-middle content-center items-center">
              <span className="flex h-fit">
                <a href="https://instagram.com/maderasaragon" className="mx-1 hover:text-purple-500 transition-all" target="_blank">
                  <LuInstagram size={20}/>
                </a>
                <a href="https://facebook.com/MaderasAragonSAS" className="mx-1 hover:text-blue-500 transition-all" target="_blank">
                  <LuFacebook size={20}/>
                </a>
              </span>
            </div>
            {/* <div className="flex w-1/2 min-h-8 text-sm justify-end pe-6">
              {
                window.location.href.includes("products") ? 
                  <Button onClick={() => car.set({...car.get(), open: !$car.open})}  bg="green" className="min-w-24 mx-1"><span className="md:flex hidden">Carrito</span> <LuShoppingBag className="ms-2"/></Button>
                : null
              }
              {
                $token && 
                <>
                  <Link to={'/orders'}>
                    <Button bg="stone" className="min-w-24 mx-1"><span className="md:flex hidden">Ordenes</span> <BsClipboardHeart className="ms-2"/></Button>
                  </Link>
                  <Button onClick={() => authService.logout()}  bg="sky" className="min-w-24 mx-1"><span className="md:flex hidden">Cerrar Sesión</span> <LuLogOut className="ms-2"/></Button>
                </>
              }
              <Link bg="blue" className="min-w-24 mx-1">Pagos <LuCreditCard className="ms-2"/></Link>
            </div> */}

          </div>
        </div>
          <div className="flex bg-[#394930]/65  flex-row">
            <div className="flex w-2/12 md:w-3/12 ms-4 md:ms-16">
              <Link onClick={()=> setTimeout(()=>scrollTo({ y: 0 }),300)} to="/" className="flex w-full  items-center align-middle">
                <img src="/logo-white.png" className="w-14 mx-2 flex" alt="Logo Maderas Aragón" />
                <span className="hidden md:flex text-2xl font-title-bold text-white leading-5">Maderas Aragón</span>
              </Link>
            </div>
            <div className="flex w-7/12 md:w-6/12 p-3 justify-center">
              <Link onClick={()=> setTimeout(()=>scrollTo({ y: 0 }),300)} to="/categories" className={`flex bg-[#394930] h-fit transition-all px-2 items-center align-middle rounded-3xl justify-center py-1 hover:drop-shadow-md hover:bg-[#BADF72] text-stone-200 hover:text-[#394930] mx-2 ${props.tab === 'products'?'bg-stone-800/75 text-white':''}`}>
                <LuShoppingBag className="flex m-1" />
                <span className="md:flex hidden">Productos</span>
              </Link>
              {/* <Link onClick={()=> setTimeout(()=>scrollTo({ y: 0 }),300)} to="/services" className="mx-2"> Servicios </Link> */}
              <Link onClick={()=> setTimeout(()=>scrollTo({ y: 0 }),300)} to="/know"  className={`flex bg-[#394930] h-fit transition-all px-2 items-center align-middle rounded-3xl justify-center py-1 hover:drop-shadow-md hover:bg-[#BADF72] text-stone-200 hover:text-[#394930] mx-2 ${props.tab === 'know'?'bg-stone-800/75 text-white':''}`}> 
                <LuInfo className="flex m-1" />
                <span className="md:flex hidden">Conócenos</span>
              </Link>
              <Link onClick={()=> setTimeout(()=>scrollTo({ y: 0 }),300)} to="/news"  className={`flex bg-[#394930] h-fit transition-all px-2 items-center align-middle rounded-3xl justify-center py-1 hover:drop-shadow-md hover:bg-[#BADF72] text-stone-200 hover:text-[#394930] mx-2 ${props.tab === 'news'?'bg-stone-800/75 text-white':''}`}> 
                <LuNewspaper className="flex m-1" />
                <span className="md:flex hidden">Bitácora</span>
              </Link>
              <Link onClick={()=> setTimeout(()=>scrollTo({ y: 0 }),300)} to="/contact"  className={`flex bg-[#394930] h-fit transition-all px-2 items-center align-middle rounded-3xl justify-center py-1 hover:drop-shadow-md hover:bg-[#BADF72] text-stone-200 hover:text-[#394930] mx-2 ${props.tab === 'contact'?'bg-stone-800/75 text-white':''}`}> 
                <LuMessageCircle className="flex m-1" />
                <span className="md:flex hidden">Contáctanos</span>
              </Link>
            </div>
            <div className="flex w-1/12 md:w-3/12 ms-12">
            </div>
          </div>
      </div>
    </>
  )
}