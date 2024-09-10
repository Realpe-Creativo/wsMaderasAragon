// backdrop-blur-xl backdrop-blur-md sr-only transition-transform translate-y-full mb-4 inline-flex items-center text-base font-semibold text-gray-500

export interface CarProps {
}

import { Drawer } from "flowbite-react";

import { LuMinus, LuPlus, LuShoppingBag, LuTrash } from "react-icons/lu";
import { car } from "../../atoms/context"
import { useStore } from "@nanostores/react";
import { Link } from "react-router-dom";



export default function  (props?: CarProps) {
  props
  const $car = useStore(car)

  const handleClose = () =>  car.set({...car.get(), open: !$car.open})

  const handleAdd = (product_id:string, quantity:number) => {
    const aux = $car.items || []
    const exists = aux.findIndex((_i:any) => _i.product?._id === product_id)
    if(exists !== -1){
      aux[exists].quantity += quantity
      car.set({...car.get(), items: aux})
    }
  }
  
  const handleSet = (product_id:string, quantity:number) => {
    const aux = $car.items || []
    const exists = aux.findIndex((_i:any) => _i.product?._id === product_id)
    if(exists !== -1){
      aux[exists].quantity = quantity
      if(aux[exists].quantity ){
        car.set({...car.get(), items: aux})
      }
    } 
  }
  const handleDelete = (product_id:string) => {
    let aux = $car.items || []
    const exists = aux.findIndex((_i:any) => _i.product?._id === product_id)
    if(exists !== -1){
      aux = aux.filter((_i:any) => _i.product?._id !== product_id)
      car.set({...car.get(), items: aux})
    } 
  }

  return (
    <>
      <Drawer open={$car.open} backdrop onClose={handleClose} position="bottom" theme={{root: {backdrop: 'fixed inset-0  bg-slate-100/75 backdrop-blur-sm'}}}   className="shadow-lg bg-slate-50 dark:bg-slate-50">
        <Drawer.Header title="Carrito" titleIcon={LuShoppingBag} />
        <Drawer.Items>
          <div className="flex justify-center">
            <div className="flex w-3/6 content-center p-3 gap-4 flex-wrap">
              {
                $car?.items?.map((_i:any)=>{
                  const _variations: any[] = []
                  _i.product?.variations?.forEach((_v:any)=>{
                    _variations[_v._id] = _v
                  })
                  _i._variations = _variations
                  return(
                  <div className="flex items-center flex-row w-full">
                    <div style={{backgroundImage: `url(${_i.product?.avatar || '/default.png'})`}} className="flex items-center justify-center group min-h-20 min-w-20 bg-center bg-cover rounded-2xl drop-shadow hover:shadow-md">
                      <div onClick={()=>handleDelete(_i.product._id)} className="hidden group-hover:flex p-2 rounded-xl hover:cursor-pointer bg-amber-200">
                        <LuTrash></LuTrash>
                      </div>
                    </div>
                    <div className="flex flex-col content-center h-fit  w-full px-6 py-3">
                      <span className="flex font-semibold">{_i.product?.name}</span>
                      <div className="flex w-20 items-center">
                        <div onClick={() => _i.quantity !== 1 ? handleAdd(_i.product?._id, -1) : 0} className={` ${_i.quantity === 1 ? 'cursor-not-allowed' : 'cursor-pointer'} flex w-1/4 h-fit `}>
                          <LuMinus></LuMinus>
                        </div>
                        <div className="flex justify-center w-2/4">
                          <input onChange={(e) => handleSet(_i.product?._id, parseInt(e.target.value))} type="number" value={_i.quantity || 1}  className="w-8 flex text-center clean-number-input"/>
                        </div>
                        <div onClick={() => handleAdd(_i.product?._id, 1)} className="flex w-1/4 h-fit cursor-pointer">
                          <LuPlus></LuPlus>
                        </div>
                      </div>
                      <div className="flex">
                        {
                          _i?.variations?.filter((_v:any)=>{return _i?._variations?.[_v]?.type === 'size'}).map((_v:any)=>{return (
                            <div className="flex" key={_v}>
                              <div className="flex group/variation relative bg-amber-200 text-amber-800 text-sm font-medium me-2 px-3.5 py-1.5 rounded">
                                <span>{_i._variations[_v].value}</span>
                              </div>
                            </div>
                          )}) 
                        }
                        {
                          _i?.variations?.filter((_v:any)=>{return _i?._variations?.[_v]?.type === 'color'}).map((_v:any)=>{return (
                            <div className="flex" key={_v}>
                              <div style={{backgroundColor: _i._variations[_v].value }} className={`flex group/variation relative text-white text-sm font-medium me-2 px-3.5 py-1.5 rounded`}>
                                <span>{_i._variations[_v].value}</span>
                              </div>
                            </div>
                          )}) 
                        }
                        {
                          _i?.variations?.filter((_v:any)=>{return _i?._variations?.[_v]?.type === 'material'}).map((_v:any)=>{return (
                            <div className="flex" key={_v}>
                              <div className="flex group/variation relative bg-amber-200 text-amber-800 text-sm font-medium me-2 px-3.5 py-1.5 rounded">
                                <span>{_i._variations[_v].value}</span>
                              </div>
                            </div>
                          )}) 
                        }
                      </div>
                    </div>
                  </div>
                )})

              }
              {
                $car.items.length === 0 ?
                  <div className="flex w-full justify-center">
                    <span className="flex text-stone-500 text-xl font-semibold">No hay productos en el carrito</span>
                  </div>
                : null
              }
            </div>
            <div className="flex w-1/6 content-center p-3 gap-4 flex-wrap">
              <Link onClick={()=>car.set({...$car, open: false})} to="/checkout" className="flex px-3 py-1 bg-amber-800 text-white rounded-2xl">Revisar carrito</Link>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
      
    </>
  )
}