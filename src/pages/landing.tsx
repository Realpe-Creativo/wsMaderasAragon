import { LuBadgeCheck, LuMessageCircle, LuNewspaper, LuShoppingBag } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useOs, useWindowScroll } from "@mantine/hooks";
import YoutubeModal from "@/components/ui/YoutubeModal";
import TestimonialSlider from "@/components/ui/TestimonialSlider"
import InstagramReelsSlider from "@/components/ui/InstagramReelsSlider";
import GuaranteeStats from "@/components/ui/GuaranteeStats";
export interface LoadingProps {
}

export default function (props?: LoadingProps) {
  const [scroll, scrollTo] = useWindowScroll()
  scroll
  const os = useOs();
  props

  const items = [
    {
      title: "IMPACTO CLIMATICO POSITIVO",
      subtitle: "Reforestación, captura de carbono y manejo de agua",
      image: "/img/forest.jpg",
    },
    {
      title: "Amamos la tierra",
      subtitle: "Cuidamos el suelo, la biodiversidad y la comunidad",
      image: "/img/land.jpg",
    },
    {
      title: "Impacto social real",
      subtitle: "Generamos empleo digno en zonas rurales",
      image: "/img/wood.jpg",
    },
    {
      title: "Artesanos de la madera",
      subtitle: "Nuestro equipo transforma la madera con conocimiento y respeto",
      image: "/img/climate.jpg",
    },
  ];
  return (
    <>
      {/* <div className="flex w-[100vw] h-[100vh] flex-col justify-center items-center">
        <LuConstruction className="text-zinc-600 flex text-[5rem] w-fit" />
      <div className="flex justify-center items-center">
        <span className="text-zinc-600 text-[2rem] md:text-[4rem] text-center">
          <br />
          <br />
            El proyecto está en construcción
          </span>
      </div>

    </div> */}
      <div className="relative" id="init">
        <video
          src="https://satorie.s3.amazonaws.com/maderasaragon.com-banner.mp4"
          muted
          autoPlay={!os.toLowerCase().includes('ios') || !os.toLowerCase().includes('android')}
          loop
          className="absolute hero-video z-0 w-full h-full object-cover"
        ></video>

        <div className="w-screen h-[98vh] md:h-screen flex justify-center items-center z-10 p-6 relative">

        </div>
      </div>

      <div className="-mt-4">
        <div className="bg-stone-950 z-50 flex text-white text-3xl flex-row mt-3 justify-center p-3">
          <Link to={"/products"} onClick={() => setTimeout(() => scrollTo({ y: 0 }), 300)} className="flex w-3/12 flex-col justify-center align-middle items-center p-4">
            <LuShoppingBag className="flex text-stone-400 text-[2.5rem] md:text-[4.5rem]" />
            <span className="flex text-sm md:text-2xl">Productos</span>
          </Link>
          <Link to={"/know"} onClick={() => setTimeout(() => scrollTo({ y: 0 }), 300)} className="flex w-3/12 flex-col justify-center align-middle items-center p-4">
            <LuBadgeCheck className="flex text-stone-400 text-[2.5rem] md:text-[4.5rem]" />
            <span className="flex text-sm md:text-2xl">Nosotros</span>
          </Link>
          <Link to={"/news"} onClick={() => setTimeout(() => scrollTo({ y: 0 }), 300)} className="flex w-3/12 flex-col justify-center align-middle items-center p-4">
            <LuNewspaper className="flex text-stone-400 text-[2.5rem] md:text-[4.5rem]" />
            <span className="flex text-sm md:text-2xl">Bitácora</span>
          </Link>
          <Link to={"/contact"} onClick={() => setTimeout(() => scrollTo({ y: 0 }), 300)} className="flex w-3/12 flex-col justify-center align-middle items-center p-4">
            <LuMessageCircle className="flex text-stone-400 text-[2.5rem] md:text-[4.5rem]" />
            <span className="flex text-sm md:text-2xl">Contactanos</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative group overflow-hidden h-[500px] cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4 text-white">
              <h3 className="font-bold text-lg md:text-xl">{item.title}</h3>
              <p className="text-sm md:text-base">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full bg-black py-10 flex justify-center items-center">
        <p className="text-white text-center text-lg md:text-3xl font-extrabold">
          EN MADERAS ARAGON TRABAJAMOS CON LA TIERRA Y NO CONTRA ELLA
        </p>
      </div>
      <div className="relative z-10 mt-4 flex justify-center">
        <YoutubeModal videoId="y8UWOLDCO3g" /> {/* Cambia este ID por el de tu video */}
      </div>
      {/* Sección de testimonios - Agregada aquí */}
      <div className="bg-stone-100 py-1 px-1">
        <div className="max-w-7xl mx-auto">
          <TestimonialSlider />
        </div>
      </div>
      <div className="bg-stone-100 py-1 px-1">
        <div className="max-w-6xl mx-auto">
          <InstagramReelsSlider />
        </div>
      </div>
      <div className="bg-stone-100 py-1 px-1">
        <div className="max-w-6xl mx-auto">
          <GuaranteeStats />
        </div>
      </div>

      {/* <div className="flex relative">
        <BackgroundLines >
          <div className="flex justify-center items-center h-full w-full">
            <div className="flex flex-col md:w-1/2 text-center justify-center">
              <h1 className="text-white text-[2.6rem] font-title-bold">
                Mitigamos el &nbsp;
                <Highlight className="text-white">
                  cambio climático
                </Highlight>
              </h1>
              <p className="text-white text-[1rem] p-3">
                Nos abastecemos únicamente de bosques comerciales registrados ante el ICA, garantizando sostenibilidad y trazabilidad. Como empresa comprometida con mitigar el cambio climático, nuestras plantaciones absorben CO2 y aplicamos prácticas forestales sostenibles, minimizando nuestro impacto ambiental.
              </p>

            </div>

          </div>
        </BackgroundLines>
      </div> */}
    </>
  )
}