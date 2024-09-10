import { Button, Group, PinInput, Stepper } from "@mantine/core";
import { brand, car, token, user } from "../atoms/context"
import { useStore } from "@nanostores/react";
import { useState } from "react";
import {  LuCheck, LuMinus, LuPlus, LuSave, LuTrash } from "react-icons/lu";
import { senderService } from "../services/senderService";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import AuthService from "../services/authService";
import { userService } from "../services/userService";
import { orderService } from "../services/orderService";
import { useNavigate } from "react-router-dom";

export interface CheckoutProps {
}

export default function  (props?: CheckoutProps) {
  props
  const $car = useStore(car)
  const $user = useStore(user)
  const $brand = useStore(brand)
  const authService = new AuthService('/auth')
  
  const [active, setActive] = useState(0);
  const [userCode, setUserCode] = useState<any>(null);
  const [number, setNumber] = useState<string>('');
  const [sended, setSended] = useState<boolean>(false);

  const [addressModified, setAddressModified] = useState(false);


  const [address, setAddress] = useState<any>({});

  const [code, setCode] = useState<string>('');

  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleAdd = (product_id:string, quantity:number) => {
    const aux = $car.items || []
    const exists = aux.findIndex((_i:any) => _i.product?._id === product_id)
    if(exists !== -1){
      aux[exists].quantity += quantity
      car.set({...car.get(), items: aux})
    }
  }

  const handleSendSMS = async(_params?:any) => {
    const data = {
      number,
      ..._params,
      brand: $brand?._id
    }

    const response = await senderService.sendSMS(data)
    if(response.code === 200){
      setUserCode(response.user)
      setSended(true)
    }
  }

  const handleLogin = async () => {
    const response = await authService.loginCode({user: userCode._id, code, brand: $brand?._id})

    if(response.token){
      token.set(response.token)
      user.set(response.user)
      if(response.user.addresses.length){
        setAddress(response.user.addresses[response.user.addresses.length - 1])
      }
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

  const handleAddress = async() => {
    const response:any = await userService.addAddress({address, user: user.get()._id, brand: $brand?._id})
    if(response.code === 200){
      setAddressModified(false)
      setAddress(response.address)
      user.set(response.user)
    }
  }

  const handleTotal = () => {
    let total = 0

    let modified = false
    const aux = [...$car.items]
    aux.forEach((_i:any)=>{
      let _ = 0
      _i?.variations?.forEach((_v:any)=>{
        const _vvv = _i.product?.variations.find((_vv:any)=>{return _vv._id === _v})
        if(_vvv){
          _ += _vvv.increase
        }
      })
      total += _i.quantity * (_i.product?.price + _)
      if(!_i.price){
        // modified = true
        _i.price = (_i.product?.price + _)
      }
    })
    if(modified){
      car.set({...car.get(), items: aux})
    }

    return total
  }
  
  let location = useNavigate()

  const handleQuote = async() => {
    const _items = $car.items || []
    const _order = await orderService.upsert({order:{brand: $brand?._id, items: _items.map((_i:any)=>{return {..._i, product: _i.product?._id}}) , user: $user._id, address: address?._id}})
    if(_order.code === 200){
      car.set({items:[] ,open: false})
      location("/user-orders")
    }
  }

  const handleTotalProduct = (_i?:any) => {
    let _ = 0
    _i?.variations?.forEach((_v:any)=>{
      const _vvv = _i.product?.variations.find((_vv:any)=>{return _vv._id === _v})
      if(_vvv){
        _ += _vvv.increase
      }
    })
    let total = _i.quantity * (_i.product?.price + _)
    return total
  }

  const handlePriceProduct = (_i?:any) => {
    let _ = 0
    _i?.variations?.forEach((_v:any)=>{
      const _vvv = _i.product?.variations.find((_vv:any)=>{return _vv._id === _v})
      if(_vvv){
        _ += _vvv.increase
      }
    })
    let total = _i.product?.price + _
    return total
  }


  return (
    <>
      <div className="flex flex-col justify-center pt-[180px] min-h-[85vh]">
        <Stepper color="gray" className="flex m-auto mt-4 flex-col w-[60rem]" active={active} onStepClick={setActive} completedIcon={<LuCheck />}>
          <Stepper.Step className="flex" content="flex" label="Resumen" description="Resumen de compra">
            <div className="flex flex-col w-[50rem] m-auto content-center p-3 gap-4 flex-wrap">
              {
                $car?.items?.map((_i:any)=>{
                  const _variations: any[] = []
                  _i.product?.variations?.forEach((_v:any)=>{
                    _variations[_v._id] = _v
                  })
                  _i._variations = _variations
                  return(
                  <div className="flex justify-between items-center  flex-row w-full">
                    <div className="flex items-center">
                      <div style={{backgroundImage: `url(${_i.product?.avatar || '/default.png'})`}} className="flex items-center justify-center group min-h-20 min-w-20 bg-center bg-cover rounded-2xl drop-shadow hover:shadow-md">
                        <div onClick={()=>handleDelete(_i.product._id)} className="hidden group-hover:flex p-2 rounded-xl hover:cursor-pointer bg-stone-200">
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
                                <div className="flex group/variation relative bg-stone-200 text-stone-800 text-sm font-medium me-2 px-3.5 py-1.5 rounded">
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
                                <div className="flex group/variation relative bg-stone-200 text-stone-800 text-sm font-medium me-2 px-3.5 py-1.5 rounded">
                                  <span>{_i._variations[_v].value}</span>
                                </div>
                              </div>
                            )}) 
                          }
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="flex text-stone-500">
                        Precio unitario: {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(handlePriceProduct(_i) || 0)}
                      </span>
                      <span className="flex font-semibold">
                        Total: {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(handleTotalProduct(_i) || 0)}
                      </span>
                    </div>
                  </div>
                )})
              }
              <hr className="flex  mx-auto my-3 w-[50rem]" />
              <div className="flex justify-end">
                <span className="font-semibold text-2xl">Total: {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(handleTotal() || 0)}</span>
              </div>
            </div>
            <Group justify="center" mt="xl">
              <Button variant="default" onClick={prevStep}>Anterior</Button>
              <Button variant="filled" color="gray" onClick={nextStep}>Siguiente</Button>
            </Group>
          </Stepper.Step>
          <Stepper.Step className="flex" label="Datos de envio" description="Datos de envio">
            <div className="flex flex-col min-h-[25rem] p-3 justify-center">
              <div className="flex w-[50rem] mx-auto items-center h-fit  p-3 gap-4 flex-wrap">
                <PhoneInput
                  className="flex h-fit"
                  defaultCountry={"CO"}
                  countries={['CO']}
                  placeholder="Ingresa tu número"
                  value={number}
                  onChange={(e)=>{setNumber(e || '')}}
                  limitMaxLength={true}
                  disabled={!!sended && !!$user}
                />
                {
                  !$user?
                    <div className="flex h-fit">
                      <button disabled={number.length < 12} onClick={()=>handleSendSMS()}  className="flex hover mx-1 cursor-pointer disabled:bg-stone-50 disabled:text-stone-600 items-center justify-center 'text-white bg-stone-700 text-white hover:bg-stone-50 hover:text-stone-600  px-4 py2 rounded-3xl">{ sended? 'Solicitar otro': 'Enviar Código' }</button>
                    </div>

                  : null
                }
                {
                  $user ?
                    <div className="flex h-fit">
                      <button disabled={number.length < 12} onClick={()=>{setSended(false); setNumber(''); setCode(''); authService.logout()}}  className="flex hover mx-1 cursor-pointer disabled:bg-stone-50 disabled:text-stone-600 items-center justify-center 'text-white bg-stone-700 text-white hover:bg-stone-50 hover:text-stone-600  px-4 py2 rounded-3xl">No es mi número</button>
                    </div>
                  :null
                  
                }
              </div>
              {
                sended || $user && <hr className="flex  mx-auto my-3 w-[50rem]" />
              }
              <div className="flex flex-col justify-center  mx-auto w-[50rem]">
                {
                  sended && !$user?
                  <div className="flex flex-col items-center">
                    <PinInput onChange={(e)=>{setCode(e)}} className="flex mx-1 my-3" placeholder="x" />
                    <div className="flex h-fit mx-1">
                      <span onClick={()=>handleLogin()} className="flex hover mx-1 cursor-pointer items-center justify-center 'text-white bg-stone-700 text-white hover:bg-stone-50 hover:text-stone-600  px-4 py2 rounded-3xl">Validar</span>
                    </div>
                  </div>
                  : null
                }
                <div className="flex gap-3 flex-wrap justify-center">

                  {
                    $user?.addresses?.map((_a:any)=>{return (
                      <div onClick={()=>setAddress(_a)} className="flex hover:bg-stone-200 cursor-pointer my-1 px-2 py-1 rounded-2xl" key={_a._id}>
                        <span>{_a.address}</span>
                      </div>
                    )})
                  }
                </div>
                <div className="flex m-auto w-[42rem]">
                  {
                    $user ? 
                      <div className="flex relative flex-col w-full drop-shadow-md justify-center align-middle items-center  mt-3 p-4 rounded-xl bg-white">
                        {
                          addressModified && address?.address && address?.city && address?.country && address?.state ?
                            <div onClick={handleAddress} className="absolute cursor-pointer top-0 right-0 text-stone-100 bg-stone-600 px-2 py-1  rounded-tr-xl rounded-bl-xl">
                              <LuSave/>
                            </div>
                          : null
                        }
                        <div className="flex">
                          <label htmlFor="address" className="inline-flex w-[8rem]">
                            Dirección: 
                          </label>
                          <div className="mx-2 inline-flex">
                            <input id="address" onChange={(_e)=>{ setAddressModified(true) ;setAddress({...address, address: _e.target.value})}} type="text" value={address?.address} className={`inline w-[10rem] mb-3 outline-none p-1 disabled:bg-stone-50 rounded-xl`}/>
                          </div>
                          <label htmlFor="city" className="inline-flex w-[8rem]">
                            Ciudad: 
                          </label>
                          <div className="mx-2 inline-flex">
                            <input id="city" onChange={(_e)=>{ setAddressModified(true) ;setAddress({...address, city: _e.target.value})}} type="text" value={address?.city} className={`inline w-[10rem] mb-3 outline-none p-1 disabled:bg-stone-50 rounded-xl`}/>
                          </div>
                        </div>
                        <div className="flex">
                          <label htmlFor="state" className="inline-flex w-[8rem]">
                            Departamento: 
                          </label>
                          <div className="mx-2 inline-flex">
                            <input id="state" onChange={(_e)=>{ setAddressModified(true) ;setAddress({...address, state: _e.target.value})}} type="text" value={address?.state} className={`inline w-[10rem] mb-3 outline-none p-1 disabled:bg-stone-50 rounded-xl`}/>
                          </div>
                          <label htmlFor="country" className="inline-flex w-[8rem]">
                            Pais: 
                          </label>
                          <div className="mx-2 inline-flex">
                            <input id="country" onChange={(_e)=>{ setAddressModified(true) ;setAddress({...address, country: _e.target.value})}} type="text" value={address?.country} className={`inline w-[10rem] mb-3 outline-none p-1 disabled:bg-stone-50 rounded-xl`}/>
                          </div>
                        </div>

                        <div className="flex">
                          <label htmlFor="directions" className="inline-flex w-[8rem]">
                            Indicaciones: 
                          </label>
                          <div className="mx-2 inline-flex">
                            <input id="directions" onChange={(_e)=>{ setAddressModified(true) ;setAddress({...address, directions: _e.target.value})}} type="text" value={address?.directions} className={`inline w-[10rem] mb-3 outline-none p-1 disabled:bg-stone-50 rounded-xl`}/>
                          </div>
                          <label htmlFor="to" className="inline-flex w-[8rem]">
                            Entregar a: 
                          </label>
                          <div className="mx-2 inline-flex">
                            <input id="to" onChange={(_e)=>{ setAddressModified(true) ;setAddress({...address, to: _e.target.value})}} type="text" value={address?.to} className={`inline w-[10rem] mb-3 outline-none p-1 disabled:bg-stone-50 rounded-xl`}/>
                          </div>
                        </div>
                        
                        
                      </div>
                    : null
                  }
                </div>
              </div>
            </div>
            <Group justify="center" mt="xl">
              <Button variant="default" onClick={prevStep}>Anterior</Button>
              {
                $user && address?._id && <Button variant="filled" color="gray" onClick={nextStep}>Siguiente</Button>
              }
            </Group>
          </Stepper.Step>
          <Stepper.Step className="flex" label="Hacer Orden" description="Finalizar pedido">
            <div className="flex p-3 justify-center">
              {
                $brand?.zenit?.quote_only ? 
                  <div className="flex w-[50rem] flex-col mx-auto">
                    <span className="flex mb-3">De momento solo manejamos contizaciones</span>
                    <span className="flex mb-3 font-bold">¿Deseas continuar?</span>
                  </div>
                :null
              }
            </div>
            <Group justify="center" mt="xl">
              <Button variant="default" onClick={prevStep}>Anterior</Button>
              {
                $brand?.zenit?.quote_only ?
                  <Button variant="filled" color="gray" onClick={handleQuote}>Cotizar</Button>
                : null
              }
            </Group>
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </div>
    </>
  )
}