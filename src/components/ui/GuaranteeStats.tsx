// GuaranteeStatsSlider.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type StatSlide = {
  key: string;
  type: 'stat';
  prefix: string;
  value: number;
  highlight: string;
  rest: string;
};
type LogoSlide = {
  key: string;
  type: 'logo';
  image: string;
};
type Slide = StatSlide | LogoSlide;

/** Cuenta de 0 a `end` en `duration` seg, solo si `start===true`. */
const useCountUp = (end: number, duration = 2, start = false) => {
  const [count, setCount] = useState(0);
  const startTime = useRef<number|null>(null);
  useEffect(() => {
    if (!start) return;
    const step = (ts: number) => {
      if (startTime.current === null) startTime.current = ts;
      const progress = ts - startTime.current;
      const ratio = Math.min(progress / (duration * 1000), 1);
      setCount(Math.floor(ratio * end));
      if (progress < duration * 1000) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
    return () => { startTime.current = null; };
  }, [end, duration, start]);
  return count;
};

const GuaranteeStatsSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Inicia contadores al entrar en viewport
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setHasStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    containerRef.current && obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Valores animados
  const hectareas  = useCountUp(1000, 2, hasStarted);
  const años       = useCountUp(20,   2, hasStarted);
  const postes     = useCountUp(15000,2, hasStarted);
  const sostenible = useCountUp(100,  2, hasStarted);
  const clientes   = useCountUp(1200, 2, hasStarted);

  // Tus 5 stats
  const stats: StatSlide[] = [
    { key:'h', type:'stat', prefix:'+', value:hectareas,  highlight:' hectáreas',        rest:' de cultivos de pino y eucalipto' },
    { key:'a', type:'stat', prefix:'+', value:años,       highlight:' años',             rest:' de experiencia' },
    { key:'p', type:'stat', prefix:'+', value:postes,     highlight:' postes mensuales', rest:' entregados en todo el país' },
    { key:'s', type:'stat', prefix:'%',  value:sostenible, highlight:' sostenible',     rest:' y libre de deforestación' },
    { key:'c', type:'stat', prefix:'+', value:clientes,   highlight:' clientes satisfechos', rest:' a nivel nacional' },
  ];

  const logos: LogoSlide[] = [
    // Puedes añadir aquí logos de certificación
  ];

  // Combina y duplica
  const combined: Slide[] = [...stats, ...logos];
  const extended = [...combined, ...combined];
  const length = combined.length;

  // Detecta cuántos ítems mostrar según ancho
  const getItemsPerView = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    return 5;
  };
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  useEffect(() => {
    const onResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const [startIndex, setStartIndex] = useState(0);
  const handleNext = useCallback(() => {
    setStartIndex(i => (i + 1) % length);
  }, [length]);
  const handlePrev = useCallback(() => {
    setStartIndex(i => (i - 1 + length) % length);
  }, [length]);

  // Auto-play cada 10s
  useEffect(() => {
    const iv = setInterval(handleNext, 10000);
    return () => clearInterval(iv);
  }, [handleNext]);

  // Cálculo de translateX
  const shiftPct = -(startIndex * (100 / itemsPerView));

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: '#f6f4f2' }}
      className="py-12"
    >
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Botones laterales */}
        <button
          onClick={handlePrev}
          aria-label="Anterior"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-20 hover:bg-gray-100 transition"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={handleNext}
          aria-label="Siguiente"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-20 hover:bg-gray-100 transition"
        >
          <FaChevronRight />
        </button>

        <div className="relative overflow-hidden">
          {/* Gradientes laterales */}
          <div
            className="absolute left-0 top-0 h-full w-20 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to right, #f6f4f2 90%, rgba(246,244,242,0))'
            }}
          />
          <div
            className="absolute right-0 top-0 h-full w-20 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to left, #f6f4f2 90%, rgba(246,244,242,0))'
            }}
          />

          {/* Carril animado */}
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(${shiftPct}%)` }}
          >
            {extended.map((item, idx) => (
              <div
                key={`${item.key}-${idx}`}
                className="px-4 py-6 flex flex-col items-center"
                style={{ flex: `0 0 ${100 / itemsPerView}%` }}
              >
                {item.type === 'stat' ? (
                  <>
                    {/* Cifra más grande */}
                    <p className="text-5xl md:text-6xl font-bold">
                      {item.prefix}{item.value}
                    </p>
                    {/* Texto descriptivo normal */}
                    <p className="mt-5 text-center text-base text-gray-700">
                      {item.highlight}{item.rest}
                    </p>
                  </>
                ) : (
                  <img
                    src={item.image}
                    alt="Certificación"
                    className="h-24 object-contain"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeStatsSlider;
