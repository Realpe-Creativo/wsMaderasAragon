// pages/fences.tsx

import React, { useState } from 'react';
import ContactUsButton from '@/components/ui/contactUsButton';
import GuaranteeStatsSlider from '@/components/ui/GuaranteeStats';
import ThreeDModel from '@/components/ui/ThreeDModel';

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const Fences: React.FC = () => {
  const collageImages = [
    '/img/livestock/postesRollizos/fences.jpg',
    '/img/livestock/postesRollizos/fences.jpg',
    '/img/livestock/postesRollizos/fences.jpg',
    '/img/livestock/postesRollizos/fences.jpg',
    '/img/livestock/postesRollizos/fences.jpg',
    '/img/livestock/postesRollizos/fences.jpg',
    '/img/livestock/postesRollizos/fences.jpg',
    '/img/livestock/postesRollizos/fences.jpg',
    '/img/livestock/postesRollizos/fences.jpg',
    '/img/livestock/postesRollizos/fences.jpg',
    '/img/livestock/postesRollizos/fences.jpg',
    '/img/livestock/postesRollizos/fences.jpg',
  ];

  const shuffled = React.useMemo(() => shuffleArray(collageImages), []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative max-w-3xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar (X) */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-red-400 focus:outline-none"
              aria-label="Cerrar"
            >
              &times;
            </button>

            {/* Imagen */}
            <img
              src={selectedImage}
              alt="Imagen ampliada"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      )}

      {/* Sección principal */}
      <div className="mt-16 max-w-screen-xl mx-auto px-8 py-14">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-12">
          POSTES ROLLIZOS
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* <img
            src="/img/livestock/postesRollizos/fences.jpg"
            alt="Postes Rollizos"
            className="w-full max-w-lg md:w-3/4 md:max-w-2xl h-auto object-contain rounded-lg shadow-lg"
          /> */}
          <div className="w-full max-w-lg md:w-3/4 md:max-w-2xl h-[500px] object-contain rounded-lg shadow-lg">
            <ThreeDModel />
          </div>
          <div className="w-full md:w-2/4 text-gray-700 text-lg md:text-xl leading-relaxed">
            <p className="text-center md:text-left">
              Los postes rollizos son ideales para cercas rurales de bajo costo...
            </p>
            <div className="mt-6 flex justify-center">
              <ContactUsButton>Contáctanos</ContactUsButton>
            </div>
          </div>
        </div>
      </div>

      {/* Sección: USOS RECOMENDADOS */}
      <div className="mt-20 max-w-screen-xl mx-auto px-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-left mb-4">
          USOS RECOMENDADOS
        </h3>
        <p className="text-gray-700 text-lg md:text-xl mb-8">
          Ideales para delimitar pastizales...
        </p>
      </div>

      <div className="w-full h-60 md:h-100 overflow-hidden">
        <img
          src="/img/livestock/postesRollizos/fences.jpg"
          alt="Usos recomendados"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-10 max-w-screen-xl mx-auto px-8">
        <p className="text-gray-700 text-lg md:text-xl mb-8 text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Recusandae illum sapiente repellendus hic quasi! Dolor est dignissimos inventore,
          quia, ipsa quae molestias dolorum tempora quasi culpa sint, eos aliquam labore!
        </p>
      </div>

      <div className="w-full h-60 md:h-100 overflow-hidden">
        <img
          src="/img/livestock/postesRollizos/ventajas_producto.jpg"
          alt="Ventajas"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-20 max-w-screen-xl mx-auto px-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-right mb-4">
          POR QUE ELEGIRNOS?
        </h3>
        <p className="text-gray-700 text-lg md:text-xl mb-8">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Recusandae illum sapiente repellendus hic quasi! Dolor est dignissimos inventore,
          quia, ipsa quae molestias dolorum tempora quasi culpa sint, eos aliquam labore!
        </p>
      </div>

      <div className="bg-stone-100 py-1 px-1">
        <div className="max-w-6xl mx-auto">
          <GuaranteeStatsSlider />
        </div>
      </div>

      {/* COLLAGE */}
      <div className="mt-12 max-w-screen-xl mx-auto px-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          GALERÍA DE IMAGENES
        </h3>

        <div className="grid grid-cols-3 grid-rows-3 gap-0">
          {shuffled.slice(0, 10).map((img, index) => (
            <div
              key={index}
              className={`aspect-square overflow-hidden ${index === 0 ? 'col-span-2' : index === 6 ? 'col-span-2' : ''
                }`}
            >
              <img
                src={img}
                alt={`Galería ${index + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => handleImageClick(img)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sección: Cotización */}
      <div className="mt-16 mb-28 max-w-screen-md mx-auto px-8 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">
          ¿QUIERES COTIZAR?
        </h3>
        <p className="text-gray-700 text-lg md:text-xl mb-6">
          Contáctanos para recibir una cotización personalizada para tu proyecto.
        </p>
        <ContactUsButton>COTIZAR</ContactUsButton>
      </div>

    </>
  );
};

export default Fences;
