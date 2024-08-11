import { LuConstruction } from "react-icons/lu"


export interface NotFoundProps {
}

export default function  (props?: NotFoundProps) {
  props

  return (
    <>
      <div className="flex w-full justify-center h-full items-center">
        <div className="flex flex-row bg-white w-10/12 md:w-5/12 rounded-xl h-[16rem] p-4 content-center items-center justify-center">
          <LuConstruction className="flex font-semibold text-xl mx-1 text-yellow-500"/>
          <span className="flex font-semibold text-xl mx-1 text-stone-800">  404 No hemos encontrado la pagina que buscas  </span>
          <LuConstruction className="flex font-semibold text-xl mx-1 text-yellow-500"/>
        </div>
      </div>
    </>
  )
}