
export interface KnowProps {
}

export default function  (props?: KnowProps) {
  props
  return (
    <div className="relative">
      <video src="/us.mp4" muted autoPlay loop className="absolute hero-video top-0"></video>
      <div className="w-screen overflow-y-scroll scroll-smooth  mt-4 flex justify-center  h-screen bg-fixed p-6">
        
        <div className="flex-col mt-10  p-4 w-full justify-center z-10 rounded-xl bg-stone-900/10 h-fit">
          
          <div className="bg-stone-900/50 mt-[12rem] mx-auto transition-all hover:bg-stone-900/75 flex p-10 justify-center w-fit h-fit rounded-xl font-title-bold  backdrop-blur-sm">
              <h1 className="text-4xl  text-white">¿Quienes somos?</h1>
          </div>
          
          <div className="my-[5rem] mx-auto  bg-stone-900/50 transition-all hover:bg-stone-900/75  flex p-10 justify-center md:w-8/12 h-fit rounded-xl  backdrop-blur-sm text-white">
            Maderas Aragón S.A.S. fue constituida en la Cámara de Comercio de Villavicencio, Meta, el 23 de septiembre de 2011 por su fundador Guillermo Aragón Montilla, quien identificó la necesidad de suministrar soluciones maderables en la región. Inicialmente, la empresa se dedicó a la venta de madera aserrada para abastecer la demanda de las carpinterías locales.<br/>
            Maderas Aragón S.A.S. contó con 4 puntos de venta en la ciudad de Villavicencio, expandiéndose posteriormente a diferentes zonas del Meta y, específicamente, en Villanueva, Casanare. En el kilómetro 19 de la vía Yopal nació la iniciativa de tener su propia planta de producción, por lo que se inició la construcción de una bodega de más de 2.800 m2 en un terreno propio de 9 hectáreas, donde actualmente continúan operando como su punto clave y centro fundamental.<br/>
            Hoy en día, tienen presencia en el Meta y Casanare, con distribución y experiencia a lo largo y ancho de todo el país, brindando a sus clientes la mejor alternativa para proyectos de construcción, proyectos ganaderos, turísticos o ambientación de espacios. Continuarán creciendo siempre y cuando sus clientes se lo permitan, y de la mano de Dios.
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