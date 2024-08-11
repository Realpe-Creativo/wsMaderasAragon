import { Link } from "react-router-dom"

interface props{
  tab:String
}

export default function  (props:props) {
  props
  return (
    <div className="w-screen h-42rem] flex flex-col justify-center items-center align-middle bg-fixed bg-center bg-cover" style={{backgroundImage: 'url(/footer.png)'}}>
      <div className="w-full h-[40rem] justify-center flex flex-col content-center items-center md:flex-row backdrop-blur-sm bg-stone-950/25">
      <div className="flex p-6 text-white align-middle justify-center content-center items-center w-3/12 mx-4 text-start">
          <div className="flex flex-col text-xl font-title-bold">
            <Link className="flex" to="/legal#init">
              <span className="flex my-1">Politica de privacidad</span>
            </Link>
          </div>
        </div>
        <div className="flex w-3/12 mx-4 justify-center flex-col h-full items-center content-center align-middle">
          <img src="/logo-white.png" className="flex min-w-40 min-h-40 w-40 h-40" alt="Logo Maderas Aragon" />
          <span className="flex text-4xl text-white text-center -mt-5 font-title-bold">Maderas Aragón</span>
        </div>
        <div className="flex p-6 text-white align-middle justify-center content-center items-center w-3/12 mx-4 text-start">
          <div className="flex flex-col text-xl font-title-bold">

            <Link to={'/'} className="flex my-1">Inicio</Link>
            <Link to={'/know'} className="flex my-1">Conocenos</Link>
            <Link to={'/contact'} className="flex my-1">Contactanos</Link>
            <Link to={'/products'} className="flex my-3">Productos</Link>

          </div>
        </div>
      </div>
      <div className="h-fit flex flex-col justify-center w-screen backdrop-blur-md p-4 bg-stone-950">
        <span className="flex text-white text-center justify-center w-full">2024 &copy; Maderas Aragón</span>
      </div>
    </div>
  )
}