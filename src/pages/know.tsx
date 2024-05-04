
export interface KnowProps {
}

export default function  (props?: KnowProps) {
  props
  return (
    <div className="relative">
      <video src="/us.mp4" muted autoPlay loop className="absolute hero-video top-0"></video>
      <div className="w-screen overflow-y-scroll scroll-smooth  mt-4 flex justify-center  h-screen bg-fixed p-6">
        
        <div className="flex-col mt-10  p-4 w-full justify-center z-10">
          
          <div className="bg-stone-900/50 mt-[12rem] mx-auto transition-all hover:bg-stone-900/75 flex p-10 justify-center w-fit h-fit rounded-xl font-title-bold  backdrop-blur-sm">
              <h1 className="text-4xl  text-white">¿Quienes somos?</h1>
          </div>
          
          <div className="my-[5rem] mx-auto  bg-stone-900/50 transition-all hover:bg-stone-900/75  flex p-10 justify-center w-fit h-fit rounded-xl  backdrop-blur-sm text-white">
            Historia de la empresa
          </div>
          
          <div className="my-10 mt-[18rem] flex-row  flex p-10 justify-center w-fit h-fit    text-white">
            <div className="flex text-[6rem] justify-center items-center w-1/3 align-middle bg-stone-900/50 mx-4 rounded-xl p-4 backdrop-blur-sm transition-all hover:bg-stone-900/75 font-title-bold ">
              Misión
            </div>
            <div className="flex  w-1/3 align-middle bg-stone-900/50 mx-4 rounded-xl p-8 backdrop-blur-sm transition-all hover:bg-stone-900/75 ">
              Nuestra misión es superar las expectativas de nuestros clientes al ofrecer productos maderables, servicios forestales y madera cilindrada y aserrada de la más alta calidad. Nos especializamos en la construcción de postes, casas, cabañas y bodegas en madera, siempre con un enfoque en la excelencia y la sostenibilidad. Nuestro compromiso va más allá de la entrega de productos, nos esforzamos por crear valor duradero y contribuir activamente a la protección del medio ambiente.
            </div>
          </div>

          <div className="my-10 mt-[16rem] mb-[18rem] flex-row  flex p-10 justify-center w-fit h-fit    text-white">
            <div className="flex  w-1/3 align-middle bg-stone-900/50 mx-4 rounded-xl p-8 backdrop-blur-sm transition-all hover:bg-stone-900/75  ">
              Nuestra visión es consolidarnos como líderes en la industria de la construcción en madera, y ser reconocidos por la calidad superior de nuestros productos y servicios forestales. Aspiramos a ser la primera opción para clientes que buscan soluciones de alta calidad, sostenibles, y respetuosas con el medio ambiente.
            </div>
            <div className="flex font-title-bold text-[6rem] justify-center items-center w-1/3 align-middle bg-stone-900/50 mx-4 rounded-xl p-4 backdrop-blur-sm transition-all hover:bg-stone-900/75 ">
              Visión
            </div>
          </div>

          <div className="my-10 mt-[16rem] mb-[18rem] flex-row  flex p-10 justify-center w-fit h-fit    text-white"></div>
          
        </div>
        
      </div>
    </div>
  )
}