// InstagramReelsSlider.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const InstagramReelsSlider = () => {
  const reels = [
    { id: 1, thumbnail: "/thumbs/reels1.jpg", video: "/videos/reels1.mp4", igProfile: "https://www.instagram.com/timothydhalleine/", username: "timothydhalleine" },
    { id: 2, thumbnail: "/thumbs/reels2.jpg", video: "/videos/reels2.mp4", igProfile: "https://www.instagram.com/timothydhalleine/", username: "timothydhalleine" },
    { id: 3, thumbnail: "/thumbs/reels3.jpg", video: "/videos/reels3.mp4", igProfile: "https://www.instagram.com/timothydhalleine/", username: "timothydhalleine" },
    { id: 4, thumbnail: "/thumbs/reels4.jpg", video: "/videos/reels4.mp4", igProfile: "https://www.instagram.com/timothydhalleine/", username: "timothydhalleine" },
    { id: 5, thumbnail: "/thumbs/reels5.jpg", video: "/videos/reels5.mp4", igProfile: "https://www.instagram.com/timothydhalleine/", username: "timothydhalleine" },
    { id: 6, thumbnail: "/thumbs/reels6.jpg", video: "/videos/reels6.mp4", igProfile: "https://www.instagram.com/timothydhalleine/", username: "timothydhalleine" },
  ];

  const length = reels.length;
  const fadeTimeout = useRef<number | null>(null);

  const [startIndex, setStartIndex] = useState(0);
  const [selectedReel, setSelectedReel] = useState<null | typeof reels[0]>(null);
  const [isFading, setIsFading] = useState(false);

  // Determine how many reels to show based on viewport width
  const getItemsPerView = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    return 5;
  };
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Looping helpers
  const goNext = useCallback(() => {
    setStartIndex(prev => (prev + 1) % length);
  }, [length]);
  const goPrev = useCallback(() => {
    setStartIndex(prev => (prev - 1 + length) % length);
  }, [length]);

  // Fade animation wrappers
  const handleNext = useCallback(() => {
    if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    setIsFading(true);
    fadeTimeout.current = window.setTimeout(() => {
      goNext();
      setIsFading(false);
    }, 500);
  }, [goNext]);
  const handlePrev = useCallback(() => {
    if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    setIsFading(true);
    fadeTimeout.current = window.setTimeout(() => {
      goPrev();
      setIsFading(false);
    }, 500);
  }, [goPrev]);

  // Auto-play every 5s
  useEffect(() => {
    const iv = setInterval(handleNext, 5000);
    return () => {
      clearInterval(iv);
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    };
  }, [handleNext]);

  // Build array of visible reels
  const visibleReels = Array.from({ length: itemsPerView }, (_, i) =>
    reels[(startIndex + i) % length]
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      {/* Transparent container—no background, no shadow, no rounded corners */}
      <div className="relative">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-stone-800 mb-12">
          Conoce nuestras{' '}
          <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            redes
          </span>
        </h2>

        <div className="relative flex items-center">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 z-10 p-2 bg-transparent hover:bg-gray-100 rounded-full transition"
            aria-label="Reel anterior"
          >
            <FaChevronLeft size={20} className="text-stone-800" />
          </button>

          {/* Slider Window */}
          <div
            className={`flex overflow-hidden transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
            style={{ margin: '0 2.5rem' /* space for arrows */ }}
          >
            {visibleReels.map((reel) => (
              <div
                key={reel.id}
                className="cursor-pointer p-2"
                style={{ flex: `0 0 ${100 / itemsPerView}%` }}
                onClick={() => setSelectedReel(reel)}
              >
                <div className="relative rounded-3xl overflow-hidden">
                  <img
                    src={reel.thumbnail}
                    alt={`Reel ${reel.id} de @${reel.username}`}
                    className="w-full h-auto object-cover"
                  />
                  {/* Play Icon */}
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

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-10 p-2 bg-transparent hover:bg-gray-100 rounded-full transition"
            aria-label="Siguiente reel"
          >
            <FaChevronRight size={20} className="text-stone-800" />
          </button>
        </div>

        {/* Modal */}
        {selectedReel && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
            onClick={() => setSelectedReel(null)}
          >
            <div
              className="bg-white rounded-md w-full max-w-[400px] max-h-[90vh] flex flex-col overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-3 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-800">{selectedReel.username}</span>
                  <a
                    href={selectedReel.igProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    Ver en Instagram
                  </a>
                </div>
                <button
                  className="text-2xl text-gray-500 hover:text-gray-700 transition"
                  onClick={() => setSelectedReel(null)}
                >
                  &times;
                </button>
              </div>
              <div className="aspect-w-9 aspect-h-16 w-full">
                <video
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                  src={selectedReel.video}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstagramReelsSlider;
