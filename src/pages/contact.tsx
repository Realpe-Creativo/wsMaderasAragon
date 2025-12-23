import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import "./contact.css";

interface ContactProps { }

const Contact: React.FC<ContactProps> = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [sending, setSending] = useState(false);
    const [statusMsg, setStatusMsg] = useState<string | null>(null);

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setSending(true);
        setStatusMsg(null);

        emailjs.sendForm(
            SERVICE_ID,
            TEMPLATE_ID,
            formRef.current,
            USER_ID
        ).then(
            () => {
                setStatusMsg('¡Mensaje enviado con éxito!');
                formRef.current!.reset();
            },
            (error) => {
                console.error('EmailJS error:', error);
                setStatusMsg('Error al enviar el mensaje. Intenta de nuevo.');
            }
        ).finally(() => setSending(false));
    };

    return (
        <section className="w-full bg-white min-h-screen">
            {/* Sección promocional */}
            <div className="w-full h-48 sm:h-72 overflow-hidden mt-16">
                {/* Imagen MOBILE */}
                <img
                    src="/img/contact_us/portada_movil.jpg"
                    alt="Promoción"
                    className="block sm:hidden w-full h-full object-cover"
                />

                {/* Imagen DESKTOP */}
                <img
                    src="/img/contact_us/portada_desktop.jpg"
                    alt="Promoción"
                    className="hidden sm:block w-full h-full object-cover"
                />
            </div>

            {/* Título */}
            <h2 className="text-center font-bold text-xl sm:text-2xl lg:text-3xl mt-8 px-4">
                ¿Prefieres escribirnos o llamarnos directamente?
            </h2>

            {/* Info de contacto */}
            <div className="mt-8 flex flex-col md:flex-row justify-center items-start md:items-center px-4 sm:px-6 md:px-0">
                <div className="w-full md:w-1/2 flex md:justify-end mb-6 md:mb-0">
                    <div>
                        <p className="mb-2 text-left flex items-center text-sm sm:text-base">
                            <span className="mr-2">📍</span>
                            <span className="font-semibold">Villanueva, Casanare, Colombia</span>
                        </p>
                        <p className="text-left flex items-center text-sm sm:text-base">
                            <span className="mr-2">📞</span>
                            <span className="font-semibold">WhatsApp: +57 313 261 8038</span>
                        </p>
                    </div>
                </div>

                <div className="hidden md:block w-[2px] bg-black h-24 mx-6" />

                <div className="w-full md:w-1/2 flex md:justify-start">
                    <div>
                        <p className="mb-2 text-left flex items-center text-sm sm:text-base">
                            <span className="mr-2">📧</span>
                            <span className="font-semibold">maderasaragonsas@yahoo.es</span>
                        </p>
                        <p className="text-left flex items-center text-sm sm:text-base">
                            <span className="mr-2">🕒</span>
                            <span className="font-semibold">Lunes a viernes | 8:00 a.m. – 5:00 p.m.</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Mapa */}
            <div className="mt-16 px-4 sm:px-6 lg:px-0">
                <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl mx-auto h-48 sm:h-64 rounded-lg overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7952.717445098842!2d-72.938779!3d4.707597!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e15305a3fa2fc7d%3A0x7988e05d7d764b2e!2sMaderas%20Aragon!5e0!3m2!1ses!2sco!4v1747267127960!5m2!1ses!2sco"
                        width="100%"
                        height="100%"
                        className="border-0"
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>

            {/* Formulario */}
            <div className="mt-16 px-4 sm:px-6 lg:px-0">
                <h3 className="text-center font-bold text-lg sm:text-xl mb-6">
                    Déjanos tu mensaje y te contactamos en menos de 24 horas
                </h3>

                {/* ✅ ESTE ES EL CONTENEDOR CLAVE: ahora sí centra y limita en móvil */}
                <div className="w-full flex justify-center">
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-6 max-w-md sm:max-w-lg md:max-w-2xl w-full mx-auto p-4 sm:p-6 rounded-lg contact-form"
                    >
                        {/* Nombre completo */}
                        <div className="relative w-full">
                            <input
                                id="fullName"
                                name="from_name"
                                type="text"
                                placeholder=" "
                                required
                                className="peer w-full border-2 border-black rounded-full px-4 py-2 sm:px-2 sm:py-3 bg-white placeholder-transparent text-black text-left focus:outline-none focus:border-black transition-all duration-200"
                            />
                            <label
                                htmlFor="fullName"
                                className="absolute left-4 sm:left-6 top-3 bg-white px-1 sm:px-0 transform origin-left transition-all duration-200 -translate-y-3 scale-75 text-xs peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-xs"
                            >
                                Nombre completo
                            </label>
                        </div>

                        {/* Empresa + Teléfono */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="relative w-full">
                                <input
                                    id="company"
                                    name="company"
                                    type="text"
                                    placeholder=" "
                                    className="peer w-full border-2 border-black rounded-full px-4 py-2 sm:px-2 sm:py-3 bg-white placeholder-transparent text-black text-left focus:outline-none focus:border-black transition-all duration-200"
                                />
                                <label
                                    htmlFor="company"
                                    className="absolute left-4 sm:left-6 top-3 bg-white px-1 sm:px-2 transform origin-left transition-all duration-200 -translate-y-3 scale-75 text-xs peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-xs"
                                >
                                    Empresa (Opcional)
                                </label>
                            </div>

                            <div className="relative w-full">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    placeholder=" "
                                    className="peer w-full border-2 border-black rounded-full px-4 py-2 sm:px-2 sm:py-3 bg-white placeholder-transparent text-black text-left focus:outline-none focus:border-black transition-all duration-200"
                                />
                                <label
                                    htmlFor="phone"
                                    className="absolute left-4 sm:left-6 top-3 bg-white px-1 sm:px-2 transform origin-left transition-all duration-200 -translate-y-3 scale-75 text-xs peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-xs"
                                >
                                    Teléfono o WhatsApp
                                </label>
                            </div>
                        </div>

                        {/* Correo electrónico */}
                        <div className="relative w-full">
                            <input
                                id="email"
                                name="from_email"
                                type="email"
                                placeholder=" "
                                required
                                className="peer w-full border-2 border-black rounded-full px-4 py-2 sm:px-2 sm:py-3 bg-white placeholder-transparent text-black text-left focus:outline-none focus:border-black transition-all duration-200"
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-4 sm:left-6 top-3 bg-white px-1 sm:px-2 transform origin-left transition-all duration-200 -translate-y-3 scale-75 text-xs peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-xs"
                            >
                                Correo electrónico
                            </label>
                        </div>

                        {/* Mensaje */}
                        <div className="relative w-full sm:w-3/4 lg:w-2/3 mx-auto">
              <textarea
                  id="message"
                  name="message"
                  placeholder=" "
                  required
                  rows={8}
                  className="peer w-full h-48 sm:h-56 resize-none border-2 border-black rounded-md px-4 py-2 sm:px-5 sm:py-4 bg-white placeholder-transparent text-black text-left focus:outline-none focus:border-black transition-all duration-200"
              />
                            <label
                                htmlFor="message"
                                className="absolute left-4 sm:left-6 top-3 bg-white px-1 sm:px-2 transform origin-left transition-all duration-200 -translate-y-3 scale-75 text-xs peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-xs"
                            >
                                Mensaje o tipo de proyecto
                            </label>
                        </div>

                        {/* Botón y estado */}
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={sending}
                                className={`px-6 py-2 sm:px-8 sm:py-3 font-semibold rounded-full focus:outline-none ${sending
                                    ? 'bg-gray-400 cursor-not-allowed text-white'
                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                }`}
                            >
                                {sending ? 'Enviando...' : 'Enviar'}
                            </button>
                            {statusMsg && (
                                <p className="mt-4 text-sm text-center text-gray-700">
                                    {statusMsg}
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
