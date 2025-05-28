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

  // Define breakpoints for responsive items per view
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

  // Update itemsPerView on resize
  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset carousel when items per view changes
  useEffect(() => {
    setStartIndex(0);
    setIsTransitioning(false);
  }, [itemsPerView]);

  // Extend reels for infinite looping
  const extendedReels = useMemo(() => [
    ...reels,
    ...reels.slice(0, itemsPerView)
  ], [itemsPerView]);

  const goNext = useCallback(() => {
    setStartIndex(prev => prev + 1);
    setIsTransitioning(true);
  }, []);

  const goPrev = useCallback(() => {
    setStartIndex(prev => (prev === 0 ? length - 1 : prev - 1));
    setIsTransitioning(true);
  }, [length]);

  // Autoplay slide change
  useEffect(() => {
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [goNext]);

  // Handle transition reset
  const handleTransitionEnd = () => {
    if (startIndex >= length) {
      setIsTransitioning(false);
      setStartIndex(0);
    }
  };

  // Swipe handling
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-stone-800 mb-8">
        CONOCE NUESTRAS <span className="text-[#BADF72]">REDES</span>
      </h2>

      <div className="relative flex items-center overflow-hidden">
        {/* Prev Button */}
        <button
          onClick={goPrev}
          className="absolute left-2 md:left-4 z-10 p-2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full transition"
          aria-label="Reel anterior"
        >
          <FaChevronLeft size={24} className="text-stone-800" />
        </button>

        {/* Carousel Track with touch events */}
        <div
          className="overflow-hidden flex-1 mx-4"
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
                className="cursor-pointer px-2"
                style={{ flex: `0 0 ${100 / itemsPerView}%` }}
                onClick={() => window.open(reel.igProfile, '_blank')}
              >
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={reel.thumbnail}
                    alt={`Reel ${reel.id} de @${reel.username}`}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-white opacity-75"
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={goNext}
          className="absolute right-2 md:right-4 z-10 p-2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full transition"
          aria-label="Siguiente reel"
        >
          <FaChevronRight size={24} className="text-stone-800" />
        </button>
      </div>
    </div>
  );
}
