import { useRef, useState } from 'react'
import './animations.css'

interface TimelineItem {
    date: string
    title: string
    content: string
    bgColor: string
    imageSrc?: string
}

const timelineData: TimelineItem[] = [
    {
        date: 'Abril 4, 2005',
        title: 'Maderas Aragon es fundado',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate eum impedit hic similique esse consequatur unde, molestias voluptate corrupti odit maiores nisi libero expedita fugiat nostrum saepe ad dolor!',
        bgColor: '#BADF72',
        imageSrc: '/img/about_us/cows.png',
    },
    {
        date: 'January 1, 1983',
        title: 'Lanzamos nuestro primer bosque',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate eum impedit hic similique esse consequatur unde, molestias voluptate corrupti odit maiores nisi libero expedita fugiat nostrum saepe ad dolor!',
        bgColor: '#394930',
    },
    {
        date: 'November 10, 2001',
        title: 'Nos unimos!',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate eum impedit hic similique esse consequatur unde, molestias voluptate corrupti odit maiores nisi libero expedita fugiat nostrum saepe ad dolor!',
        bgColor: '#44c5b8',
    },
    {
        date: 'April 4, 2025',
        title: '20 Aniversario',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate eum impedit hic similique esse consequatur unde, molestias voluptate corrupti odit maiores nisi libero expedita fugiat nostrum saepe ad dolor!',
        bgColor: '#b09bff',
    },
]

/** NUEVO: slides de fotos con leyenda */
interface PhotoSlide {
    imageSrc: string
    caption: string
}

const photoSlides: PhotoSlide[] = [
    { imageSrc: '/img/products/postes_cilindrados/postes_cilindrados01.jpg', caption: '2005 — Fundación de Maderas Aragón' },
    { imageSrc: '/img/products/postes_cilindrados/postes_cilindrados03.jpg', caption: '2008 — Primera cosecha certificada' },
    { imageSrc: '/img/products/postes_ganaderos/postes_ganaderos08.jpg', caption: '2016 — Expansión a nuevos lotes' },
    { imageSrc: '/img/history/2025_aniversario.jpg', caption: '2025 — Celebración 20° Aniversario' },
]

export default function Know() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [slideIdx, setSlideIdx] = useState(0)

    const scrollTo = (idx: number) => {
        const targetIndex = idx + 1
        const slide = containerRef.current?.children[targetIndex] as HTMLElement
        slide?.scrollIntoView({ behavior: 'smooth' })
    }

    const prevPhoto = () => setSlideIdx((s) => (s - 1 + photoSlides.length) % photoSlides.length)
    const nextPhoto = () => setSlideIdx((s) => (s + 1) % photoSlides.length)

    return (
        <div
            ref={containerRef}
            className="pt-16 md:pt-0 h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar"
        >
            {/* === Sección principal con fondo negro + nubes === */}
            <section className="relative isolate h-screen snap-start overflow-hidden bg-black text-white">
                {/* Nubes */}
                <div className="cloud one absolute -z-10" />
                <div className="cloud two absolute -z-10" />
                <div className="cloud three absolute -z-10" />
                <div className="cloud four absolute -z-10" />
                <div className="cloud five absolute -z-10" />
                <div className="cloud six absolute -z-10" />

                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                    <img
                        src="/logo-white.png"
                        alt="Logo"
                        className="mb-8 w-32 sm:w-40 h-auto"
                    />
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Celebrando 20 años de historia
                    </h1>
                    <button
                        onClick={() => scrollTo(0)}
                        className="mt-6 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg hover:opacity-90 transition"
                    >
                        Comenzar
                    </button>
                </div>
            </section>

            {/* === Timeline === */}
            {timelineData.map((item, i) => (
                <section
                    key={i}
                    className="relative isolate h-screen snap-start overflow-hidden bg-[length:cover]"
                    style={{ backgroundColor: item.bgColor }}
                >
                    {/* Nubes detrás */}
                    <div className="cloud one   absolute -z-10" />
                    <div className="cloud two   absolute -z-10" />
                    <div className="cloud three absolute -z-10" />
                    <div className="cloud four  absolute -z-10" />
                    <div className="cloud five  absolute -z-10" />
                    <div className="cloud six   absolute -z-10" />

                    {/* Contenedor responsive */}
                    <div className="relative flex flex-col md:flex-row items-start md:items-center h-full px-6 md:px-16">
                        {/* Línea vertical y punto (solo en md+) */}
                        <div className="hidden md:block absolute left-12 top-0 w-1 h-full bg-black z-10" />
                        <div className="hidden md:block absolute top-40 left-11 w-3 h-3 bg-black rounded-full z-10" />

                        {/* Fecha */}
                        <div className="mt-8 md:mt-0 font-semibold text-lg text-black z-20 self-start md:absolute md:top-40 md:left-16">
                            {item.date}
                        </div>

                        {/* Contenido */}
                        <div className="mt-4 md:mt-0 md:ml-32 md:w-1/2 px-4 text-left z-20">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
                                {item.title}
                            </h2>
                            <p className="text-base sm:text-lg text-black">
                                {item.content}
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                                {i >= 0 && (
                                    <button
                                        onClick={() => scrollTo(i - 1)}
                                        className="bg-black text-white px-6 py-2 sm:px-8 sm:py-4 rounded-full text-base hover:opacity-90 transition"
                                    >
                                        ← Anterior
                                    </button>
                                )}
                                {i <= timelineData.length - 1 && (
                                    <button
                                        onClick={() => scrollTo(i + 1)}
                                        className="bg-black text-white px-6 py-2 sm:px-8 sm:py-4 rounded-full text-base hover:opacity-90 transition"
                                    >
                                        Siguiente →
                                    </button>
                                )}
                            </div>
                        </div>

                        {item.imageSrc && (
                            <div className="mt-6 md:mt-0 md:ml-auto md:mr-16 w-full md:w-auto flex justify-center z-20">
                                <img
                                    src={item.imageSrc}
                                    alt={item.title}
                                    className="w-64 sm:w-80 lg:w-96 rounded-2xl shadow-lg object-cover"
                                />
                            </div>
                        )}
                    </div>
                </section>
            ))}

            {/* === NUEVO: Slide de fotos a pantalla completa con leyenda abajito === */}
            <section className="relative isolate h-screen snap-start overflow-hidden bg-black text-white">
                {/* Nubes de fondo para coherencia visual */}
                <div className="cloud one   absolute -z-10" />
                <div className="cloud two   absolute -z-10" />
                <div className="cloud three absolute -z-10" />
                <div className="cloud four  absolute -z-10" />
                <div className="cloud five  absolute -z-10" />
                <div className="cloud six   absolute -z-10" />

                {/* Contenido del slide */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Imagen */}
                    <img
                        key={photoSlides[slideIdx].imageSrc}
                        src={photoSlides[slideIdx].imageSrc}
                        alt={photoSlides[slideIdx].caption}
                        className="w-full h-full object-cover transition-opacity duration-300"
                    />

                    {/* Flechas */}
                    <button
                        aria-label="Anterior"
                        onClick={prevPhoto}
                        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 backdrop-blur px-4 py-3 rounded-full"
                    >
                        ‹
                    </button>
                    <button
                        aria-label="Siguiente"
                        onClick={nextPhoto}
                        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 backdrop-blur px-4 py-3 rounded-full"
                    >
                        ›
                    </button>

                    {/* Dots indicadores */}
                    <div className="absolute bottom-24 left-0 right-0 flex items-center justify-center gap-2">
                        {photoSlides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setSlideIdx(i)}
                                className={`h-2.5 w-2.5 rounded-full transition ${
                                    i === slideIdx ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                                }`}
                                aria-label={`Ir a la foto ${i + 1}`}
                            />
                        ))}
                    </div>

                    {/* Leyenda abajito (ocupa todo el ancho) */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm">
                        <div className="max-w-5xl mx-auto px-6 py-4">
                            <p className="text-center text-sm sm:text-base md:text-lg">
                                {photoSlides[slideIdx].caption}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* === Sección final: solo logo en grande sobre fondo negro === */}
            <section className="relative isolate h-screen snap-start overflow-hidden bg-black flex items-center justify-center">
                {/* Nubes de fondo */}
                <div className="cloud one   absolute -z-10" />
                <div className="cloud two   absolute -z-10" />
                <div className="cloud three absolute -z-10" />
                <div className="cloud four  absolute -z-10" />
                <div className="cloud five  absolute -z-10" />
                <div className="cloud six   absolute -z-10" />

                {/* Logo grande */}
                <img
                    src="/logo-white.png"
                    alt="Logo final"
                    className="w-56 sm:w-64 md:w-80 h-auto"
                />
            </section>
        </div>
    )
}