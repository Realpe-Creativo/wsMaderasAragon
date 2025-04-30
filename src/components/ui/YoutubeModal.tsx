import { useState } from "react";
import { FaPlay } from "react-icons/fa";

const YoutubeModal = ({ videoId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <>
      {/* Miniatura sin zoom */}
      <div
        className="relative cursor-pointer w-full"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={thumbnailUrl}
          alt="YouTube thumbnail"
          className="w-full h-auto max-h-[80vh] object-cover"
        />
        {/* Ícono triangular de Play sin fondo circular */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <FaPlay className="text-white text-[5rem] md:text-[6rem] drop-shadow-lg" />
        </div>
      </div>

      {/* Modal de video */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999]"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full hover:bg-opacity-80"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default YoutubeModal;
