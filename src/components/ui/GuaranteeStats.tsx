// components/GuaranteeStatsSlider.tsx

import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
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

const useCountUp = (end: number, duration = 2, start = false) => {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    setCount(0);
    const step = (ts: number) => {
      if (startTime.current === null) startTime.current = ts;
      const progress = ts - startTime.current;
      const ratio = Math.min(progress / (duration * 1000), 1);
      setCount(Math.floor(ratio * end));
      if (progress < duration * 1000) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(step);
    return () => { startTime.current = null; };
  }, [end, duration, start]);

  return count;
};

interface GuaranteeStatsSliderProps {
  /** Si es false, muestra valores finales y no hace autoplay */
  animate?: boolean;
}

const GuaranteeStatsSlider: React.FC<GuaranteeStatsSliderProps> = ({
  animate = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Solo arrancar observer si queremos animar
  useEffect(() => {
    if (!animate) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [animate]);

  // cuenta en crudo; si animate=false luego lo sobreescribimos
  const rawHectareas  = useCountUp(1000, 2, hasStarted);
  const rawAños       = useCountUp(20,   2, hasStarted);
  const rawPostes     = useCountUp(15000,2, hasStarted);
  const rawSostenible = useCountUp(100,  2, hasStarted);
  const rawClientes   = useCountUp(1200, 2, hasStarted);

  // si no animamos, devolvemos el final inmediatamente
  const hectareas  = animate ? rawHectareas  : 1000;
  const años       = animate ? rawAños       : 20;
  const postes     = animate ? rawPostes     : 15000;
  const sostenible = animate ? rawSostenible : 100;
  const clientes   = animate ? rawClientes   : 1200;

  const stats: StatSlide[] = [
    { key:'h', type:'stat', prefix:'+', value:hectareas,  highlight:' hectáreas',          rest:' de cultivos de pino y eucalipto' },
    { key:'a', type:'stat', prefix:'+', value:años,       highlight:' años',                rest:' de experiencia' },
    { key:'p', type:'stat', prefix:'+', value:postes,     highlight:' postes mensuales',    rest:' entregados en todo el país' },
    { key:'s', type:'stat', prefix:'%', value:sostenible, highlight:' sostenible',         rest:' y libre de deforestación' },
    { key:'c', type:'stat', prefix:'+', value:clientes,   highlight:' clientes satisfechos',rest:' a nivel nacional' },
  ];
  const logos: LogoSlide[] = [ /* …logos si tienes */ ];
  const combined = [...stats, ...logos];
  const extended = [...combined, ...combined];
  const length   = combined.length;

  // cálculo de items por vista
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

  // índice de scroll
  const [startIndex, setStartIndex] = useState(0);
  const handleNext = useCallback(() => {
    setStartIndex(i => (i + 1) % length);
  }, [length]);
  const handlePrev = useCallback(() => {
    setStartIndex(i => (i - 1 + length) % length);
  }, [length]);

  // autoplay solo si animate=true
  useEffect(() => {
    if (!animate) return;
    const iv = setInterval(handleNext, 10000);
    return () => clearInterval(iv);
  }, [handleNext, animate]);

  const shiftPct = -(startIndex * (100 / itemsPerView));

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: '#f6f4f2' }}
      className="py-12"
    >
      <div className="relative max-w-6xl mx-auto px-4">
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
          {/* degradados laterales */}
          <div
            className="absolute left-0 top-0 h-full w-20 pointer-events-none z-10"
            style={{
              background:
                'linear-gradient(to right, #f6f4f2 90%, rgba(246,244,242,0))'
            }}
          />
          <div
            className="absolute right-0 top-0 h-full w-20 pointer-events-none z-10"
            style={{
              background:
                'linear-gradient(to left, #f6f4f2 90%, rgba(246,244,242,0))'
            }}
          />

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
                    <p className="text-5xl md:text-6xl font-bold">
                      {item.prefix}{item.value}
                    </p>
                    <p className="mt-5 text-center text-base text-gray-700">
                      {item.highlight}{item.rest}
                    </p>
                  </>
                ) : (
                  <img
                    src={item.image}
                    alt="Logo"
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