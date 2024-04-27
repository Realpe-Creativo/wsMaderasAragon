import { useStore } from "@nanostores/react";
import { token, user, loading, access, can } from "../../atoms/context";
import {  LuBook, LuFeather, LuFileSpreadsheet, LuGhost, LuHelpingHand, LuHexagon, LuHome, LuLogOut, LuUserCircle } from "react-icons/lu";
import { Link } from "react-router-dom";

interface props{
  tab:String
}

export default function  (props:props) {

  const $token = useStore(token);
  const $user = useStore(user);
  const $loading = useStore(loading);
  const $access = useStore(access)


  const handleLogout = () => {
    user.set(null)
    token.set(null)
    window.location.replace("/books")
  }


  return (
    <>
    <div className="navbar text-plain">
      <div className="absolute left-12 items-center flex top-0">
        <img src="/logo.png" alt="logo" className="w-16 h-16 inline flex-initial"/>
        <span className="text-4xl text-green-700 pt-3 text-title font-bold flex-initial leading-none">Books</span>
      </div>
      <div className={`${$loading ? 'animate-pulse' : ''} navbar-container drop-shadow-lg bg-green-700 first:ms-0 last:me-0`}>
        {
          $token  && 
            <>
              
              <div className={`${props?.tab === 'home' ? 'drop-shadow-md bg-white text-green-600' : ''} navbar-option transition-all hover:bg-white hover:text-green-600 hover:shadow-md active:bg-white active:text-green-600`}>
                <Link to={`/${$access?.home}`} className="flex align-middle content-center items-center">
                  <span className="flex h-fit p-1"><LuHome/></span>
                  <span className="flex">Inicio</span>
                </Link>
              </div>

              {
                can('navbar:books:books') &&
                <div className={`${props?.tab === 'books:books' ? 'drop-shadow-md bg-white text-green-600' : ''} navbar-option transition-all hover:bg-white hover:text-green-600 hover:shadow-md active:bg-white active:text-green-600`}>
                  <Link to={"/books"} className="flex align-middle content-center items-center">
                    <span className="flex h-fit p-1"><LuBook /></span>
                    <span className="flex">Libros</span>
                  </Link>
                </div>
              }

              {
                can('navbar:books:sheets') &&
                <div className={`${props?.tab === 'books:sheets' ? 'drop-shadow-md bg-white text-green-600' : ''} navbar-option transition-all hover:bg-white hover:text-green-600 hover:shadow-md active:bg-white active:text-green-600`}>
                  <Link to={"/sheets"} className="flex align-middle content-center items-center">
                    <span className="flex h-fit p-1"><LuFileSpreadsheet /></span>
                    <span className="flex">Planillas</span>
                  </Link>
                </div>
              }

              {
                can('navbar:books:employees') &&
                <div className={`${props?.tab === 'books:employees' ? 'drop-shadow-md bg-white text-green-600' : ''} navbar-option transition-all hover:bg-white hover:text-green-600 hover:shadow-md active:bg-white active:text-green-600`}>
                  <Link to={"/employees"} className="flex align-middle content-center items-center">
                    <span className="flex h-fit p-1"><LuHelpingHand /></span>
                    <span className="flex">Colaboradores</span>
                  </Link>
                </div>
              }

            </>
          }
          { !$token  &&
            <>
              <div className={`${props?.tab === 'index' ? 'drop-shadow-md bg-white text-green-600' : ''} navbar-option transition-all hover:bg-white hover:text-green-600 hover:shadow-md active:bg-white active:text-green-600`}>
                <Link to={'/'} className="flex align-middle content-center items-center">
                  <span className="flex h-fit p-1"><LuHexagon/></span>
                  <span className="flex">Inicio</span>
                </Link>
              </div>
              <div className={`${props?.tab === 'auth' ? 'drop-shadow-md bg-white text-green-600' : ''} navbar-option transition-all hover:bg-white hover:text-green-600 hover:shadow-md active:bg-white active:text-green-600`}>
                <Link to={"/auth"} className="flex align-middle content-center items-center">
                  <span className="flex h-fit p-1"><LuGhost /></span>
                  <span className="flex">Login</span>

                </Link>
              </div>
            </>
        }
      </div>
      {
        $token  ?
          <div className="absolute right-12 items-center flex top">
            <div className="navbar-container drop-shadow-lg bg-green-700 first:ms-0 last:me-0">
              <div className={`${props?.tab === 'profile' ? 'drop-shadow-md bg-white text-green-600' : ''} navbar-option transition-all hover:bg-white hover:text-green-600 hover:shadow-md active:bg-white active:text-green-600`}>
                <Link to={"/profile"} className="flex align-middle content-center items-center">
                  <span className="flex h-fit p-1"><LuUserCircle /></span>
                  <span className="flex">{$user?.profile?.first_name}</span>
                </Link>
              </div>
              <div className={`navbar-option just-icon transition-all hover:bg-white hover:text-green-600 hover:shadow-md active:bg-white active:text-green-600`}>
                
                <div className="flex cursor-pointer align-middle content-center items-center">
                  <span onClick={handleLogout} className="flex h-fit p-1"><LuLogOut /></span>
                </div>
              </div>
            </div>
          </div>
        : null
      }
    </div>
    </>
  )
}