import {LuMessageCircle, LuNewspaper, LuShoppingBag, LuBadgeCheck} from "react-icons/lu";
import {Link} from "react-router-dom";
import {useWindowScroll} from "@mantine/hooks";
import {useEffect, useRef} from "react";

import YoutubeModal from "@/components/ui/YoutubeModal";
import TestimonialSlider from "@/components/ui/TestimonialSlider";
import InstagramReelsSlider from "@/components/ui/InstagramReelsSlider";
import GuaranteeStats from "@/components/ui/GuaranteeStats";

export interface LoadingProps {
}

export default function Hero(props?: LoadingProps) {
    const [scroll, scrollTo] = useWindowScroll();
    scroll;
    props;

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        // Primero, aplicar atributos HTML necesarios para iOS
        v.setAttribute('muted', '');
        v.setAttribute('autoplay', '');
        v.setAttribute('loop', '');
        v.setAttribute('playsinline', '');
        v.setAttribute('webkit-playsinline', '');

        // Luego, reforzar propiedades en JS
        v.muted = true;
        v.loop = true;
        v.autoplay = true;
        v.playsInline = true;

        // Recargar el vídeo con estos atributos
        v.load();

        // Finalmente intentar play
        v.play().catch((err) => {
            console.warn('Autoplay fallido:', err);
        });
    }, []);

    const items = [
        {
            title: "Impacto climático positivo",
            subtitle: "Reforestación, captura de carbono y manejo de agua.",
            image: "/img/landing/forest2.jpg"
        },
        {
            title: "Amamos la tierra",
            subtitle: "Cuidamos el suelo, la biodiversidad y la comunidad.",
            image: "/img/landing/land2.jpg"
        },
        {
            title: "Impacto social real",
            subtitle: "Generamos empleo digno en zonas rurales",
            image: "/img/landing/social_impact.jpg"
        },
        {
            title: "Artesanos de la madera",
            subtitle: "Nuestro equipo transforma la madera con conocimiento y respeto.",
            image: "/img/landing/climate2.jpg"
        },
    ];

    return (
        <>
            <div className="relative" id="init">
                <video
                    ref={videoRef}
                    src="/banner.mp4"
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="auto"
                    className="absolute hero-video z-0 w-full h-full object-cover"
                />
                <div className="w-screen h-[98vh] md:h-screen flex justify-center items-center z-10 p-6 relative">
                    {/* Contenido de héroe */}
                </div>
            </div>

            <div
                className="bg-[#394930] z-50 flex justify-center items-center text-white text-3xl p-6 md:p-20 overflow-x-auto whitespace-nowrap">
                {[
                    {to: '/categories', Icon: LuShoppingBag, label: 'Productos'},
                    {to: '/know', Icon: LuBadgeCheck, label: 'Nosotros'},
                    {to: '/news', Icon: LuNewspaper, label: 'Bitácora'},
                    {to: '/contact', Icon: LuMessageCircle, label: 'Contáctanos'},
                ].map(({to, Icon, label}, idx) => (
                    <Link
                        key={idx}
                        to={to}
                        onClick={() => setTimeout(() => scrollTo({y: 0}), 300)}
                        className="flex-shrink-0 flex flex-col items-center p-4 w-3/12"
                    >
                        <Icon className="text-[2.5rem] md:text-[4.5rem]" style={{color: '#BADF72'}}/>
                        <span className="mt-2 text-sm md:text-2xl" style={{color: '#BADF72'}}>{label}</span>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                {items.map((item, idx) => (
                    <div key={idx} className="relative group overflow-hidden h-[500px] cursor-pointer">
                        <img src={item.image} alt={item.title}
                             className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"/>
                        <div className="absolute inset-0 bg-black bg-opacity-30"/>
                        <div className="absolute bottom-4 left-4 text-white w-[calc(100%-2rem)]">
                            <h3 className="font-bold text-lg md:text-xl mb-1">{item.title}</h3>
                            <p className="text-sm md:text-base min-h-[3rem]">{item.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full bg-[#F8F7DD] min-h-96 flex justify-center items-center px-6 md:px-20">
                <p className="text-center text-lg md:text-3xl font-extrabold text-[#394930]">
                    ¡EN MADERAS ARAGÓN TRABAJAMOS CON LA TIERRA Y NO CONTRA ELLA!
                </p>
            </div>

            <div className="relative z-10 py-0 flex justify-center"><YoutubeModal videoId="VBdZrbaVzR0"/></div>
            <div className="bg-[#394930] py-1 px-1"><TestimonialSlider/></div>
            <div className="bg-[#F8F7DD] py-1 px-1"><InstagramReelsSlider/></div>
            <div className="bg-[#F8F7DD] py-1 px-1"><GuaranteeStats/></div>
        </>
    );
}
