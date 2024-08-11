
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export interface ContactProps {
}

export default function  (props?: ContactProps) {
  props


  return (
    <div className="flex flex-col mt-32 mb-20">
      <div className="flex p-4 justify-center w-full bg-stone-700 flex-row">
        <div className="flex w-fit content-center">
          <span className="text-5xl my-4 text-white font-title-bold">Contáctanos</span>
        </div>
      </div>
      <div className="flex flex-row p-4 justify-center">
        <div className="flex flex-col p-2 md:w-5/12">
          <img src="/contact.png" className="rounded-xl drop-shadow-lg" alt="Foto" />
        </div>
        <div className="flex flex-col p-2 md:w-3/12">

        </div>
      </div>
      <hr className="border-stone-200 mx-10 my-4" />
      <div className="flex flex-col md:flex-row p-4 justify-center">
        <div className="flex flex-col p-2 w-full text-start md:w-8/12">
          <span className="flex text-2xl">Sedes</span>
        </div>
      </div>
      <div className="flex flex-col my-3 md:flex-row p-4 justify-center">
        <div className="flex flex-col  px-6 py-2 w-full md:w-4/12">
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
        <div className="flex flex-col px-6 py-2 w-full md:w-4/12">
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