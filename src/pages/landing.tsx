import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "../components/Reveal";
import React from "react";
import { LuArrowRight, LuBadgeCheck, LuMessageCircle, LuNewspaper } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useOs } from "@mantine/hooks";
import {BackgroundLines} from "@/components/ui/background-lines";
import {  Highlight } from "@/components/ui/hero-highlight";
export interface LoadingProps {
}

export default function  (props?: LoadingProps) {
  const [hovered, setHovered] = React.useState(false);
  const os = useOs();
  props
  return (
    <>
    <div className="relative" id="init">
      <video src="https://satorie.s3.amazonaws.com/maderasaragon.com-banner.mp4" muted autoPlay={!os.toLowerCase().includes('ios') || !os.toLowerCase().includes('android') } loop className="absolute hero-video z-0"></video>
      <div className="w-[100vw] mt-4 flex justify-center items-center align-middle h-[98vh] md:h-[100vh] bg-stone-900 bg-fixed p-6">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="h-[32rem] mt-20 md:h-[40rem] group flex flex-col overflow-hidden justify-start   gap-4 mx-auto px-8 relative text-start w-full md:w-9/12 pt-80 rounded-3xl border  border-stone-900/25 hover:border-stone-950/60 hover:shadow-md bg-stone-900/25 backdrop-blur-sm"
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full w-full absolute inset-0"
              >
                <CanvasRevealEffect
                  animationSpeed={5}
                  containerClassName="bg-transparent"
                  colors={[
                    [163, 230, 53],
                    [34, 197, 94],
                  ]}
                  opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
                  dotSize={2}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
            <span className="text-[3.0rem] md:text-[6.5rem] leading-10 z-50 flex font-title-bold text-white">Productos</span>
            <br />
            <p className="flex w-10/12 md:w-8/12  z-50  text-white font-normal text-sm md:text-2xl">Elige sostenibilidad con nuestra madera reforestada. Calidad y consciencia en cada producto</p>
            <Link to={`/products`}  className="hidden  bg-green-700 rounded-full text-white 0 group-hover:flex z-50 text-4xl absolute bottom-8 right-8">
              <LuArrowRight />
            </Link>
        </div>
      </div>
    </div>
    <div className="-mt-4">
      <div className="bg-stone-950 z-50 flex text-white text-3xl flex-row mt-3 justify-center p-3">
        <Link to={"/news"} className="flex w-3/12 flex-col justify-center align-middle items-center p-4">
          <LuNewspaper className="flex text-stone-400 text-[2.5rem] md:text-[4.5rem]" />
          <span className="flex text-sm md:text-2xl">Noticias</span>
        </Link>
        <Link to={"/contact"} className="flex w-3/12 flex-col justify-center align-middle items-center p-4">
          <LuMessageCircle className="flex text-stone-400 text-[2.5rem] md:text-[4.5rem]" />
          <span className="flex text-sm md:text-2xl">Contactanos</span>
        </Link>
        <Link to={"/know"} className="flex w-3/12 flex-col justify-center align-middle items-center p-4">
          <LuBadgeCheck className="flex text-stone-400 text-[2.5rem] md:text-[4.5rem]" />
          <span className="flex text-sm md:text-2xl">Conocenos</span>
        </Link>
      </div>
      
    </div>
    <div className="flex">
      <BackgroundLines >
        <div className="flex justify-center items-center h-full w-full">
          <div className="flex flex-col md:w-1/2 text-center justify-center">
            <h1 className="text-white text-[3rem] font-title-bold">
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
    </div>
    
    
    </>
  )
}