// src/components/Timeline.tsx
import React, { useRef, useState, useEffect, createRef } from 'react'
import { useOnScreen } from '../hooks/useOnScreen'

// Definimos aquí la interfaz de cada elemento de la línea del tiempo
interface TimelineItem {
  id: string
  date: string         // ISO, p. ej. "1950-01-01"
  title: string
  description: string
  imageUrl: string
  cta?: { text: string; href: string }
}

export const Timeline: React.FC = () => {
  const [items, setItems] = useState<TimelineItem[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // 1. Fetch de datos
  useEffect(() => {
    fetch('/api/timeline')
      .then(res => res.json())
      .then((data: TimelineItem[]) => setItems(data))
      .catch(console.error)
  }, [])

  // 2. Función para ir al siguiente slide
  const handleNext = (index: number) => {
    const next = containerRef.current?.children[index + 1] as HTMLElement
    next?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory"
    >
      {items.map((item, i) => {
        const ref = createRef<HTMLElement>()
        const visible = useOnScreen(ref, '-50px')

        return (
          <section
            key={item.id}
            ref={ref}
            className={`
              h-screen snap-start relative bg-cover bg-center
              transition-opacity duration-700 ease-out
              ${visible ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ backgroundImage: `url(${item.imageUrl})` }}
            data-date={item.date}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center p-8 text-white">
              <time className="text-sm uppercase tracking-wide mb-2">
                {new Date(item.date).toLocaleDateString()}
              </time>
              <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
              <p className="max-w-prose text-center mb-6">
                {item.description}
              </p>
              {item.cta && (
                <a
                  href={item.cta.href}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium mb-6"
                >
                  {item.cta.text}
                </a>
              )}
              <button
                onClick={() => handleNext(i)}
                className="
                  mt-auto mb-4 px-4 py-2 border border-white rounded
                  hover:bg-white hover:text-black transition-colors
                "
              >
                Next
              </button>
            </div>
          </section>
        )
      })}
    </div>
  )
}
