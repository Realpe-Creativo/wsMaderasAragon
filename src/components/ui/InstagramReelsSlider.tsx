import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Reel {
  id: number;
  thumbnail: string;
  video: string;
  igProfile: string;
  username: string;
}

const reels: Reel[] = [
  { id: 1, thumbnail: "/thumbs/reels1.jpg", video: "/videos/reels1.mp4", igProfile: "https://www.instagram.com/maderasaragon/", username: "maderasaragon" },
  { id: 2, thumbnail: "/thumbs/reels2.jpg", video: "/videos/reels2.mp4", igProfile: "https://www.instagram.com/maderasaragon/", username: "maderasaragon" },
  { id: 3, thumbnail: "/thumbs/reels3.jpg", video: "/videos/reels3.mp4", igProfile: "https://www.instagram.com/maderasaragon/", username: "maderasaragon" },
  { id: 4, thumbnail: "/thumbs/reels4.jpg", video: "/videos/reels4.mp4", igProfile: "https://www.instagram.com/maderasaragon/", username: "maderasaragon" },
  { id: 5, thumbnail: "/thumbs/reels5.jpg", video: "/videos/reels5.mp4", igProfile: "https://www.instagram.com/maderasaragon/", username: "maderasaragon" },
  { id: 6, thumbnail: "/thumbs/reels6.jpg", video: "/videos/reels6.mp4", igProfile: "https://www.instagram.com/maderasaragon/", username: "maderasaragon" },
];

export default function InstagramReelsSlider() {
  const length = reels.length;

  const getItemsPerView = () => {
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 768) return 2;
    if (w < 1024) return 3;
    if (w < 1280) return 4;
    return 5;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  const [startIndex, setStartIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [modalReel, setModalReel] = useState<Reel | null>(null);

  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setStartIndex(0);
    setIsTransitioning(false);
  }, [itemsPerView]);

  const extendedReels = useMemo(
    () => [...reels, ...reels.slice(0, itemsPerView)],
    [itemsPerView]
  );

  const goNext = useCallback(() => {
    setStartIndex(prev => prev + 1);
    setIsTransitioning(true);
  }, []);

  const goPrev = useCallback(() => {
    setStartIndex(prev => (prev === 0 ? length - 1 : prev - 1));
    setIsTransitioning(true);
  }, [length]);

  useEffect(() => {
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [goNext]);

  const handleTransitionEnd = () => {
    if (startIndex >= length) {
      setIsTransitioning(false);
      setStartIndex(0);
    }
  };

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goPrev() : goNext();
    }
    touchStartX.current = null;
  };

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalReel(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-stone-800 mb-6">
        CONOCE NUESTRAS <span className="text-[#BADF72]">REDES</span>
      </h2>

      <div className="relative flex items-center overflow-hidden">
        <button
          onClick={goPrev}
          className="absolute left-1 md:left-4 z-10 p-1 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full transition"
          aria-label="Reel anterior"
        >
          <FaChevronLeft size={20} className="text-stone-800" />
        </button>

        <div
          className="overflow-hidden flex-1 mx-2"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`${isTransitioning ? 'transition-transform duration-500 ease-out' : ''} flex`}
            style={{ transform: `translateX(-${(100 / itemsPerView) * startIndex}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedReels.map((reel, idx) => (
              <div
                key={`${reel.id}-${idx}`}
                className="cursor-pointer px-1 md:px-2 relative"
                style={{ flex: `0 0 ${100 / itemsPerView}%` }}
              >
                <div className="aspect-video rounded-2xl overflow-hidden max-w-[200px] md:max-w-[160px] mx-auto">
                  <img
                    src={reel.thumbnail}
                    alt={`Reel ${reel.id} de @${reel.username}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white opacity-75"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.5 5.21a.75.75 0 011.085-.66l6.5 3.79a.75.75 0 010 1.32l-6.5 3.79A.75.75 0 016 12.79V5.21z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <button
                  onClick={() => setModalReel(reel)}
                  className="absolute inset-0"
                  aria-label="Abrir reel"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={goNext}
          className="absolute right-1 md:right-4 z-10 p-1 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full transition"
          aria-label="Siguiente reel"
        >
          <FaChevronRight size={20} className="text-stone-800" />
        </button>
      </div>

      {/* Modal */}
      {modalReel && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setModalReel(null)}
        >
          <div
            className="relative w-full max-w-[400px] aspect-video mx-auto bg-black rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalReel(null)}
              className="absolute top-2 right-2 text-white text-3xl z-10"
              aria-label="Cerrar modal"
            >
              &times;
            </button>
            <video
              src={modalReel.video}
              controls
              autoPlay
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}