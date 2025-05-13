// src/pages/know.tsx
import React, { useRef } from 'react'
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
    bgColor: '#ffcaa2',
    imageSrc: '/img/about_us/cows.png',
  },
  {
    date: 'January 1, 1983',
    title: 'Lanzamos nuestro primer bosque',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate eum impedit hic similique esse consequatur unde, molestias voluptate corrupti odit maiores nisi libero expedita fugiat nostrum saepe ad dolor!',
    bgColor: '#249ce9',
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
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar"
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
            className="mb-8 w-40 h-auto"
          />
          <h1 className="text-5xl font-bold mb-4">
            Celebrando 20 años de historia
          </h1>
          <button
            onClick={() => scrollTo(0)}
            className="mt-6 bg-white text-black px-8 py-4 rounded-full text-lg hover:opacity-90 transition"
          >
            Comenzar
          </button>
        </div>
      </section>

      {/* === Timeline === */}
      {timelineData.map((item, i) => (
        <section
          key={i}
          className="relative isolate h-screen snap-start overflow-hidden"
          style={{ backgroundColor: item.bgColor }}
        >
          {/* Nubes detrás */}
          <div className="cloud one   absolute -z-10" />
          <div className="cloud two   absolute -z-10" />
          <div className="cloud three absolute -z-10" />
          <div className="cloud four  absolute -z-10" />
          <div className="cloud five  absolute -z-10" />
          <div className="cloud six   absolute -z-10" />

          {/* Línea vertical */}
          <div className="absolute left-12 top-0 w-1 h-full bg-black z-20" />

          {/* Fecha y punto */}
          <div className="absolute top-40 left-16 font-semibold text-lg text-black z-20">
            {item.date}
          </div>
          <div className="absolute top-40 left-[50px] w-3 h-3 bg-black rounded-full z-20" />

          {/* Imagen a la derecha */}
          {item.imageSrc && (
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 z-20">
              <img
                src={item.imageSrc}
                alt={item.title}
                className="max-w-xs lg:max-w-md rounded-2xl shadow-lg object-cover"
              />
            </div>
          )}

          {/* Contenido */}
          <div className="absolute left-16 top-1/2 transform -translate-y-1/2 w-1/2 px-6 text-left z-20">
            <h2 className="text-4xl font-bold text-black mb-4">{item.title}</h2>
            <p className="text-lg text-black">{item.content}</p>

            {/* Botones */}
            <div className="mt-8 flex space-x-4">
              {i >= 0 && (
                <button
                  onClick={() => scrollTo(i - 1)}
                  className="bg-black text-white px-8 py-4 rounded-full text-lg hover:opacity-90 transition z-20"
                >
                  ← Anterior
                </button>
              )}
              {i <= timelineData.length - 1 && (
                <button
                  onClick={() => scrollTo(i + 1)}
                  className="bg-black text-white px-8 py-4 rounded-full text-lg hover:opacity-90 transition z-20"
                >
                  Siguiente →
                </button>
              )}
            </div>
          </div>
        </section>
      ))}

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
          className="w-80 h-auto"
        />
      </section>
    </div>
  )
}
