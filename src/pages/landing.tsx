import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "../components/Reveal";
import React from "react";
import Button from "../components/Button";
import { LuArrowRightCircle, LuBadgeCheck, LuMessageCircle, LuNewspaper, LuStar } from "react-icons/lu";

export interface LoadingProps {
}

export default function  (props?: LoadingProps) {
  const [hovered, setHovered] = React.useState(false);
  props
  return (
    <>
      <div className="w-screen  mt-4 flex justify-center items-center align-middle h-screen bg-fixed p-6" style={{backgroundImage: 'url(/banner.jpg)'}}>
        <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="h-[40rem] group flex flex-col overflow-hidden justify-start   gap-4 mx-auto px-8 relative text-start w-9/12 pt-80 rounded-3xl border  border-stone-900/25 hover:border-stone-950/60 hover:shadow-md bg-stone-900/25 backdrop-blur-sm"
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
          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
          <br /><br />
          <span className="text-[6.5rem] leading-10 z-50 flex font-title-bold text-white">Productos</span>
          <br />
          <p className="flex w-8/12  z-50  text-white font-normal text-2xl">Elige sostenibilidad con nuestra madera reforestada. Calidad y consciencia en cada producto</p>
          <Button bg="green" className="hidden group-hover:flex z-50 text-4xl absolute bottom-8 right-8">
            <LuArrowRightCircle />
          </Button>

        </div>
        
      </div>
      <div className="bg-stone-950 flex text-white text-3xl flex-row justify-center p-3">
        <div className="flex w-3/12 flex-col justify-center align-middle items-center p-4">
          <LuNewspaper className="flex text-stone-400 text-[4.5rem]" />
          <span className="flex">Noticias</span>
        </div>
        <div className="flex w-3/12 flex-col justify-center align-middle items-center p-4">
          <LuMessageCircle className="flex text-stone-400 text-[4.5rem]" />
          <span className="flex">Contactanos</span>

        </div>
        <div className="flex w-3/12 flex-col justify-center align-middle items-center p-4">
          <LuBadgeCheck className="flex text-stone-400 text-[4.5rem]" />
          <span className="flex">Conocenos</span>

        </div>
      </div>
    </>
  )
}