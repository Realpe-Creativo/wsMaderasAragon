import { useWindowScroll } from "@mantine/hooks"
import { Link } from "react-router-dom"

interface props {
  tab: String
}

export default function (props: props) {
  props

  const [scroll, scrollTo] = useWindowScroll()
  scroll
  return (
    <div className="flex flex-col min-h-screen">
      {/* =============================
      Footer grande con background
      ============================= */}
      <div className="relative w-screen flex-1 bg-fixed bg-center bg-cover" style={{ backgroundImage: 'url(/footer3.jpg)' }}>
        {/* Overlay que cubre TODO */}
        <div className="absolute inset-0 backdrop-blur-sm bg-stone-950/25 flex flex-col md:flex-row justify-center items-center gap-8 px-6 py-16">
          {/* = Logo + título centrado = */}
          <div className="flex w-3/12 justify-center flex-col h-full items-center content-center align-middle">
            <img src="/logo-white.png" className="flex min-w-40 min-h-40 w-40 h-40" alt="Logo Maderas Aragon" />
            <span className="flex text-4xl text-white text-center -mt-5 font-title-bold">Maderas Aragón</span>
          </div>

          {/* = Menú de enlaces centrado = */}
          <div className="flex flex-col items-center md:items-start justify-center
                          text-white text-xl font-title-bold space-y-4
                          mt-8">
            <Link
              to="/#init"
              onClick={() => setTimeout(() => scrollTo({ y: 0 }), 300)}
              className="w-full text-center md:text-left"
            >
              Inicio
            </Link>
            <Link
              to="/know#init"
              onClick={() => setTimeout(() => scrollTo({ y: 0 }), 300)}
              className="w-full text-center md:text-left"
            >
              Conócenos
            </Link>
            <Link
              to="/contact#init"
              onClick={() => setTimeout(() => scrollTo({ y: 0 }), 300)}
              className="w-full text-center md:text-left"
            >
              Contáctanos
            </Link>
            <Link
              to="/products#init"
              onClick={() => setTimeout(() => scrollTo({ y: 0 }), 300)}
              className="w-full text-center md:text-left"
            >
              Productos
            </Link>
          </div>
        </div>
      </div>
      
      <footer className="mt-auto w-full py-4 flex justify-center backdrop-blur-md bg-[#394930]">
        <span className="text-white">2025 &copy; Maderas Aragón</span>
      </footer>
    </div>
  )
}