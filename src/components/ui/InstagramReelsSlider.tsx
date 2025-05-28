import { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const InstagramReelsSlider = () => {
  const reels = [
    { id: 1, thumbnail: "/thumbs/reels1.jpg", video: "/videos/reels1.mp4", igProfile: "https://www.instagram.com/maderasaragon/", username: "maderasaragon" },
    { id: 2, thumbnail: "/thumbs/reels2.jpg", video: "/videos/reels2.mp4", igProfile: "https://www.instagram.com/maderasaragon/", username: "maderasaragon" },
    { id: 3, thumbnail: "/thumbs/reels3.jpg", video: "/videos/reels3.mp4", igProfile: "https://www.instagram.com/maderasaragon/", username: "maderasaragon" },
    { id: 4, thumbnail: "/thumbs/reels4.jpg", video: "/videos/reels4.mp4", igProfile: "https://www.instagram.com/maderasaragon/", username: "maderasaragon" },
    { id: 5, thumbnail: "/thumbs/reels5.jpg", video: "/videos/reels5.mp4", igProfile: "https://www.instagram.com/maderasaragon/", username: "maderasaragon" },
    { id: 6, thumbnail: "/thumbs/reels6.jpg", video: "/videos/reels6.mp4", igProfile: "https://www.instagram.com/maderasaragon/", username: "maderasaragon" },
  ];

  const length = reels.length;
  const itemsPerView = 5;

  // Extended reels for infinite loop (duplicate first 5 at end)
  const extendedReels = [...reels, ...reels.slice(0, itemsPerView)];

  const [startIndex, setStartIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const goNext = useCallback(() => {
    setStartIndex(prev => prev + 1);
    setIsTransitioning(true);
  }, []);

  const goPrev = useCallback(() => {
    // simple wrap for prev; jump to last if at 0
    setStartIndex(prev => (prev === 0 ? length - 1 : prev - 1));
    setIsTransitioning(true);
  }, [length]);

  useEffect(() => {
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [goNext]);

  const handleTransitionEnd = () => {
    if (startIndex >= length) {
      // reset without transition
      setIsTransitioning(false);
      setStartIndex(0);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-32">
      <div className="relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-stone-800 mb-12">
          CONOCE NUESTRAS <span className="text-[#BADF72]">REDES</span>
        </h2>

        <div className="relative flex items-center overflow-hidden">
          <button
            onClick={goPrev}
            className="absolute left-0 z-10 p-2 bg-transparent hover:bg-gray-100 rounded-full transition"
            aria-label="Reel anterior"
          >
            <FaChevronLeft size={20} className="text-stone-800" />
          </button>

          <div className="overflow-hidden flex-1 mx-10">
            <div
              className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
              style={{ transform: `translateX(-${startIndex * (100 / itemsPerView)}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedReels.map((reel, idx) => (
                <div
                  key={`${reel.id}-${idx}`}
                  className="cursor-pointer p-2"
                  style={{ flex: `0 0 ${100 / itemsPerView}%` }}
                  onClick={() => {/* open modal logic if needed */}}
                >
                  <div className="relative rounded-3xl overflow-hidden">
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

          <button
            onClick={goNext}
            className="absolute right-0 z-10 p-2 bg-transparent hover:bg-gray-100 rounded-full transition"
            aria-label="Siguiente reel"
          >
            <FaChevronRight size={20} className="text-stone-800" />
          </button>
        </div>

        {/* Modal code omitted for brevity */}
      </div>
    </div>
  );
};

export default InstagramReelsSlider;