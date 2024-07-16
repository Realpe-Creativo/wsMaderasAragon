import { LuShoppingBag } from "react-icons/lu"
import { car } from "../../atoms/context"
import { useStore } from "@nanostores/react";

export interface AddButtonProps {
  product: any,
  quantity: number,
  size?:string,
  variations?:string[]
}

export default function  (props?: AddButtonProps) {
  props

  const $car = useStore(car)
  const handleAdd = async() => {
    let variations = props?.variations || []
    if(props?.variations?.length ){
      variations = props?.variations?.sort((a:any, b:any)=>{return a.localeCompare(b)})
    }
    const aux = $car.items || []
    if(props?.product?.variations?.length && !variations?.length){
      new Promise(() => setTimeout(()=>{
        car.set({...car.get(), open: false})
      }, 500)).then().catch()  
    } else{
      const exists = aux.findIndex((_i:any) => _i.product?._id === props?.product?._id && JSON.stringify(_i.variations) === JSON.stringify(variations))
      if(exists === -1){
        aux.push({product: props?.product, quantity: props?.quantity, variations: variations})
        car.set({...car.get(), items: aux, open: true})
      } else {
        
        new Promise(() => setTimeout(()=>{
          car.set({...car.get(), open: false})
        }, 1500)).then().catch()  
          
        aux[exists].quantity += props?.quantity
        car.set({...car.get(), items: aux, open: true})
      }
    }
  }
  return (
    <div onClick={handleAdd} className={`flex items-center rounded-xl bg-amber-400 cursor-pointer px-2 py-1 hover:shadow-md ${props?.size === 'sm' ? 'text-sm' : ''} `}>
      <span className="flex">Agregar</span>
      <span className="flex h-fit px-2"><LuShoppingBag></LuShoppingBag></span>
    </div>
  )
}