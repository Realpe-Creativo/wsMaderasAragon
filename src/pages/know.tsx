import { useRef, useState } from 'react'
import './animations.css'

interface TimelineItem {
    date: string
    title: string
    content: string
    bgColor: string
    images?: string[]
}

const timelineData: TimelineItem[] = [
    {
        date: '2008 - 2010',
        title: 'El origen de un oficio y un sueño empresarial',
        content:
            'Maderas Aragón nace en 2008, en Villavicencio, como una empresa comercializadora de madera, impulsada por la experiencia temprana de su fundador en el sector forestal. Con recursos limitados, un camión adquirido a crédito y una clara vocación por el trabajo en madera, la empresa inicia operaciones atendiendo un mercado que demandaba calidad, cumplimiento y conocimiento técnico.\n' +
            ' Este primer periodo consolida las bases del negocio: entender la madera, el territorio y al cliente llanero.\n',
        bgColor: '#BADF72',
        images: ['/img/about_us/hito1_1.jpg', '/img/about_us/hito1_2.jpg', '/img/about_us/hito1_3.jpg'],
    },
    {
        date: '2011 – 2013',
        title: 'De comercializadores a productores: una decisión clave',
        content:
            'Ante la creciente demanda y la necesidad de asegurar materia prima confiable, Maderas Aragón da un giro estratégico: inicia la construcción de su primer aserrío en Sabanalarga y establece plantaciones forestales propias.\n' +
            ' Este periodo marca la transición más importante en su historia: pasar de comprar madera a transformarla, controlando calidad, volumen y procesos desde el origen.',
        bgColor: '#b09bff',
        images: ['/img/about_us/hito2_1.jpg', '/img/about_us/hito2_2.jpg', '/img/about_us/hito2_3.jpg', '/img/about_us/hito2_4.jpg'],
    },
    {
        date: '2013 – 2015',
        title: 'Infraestructura, maquinaria y control del territorio',
        content:
            'Con la compra de maquinaria forestal, tractomulas y el fortalecimiento de la logística desde zonas como Vichada, la empresa consolida su operación a gran escala. Se abren nuevas sedes en Villavicencio y se optimizan los flujos de transporte y producción.\n' +
            ' Maderas Aragón deja de ser una operación local para convertirse en un actor regional con capacidad operativa propia.\n',
        bgColor: '#44c5b8',
        images: [
            '/img/about_us/hito3_1.jpg',
            '/img/about_us/hito3_2.jpg',
            '/img/about_us/hito3_3.jpg',
            '/img/about_us/hito3_4.jpg',
            '/img/about_us/hito3_5.jpg',
            '/img/about_us/hito3_6.jpg',
            '/img/about_us/hito3_7.jpg',
        ],
    },
    {
        date: '2016 – 2018',
        title: 'La empresa se consolida y se vuelve familia\n',
        content:
            'La operación madura y el equipo humano se fortalece. La empresa alcanza estabilidad productiva, amplía su portafolio y refuerza su presencia en la región participando en eventos y ferias.\n' +
            ' Maderas Aragón se consolida como una empresa familiar, donde el crecimiento económico va de la mano con la generación de empleo y arraigo territorial.',
        bgColor: '#BADF72',
        images: ['/img/about_us/hito4_1.jpg', '/img/about_us/hito4_2.jpg', '/img/about_us/hito4_3.jpg'],
    },
    {
        date: '2019 – 2021',
        title: 'Valor agregado, transformación y nuevos usos de la madera',
        content:
            'La empresa amplía su visión: ya no solo vende madera estructural, sino que desarrolla productos transformados, aplicaciones arquitectónicas y soluciones para construcción, ganadería y espacios comerciales.\n' +
            ' La madera se convierte en un material de diseño, durabilidad y confianza, alineado con las nuevas necesidades del mercado.\n',
        bgColor: '#b09bff',
        images: ['/img/about_us/hito5_1.jpg', '/img/about_us/hito5_2.jpg', '/img/about_us/hito5_3.jpg', '/img/about_us/hito5_4.jpg', '/img/about_us/hito5_5.jpg'],
    },
    {
        date: '2022 – Hoy',
        title: 'Calidad certificada y visión de futuro',
        content:
            'Con la implementación de procesos de inmunizado bajo estándares internacionales (AWPA), Maderas Aragón garantiza productos con hasta 20 años de durabilidad, posicionándose como una de las empresas forestales más importantes de los Llanos Orientales.\n' +
            ' Hoy, la compañía proyecta su siguiente gran paso: fortalecer su liderazgo regional y abrir camino hacia mercados internacionales, llevando la madera llanera más allá de Colombia.',
        bgColor: '#44c5b8',
        images: ['/img/about_us/hito6_1.jpg', '/img/about_us/hito6_2.jpg', '/img/about_us/hito6_3.jpg', '/img/about_us/hito6_4.jpg', '/img/about_us/hito6_5.jpg'],
    },
]

/* ===============================
   SlideStackImage
   =============================== */
function SlideStackImage({ images, alt }: { images: string[]; alt: string }) {
    const [stack, setStack] = useState<string[]>(images)

    const rotateStack = (clickedIndex: number) => {
        // Mueve la imagen clickeada al final
        setStack(prev => {
            const clicked = prev[clickedIndex]
            const rest = prev.filter((_, i) => i !== clickedIndex)
            return [...rest, clicked]
        })
    }

    /**
     * IMPORTANTE:
     * Las clases visuales se asignan desde el fondo hacia el frente
     * por eso usamos reverse()
     */
    const visualStack = [...stack].slice(0, 5).reverse()

    return (
        <div className="slide-stack">
            {visualStack.map((src, visualIndex) => {
                const realIndex = stack.indexOf(src)
                const isFront = visualIndex === visualStack.length - 1

                return (
                    <img
                        key={`${src}-${stack.length}`} // fuerza repaint correcto
                        src={src}
                        alt={isFront ? alt : ''}
                        aria-hidden={!isFront}
                        className={`slide-stack__img slide-stack__img--${visualIndex}`}
                        onClick={() => rotateStack(realIndex)}
                    />
                )
            })}
        </div>
    )
}

export default function Know() {
    const containerRef = useRef<HTMLDivElement>(null)

    const scrollTo = (idx: number) => {
        const targetIndex = idx + 1
        const slide = containerRef.current?.children[targetIndex] as HTMLElement
        slide?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div
            ref={containerRef}
            className="pt-16 md:pt-0 h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar"
        >
            {/* ================= HERO ================= */}
            <section className="relative isolate h-screen snap-start bg-black text-white">
                <div className="cloud one absolute -z-10" />
                <div className="cloud two absolute -z-10" />
                <div className="cloud three absolute -z-10" />
                <div className="cloud four absolute -z-10" />
                <div className="cloud five absolute -z-10" />
                <div className="cloud six absolute -z-10" />
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                    <img src="/logo-white.png" className="mb-8 w-32 sm:w-40" />
                    <h1 className="text-3xl sm:text-5xl font-bold mb-6">Celebrando nuestra historia</h1>
                    <button onClick={() => scrollTo(0)} className="bg-white text-black px-8 py-4 rounded-full">
                        Comenzar
                    </button>
                </div>
            </section>

            {/* ================= TIMELINE ================= */}
            {timelineData.map((item, i) => (
                <section
                    key={i}
                    // ✅ En mobile NO forzamos h-screen para que el alto sea el necesario y no se corten las imágenes
                    className="relative isolate snap-start min-h-screen md:h-screen"
                    style={{ backgroundColor: item.bgColor }}
                >
                    <div className="cloud one absolute -z-10" />
                    <div className="cloud two absolute -z-10" />
                    <div className="cloud three absolute -z-10" />
                    <div className="cloud four absolute -z-10" />
                    <div className="cloud five absolute -z-10" />
                    <div className="cloud six absolute -z-10" />

                    <div className="flex flex-col md:flex-row items-start md:items-center min-h-screen md:h-full px-6 md:px-16 py-10 md:py-0">
                        {/* Texto */}
                        <div className="md:w-1/2 z-20">
                            <span className="block mb-4 font-semibold">{item.date}</span>
                            <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
                            <p className="text-lg text-justify">{item.content}</p>

                            <div className="mt-6 hidden md:flex gap-4">
                                {i > 0 && (
                                    <button onClick={() => scrollTo(i - 1)} className="bg-black text-white px-6 py-3 rounded-full">
                                        ← Anterior
                                    </button>
                                )}
                                {i < timelineData.length - 1 && (
                                    <button onClick={() => scrollTo(i + 1)} className="bg-black text-white px-6 py-3 rounded-full">
                                        Siguiente →
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Slide images (en mobile quedan debajo del texto por el flex-col) */}
                        {item.images && (
                            <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
                                <SlideStackImage images={item.images} alt={item.title} />
                            </div>
                        )}
                    </div>
                </section>
            ))}

            {/* ================= FINAL ================= */}
            <section className="h-screen snap-start bg-black flex items-center justify-center">
                <img src="/logo-white.png" className="w-64 md:w-80" />
            </section>
        </div>
    )
}
