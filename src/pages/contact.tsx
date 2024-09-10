
import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { leadService } from "../services/leadService";
export interface ContactProps {
}

import { useToast } from "@/hooks/use-toast"

export default function  (props?: ContactProps) {
  props
  const { toast } = useToast()
  const [lead, setLead] = useState<any>({})
  const handleSend = async(_params?:any) =>{
    const response = await leadService.external({...(_params || lead), brand: JSON.parse(localStorage.getItem('brand')||'{}')?._id})
    if(response.status === 200){
      toast({
        title: "Tu mensaje ha sido enviado",
        description: "Gracias por contactarnos"
      })
    }
  }

  return (
    <div className="flex flex-col mt-32 mb-20">
      <div className="flex p-4 justify-center w-full bg-stone-700 flex-row">
        <div className="flex w-fit content-center">
          <span className="text-5xl my-4 text-white font-title-bold">Contáctanos</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row p-4 justify-center">
        <div className="flex flex-col p-2 md:w-5/12">
          <img src="/contact.png" className="rounded-xl drop-shadow-lg" alt="Foto" />
        </div>
        <div className="flex flex-col p-1 md:p-4 md:w-3/12">
          <div className="flex flex-col mb-2">
            <label htmlFor="first_name">Nombres</label>
            <input id="first_name" onChange={(_e)=>{ setLead({...lead, first_name: _e.target.value})}} type="text" value={lead?.first_name} className={`flex w-[95%] mb-3 outline-none px-2 py-1 disabled:bg-stone-50 shadow-md border-[1pt] border-solid border-stone-200 bg-white rounded-lg`}/>
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="last_name">Apellidos</label>
            <input id="last_name" onChange={(_e)=>{ setLead({...lead, last_name: _e.target.value})}} type="text" value={lead?.last_name} className={`flex w-[95%] mb-3 outline-none px-2 py-1 disabled:bg-stone-50 shadow-md border-[1pt] border-solid border-stone-200 bg-white rounded-lg`}/>
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="last_name" className="mb-1">Telefono</label>
              <PhoneInput
                className="flex h-fit"
                defaultCountry={"CO"}
                countries={['CO']}
                placeholder="Ingresa tu número"
                value={lead.number}
                onChange={(e)=>{setLead({...lead, number: e || ''})}}
                limitMaxLength={true}
              />
          </div>
          <div className="flex flex-col mb-2 w-full">
            <label htmlFor="content">Mensaje</label>
            <textarea id="content" onChange={(_e)=>{ setLead({...lead, content: _e.target.value}) }} value={lead?.content} className={`flex  mb-3 outline-none px-2 py-1 disabled:bg-stone-50 shadow-md border-[1pt] border-solid border-stone-200 bg-white rounded-lg`}/>
          </div>
          <div className="flex flex-col mb-2">
            <button onClick={()=>handleSend(lead)} className="flex  justify-center bg-stone-600 hover:bg-stone-800 text-white font-semibold py-2 px-4 rounded-lg">Enviar</button>
          </div>

        </div>
      </div>
      <hr className="border-stone-200 mx-10 my-4" />
      <div className="flex flex-col md:flex-row p-4 justify-center">
        <div className="flex flex-col p-2 w-full text-start md:w-8/12">
          <span className="flex text-2xl">Sedes</span>
        </div>
      </div>
      <div className="flex flex-col my-3 md:flex-row p-4 justify-center">
        <div className="flex flex-col px-6 py-2 w-full mb-3 md:w-4/12">
          <span className="flex text-3xl font-title-bold mt-4">Villanueva</span>
          <span className="flex text-xl">Casanare - Colombia</span>
          <div className="flex mt-2 align-middle items-center">
            <span className="flex h-fit mx-2"><FaMapMarkerAlt /></span>
            <span className="flex mx-2">Km 19 via Villanueva - Monterrey</span>
          </div>
          <div className="flex mt-2 align-middle items-center">
            <span className="flex h-fit mx-2"><FaPhoneAlt /></span>
            <span className="flex mx-2">+57 312 5085185</span>
          </div>
          
        </div>
        <div className="flex w-full md:w-4/12">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.3586937365403!2d-72.94135392433216!3d4.707602041596263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e15305a3fa2fc7d%3A0x7988e05d7d764b2e!2sMaderas%20Aragon!5e0!3m2!1ses!2sco!4v1716168797813!5m2!1ses!2sco" width="100%" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-xl drop-shadow-md"></iframe>
        </div>
      </div>
      <div className="flex flex-col my-3 md:flex-row p-4 justify-center">
        <div className="hidden md:flex w-full md:w-4/12">
          <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3979.8096611371197!2d-73.50840822502444!3d4.059194395914552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNMKwMDMnMzMuMSJOIDczwrAzMCcyMS4wIlc!5e0!3m2!1ses-419!2sco!4v1723420086100!5m2!1ses-419!2sco" width="100%" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-xl drop-shadow-md"></iframe>
        </div>
        <div className="flex flex-col px-6 py-2 w-full mb-3 md:w-4/12">
          <span className="flex text-3xl font-title-bold mt-4">Villavicencio</span>
          <span className="flex text-xl">Meta - Colombia</span>
          <div className="flex mt-2 align-middle items-center">
            <span className="flex h-fit mx-2"><FaMapMarkerAlt /></span>
            <span className="flex mx-2">Km 13 via Villavicencio - Puerto Lopez</span>
          </div>
          <div className="flex mt-2 align-middle items-center">
            <span className="flex h-fit mx-2"><FaPhoneAlt /></span>
            <span className="flex mx-2">+57 312 5085185</span>
          </div>
        </div>
        <div className="flex md:hidden w-full md:w-4/12">
          <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3979.8096611371197!2d-73.50840822502444!3d4.059194395914552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNMKwMDMnMzMuMSJOIDczwrAzMCcyMS4wIlc!5e0!3m2!1ses-419!2sco!4v1723420086100!5m2!1ses-419!2sco" width="100%" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-xl drop-shadow-md"></iframe>
        </div>
      </div>
    </div>
  )
}