import { useState } from "react";
import { FaPlay } from "react-icons/fa";

const YoutubePlayer = ({ videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="relative w-full h-[60vh] lg:h-[80vh]">
      {!isPlaying ? (
        <div
          className="w-full h-full cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          <img
            src={thumbnailUrl}
            alt="YouTube thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
            <FaPlay className="text-white text-[5rem] md:text-[6rem] drop-shadow-lg" />
          </div>
        </div>
      ) : (
        <iframe
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default YoutubePlayer;
