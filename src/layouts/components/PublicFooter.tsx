import Button from "../../components/Button";
import { LuCreditCard, LuFacebook, LuInstagram, LuStore } from "react-icons/lu";



interface props{
  tab:String
}

export default function  (props:props) {

  return (
    <div className="w-screen h-96 flex flex-col justify-center items-center align-middle bg-fixed" style={{backgroundImage: 'url(/footer.jpg)'}}>
      <div className="w-full h-full justify-center flex flex-row backdrop-blur-md bg-stone-950/50">
      <div className="flex p-6 text-white align-middle justify-center content-center items-center w-3/12 mx-4 text-start">
          <div className="flex flex-col text-xl font-title-bold">

            <span className="flex my-1">Politica de privacidad</span>

          </div>
        </div>
        <div className="flex w-3/12 mx-4 justify-center flex-col h-96 items-center content-center align-middle">
          <img src="/logo-white.png" className="flex w-40 h-40" alt="Logo Maderas Aragon" />
          <span className="flex text-4xl text-white -mt-5 font-title-bold">Maderas Aragón</span>
        </div>
        <div className="flex p-6 text-white align-middle justify-center content-center items-center w-3/12 mx-4 text-start">
          <div className="flex flex-col text-xl font-title-bold">

            <span className="flex my-1">Inicio</span>
            <span className="flex my-1">Conocenos</span>
            <span className="flex my-1">Contactanos</span>
            <span className="flex my-3">Productos</span>

          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-center w-screen backdrop-blur-md p-4 bg-stone-950">
        <span className="flex text-white text-center justify-center w-full">2024 &copy; Maderas Aragón</span>
      </div>
    </div>
  )
}