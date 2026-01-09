// TestimonialSlider.jsx
import {useState, useEffect, useCallback, useRef} from "react";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    avatar: string;
}

const TestimonialSlider = () => {
    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: "Carlos Eduardo Rojas",
            role: "Finca El Porvenir – Meta",
            content:
                "Compré postes cilindrados para cercar la finca hace más de 14 años y hoy puedo decir que fue una inversión bien hecha. Los postes siguen firmes, derechos y en perfecto estado, a pesar del clima fuerte de los Llanos. La madera se nota bien inmunizada y de excelente calidad. Por eso sigo recomendando a Maderas Aragón con total confianza.",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            id: 2,
            name: "Luis Fernando Acosta",
            role: "Lechería San Miguel – Casanare",
            content:
                "Hace 5 años compramos varetas para el corral de la lechería y el resultado ha sido excelente. La madera sigue intacta, resistente al uso diario y al manejo del ganado. No se ha podrido ni deformado. Se nota el cuidado en el proceso y la calidad del material. Sin duda volveríamos a comprar.",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            id: 3,
            name: "Andrea Martínez",
            role: "Comercial  – Villavicencio",
            content:
                "Necesitábamos madera personalizada para nuestro establecimiento comercial y Maderas Aragón nos asesoró desde el inicio. Han pasado 8 años y la madera sigue en perfectas condiciones, tanto estructural como estéticamente. Es un proveedor serio, cumplido y con materiales de muy alta calidad.",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        },
        {
            id: 4,
            name: "José Armando Pérez",
            role: "Jardines El Roble – Meta",
            content:
                "Compramos madera para cercas y encierros de jardinería, usando varetas pulidas, hace aproximadamente 6 años. La madera se mantiene intacta, bien presentada y resistente a la humedad. Es ideal para trabajos donde la estética y la durabilidad son clave. Quedamos muy satisfechos con el resultado.",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isFading, setIsFading] = useState(false);

    const fadeTimeout = useRef<NodeJS.Timeout | null>(null);
    const autoPlayTimeout = useRef<NodeJS.Timeout | null>(null);

    // Avanza el índice con fade
    const handleNext = useCallback(() => {
        if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
        setIsFading(true);
        fadeTimeout.current = setTimeout(() => {
            setCurrentIndex((prev) =>
                prev === testimonials.length - 1 ? 0 : prev + 1
            );
            setIsFading(false);
        }, 500);
    }, [testimonials.length]);

    // Retrocede con fade y pausa autoplay
    const handlePrev = useCallback(() => {
        if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
        setIsFading(true);
        fadeTimeout.current = setTimeout(() => {
            setCurrentIndex((prev) =>
                prev === 0 ? testimonials.length - 1 : prev - 1
            );
            setIsFading(false);
        }, 500);
        resetAutoPlay();
    }, [testimonials.length]);

    // Va a un testimonio específico con fade y pausa autoplay
    const handleIndicator = useCallback((index: number) => {
        if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
        setIsFading(true);
        fadeTimeout.current = setTimeout(() => {
            setCurrentIndex(index);
            setIsFading(false);
        }, 500);
        resetAutoPlay();
    }, []);

    // Reinicia el autoplay tras interacción
    const resetAutoPlay = useCallback(() => {
        setIsAutoPlaying(false);
        if (autoPlayTimeout.current) clearTimeout(autoPlayTimeout.current);
        autoPlayTimeout.current = setTimeout(() => {
            setIsAutoPlaying(true);
        }, 10000);
    }, []);

    // Auto-play cada 5s
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (isAutoPlaying) {
            intervalId = setInterval(handleNext, 5000);
        }
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isAutoPlaying, handleNext]);

    // Limpieza de timeouts al desmontar
    useEffect(() => {
        return () => {
            if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
            if (autoPlayTimeout.current) clearTimeout(autoPlayTimeout.current);
        };
    }, []);

    const {name, role, content} = testimonials[currentIndex];

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            {/* Contenedor transparente (sin bg-white, sin sombra, sin bordes) */}
            <div className="relative p-6 md:p-8">
                {/* Título centrado */}
                <h2 className="text-3xl font-bold mb-8 text-center" style={{color: "white"}}>
                    Lo que dicen nuestros{" "}
                    <span className="text-[#BADF72]">clientes</span>
                </h2>

                {/* Testimonio con animación de fade */}
                <div
                    className={`flex flex-col md:flex-row items-center gap-8 transition-opacity duration-500 ${isFading ? "opacity-0" : "opacity-100"
                    }`}
                >
                    {/* <div className="w-32 h-32 flex-shrink-0 rounded-full overflow-hidden border-4 border-blue-100">
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div> */}
                    <div className="flex-1">
                        <blockquote className="text-lg md:text-xl italic text-gray-600 mb-6" style={{color: "white"}}>
                            "{content}"
                        </blockquote>
                        <div className="text-right">
                            <p className="font-bold text-gray-900" style={{color: "white"}}>{name}</p>
                            <p className="text-blue-600" style={{color: "white"}}>{role}</p>
                        </div>
                    </div>
                </div>

                {/* Controles de navegación */}
                <div className="flex justify-between items-center mt-8">
                    <button
                        onClick={handlePrev}
                        className="
                        p-2 rounded-full bg-transparent 
                        text-white               /* color por defecto */
                        hover:text-[#BADF72]     /* color al estar “parado” (hover) */
                        transition-colors
                      "
                        aria-label="Testimonio anterior"
                    >
                        <FaChevronLeft size={20}/>
                    </button>

                    <div className="flex gap-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleIndicator(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex
                                    ? "bg-[#BADF72]"
                                    : "bg-white hover:bg-gray-200"
                                }`}
                                aria-label={`Ir al testimonio ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handlePrev}
                        className="
                        p-2 rounded-full bg-transparent 
                        text-white               /* color por defecto */
                        hover:text-[#BADF72]     /* color al estar “parado” (hover) */
                        transition-colors
                      "
                        aria-label="Testimonio anterior"
                    >
                        <FaChevronRight size={20}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSlider;
