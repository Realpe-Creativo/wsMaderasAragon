// src/pages/ProductPage.tsx
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import rawData from '@/data/products.json';
import ContactUsButton from '@/components/ui/contactUsButton';
import GuaranteeStatsSlider from '@/components/ui/GuaranteeStats';
import ThreeDModel from '@/components/ui/ThreeDModel';
import { Products, Product } from '@/types/Product';

// 1) Casteamos el JSON a nuestro tipo fuerte
const productsData = (rawData as unknown) as Products;

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ProductPage: React.FC = () => {
  // 2) Tipamos inline el parámetro slug
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <div>Falta el parámetro “slug” en la URL.</div>;
  }

  // 3) TS sabe que productsData[slug] es Product | undefined
  const product: Product | undefined = productsData[slug];
  if (!product) {
    return <div>Producto “{slug}” no encontrado.</div>;
  }

  // 4) Destructuramos — collageImages ya es string[]
  const {
    title,
    description,
    collageImages,
    recommendedUses,
    additionalText,
    advantagesImage,
    whyChoose,
  } = product;

  // 5) Shuffle de galerías
  const shuffled = useMemo(() => shuffleArray(collageImages), [collageImages]);

  // 6) Estado y handlers para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const openModal = (img: string) => {
    setSelectedImage(img);
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
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-red-400 focus:outline-none"
              aria-label="Cerrar"
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Imagen ampliada"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      )}

      <div className="mt-16 max-w-screen-xl mx-auto px-8 py-14">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-12">{title}</h1>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full max-w-lg md:w-3/4 md:max-w-2xl h-[500px] object-contain rounded-lg shadow-lg">
            <ThreeDModel />
          </div>
          <div className="w-full md:w-2/4 text-gray-700 text-lg md:text-xl leading-relaxed">
            <p className="text-center md:text-left">{description}</p>
            <div className="mt-6 flex justify-center">
              <ContactUsButton>Contáctanos</ContactUsButton>
            </div>
          </div>
        </div>
      </div>

      {/* USOS RECOMENDADOS */}
      <div className="mt-20 max-w-screen-xl mx-auto px-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-left mb-4">
          {recommendedUses.title}
        </h3>
        <p className="text-gray-700 text-lg md:text-xl mb-8">
          {recommendedUses.text}
        </p>
      </div>
      <div className="w-full h-60 md:h-100 overflow-hidden">
        <img
          src={recommendedUses.image}
          alt={recommendedUses.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* TEXTO ADICIONAL */}
      <div className="mt-10 max-w-screen-xl mx-auto px-8">
        <p className="text-gray-700 text-lg md:text-xl mb-8 text-center">
          {additionalText}
        </p>
      </div>

      {/* VENTAJAS */}
      <div className="w-full h-60 md:h-100 overflow-hidden">
        <img
          src={advantagesImage}
          alt="Ventajas"
          className="w-full h-full object-cover"
        />
      </div>

      {/* POR QUÉ ELEGIRNOS */}
      <div className="mt-20 max-w-screen-xl mx-auto px-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-right mb-4">
          {whyChoose.title}
        </h3>
        <p className="text-gray-700 text-lg md:text-xl mb-8">
          {whyChoose.text}
        </p>
      </div>

      <div className="bg-stone-100 py-1 px-1">
        <div className="max-w-6xl mx-auto">
          <GuaranteeStatsSlider />
        </div>
      </div>

      {/* GALERÍA */}
      <div className="mt-12 max-w-screen-xl mx-auto px-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          GALERÍA DE IMÁGENES
        </h3>
        <div className="grid grid-cols-3 grid-rows-3 gap-0">
          {shuffled.slice(0, 10).map((img, idx) => (
            <div
              key={idx}
              className={`aspect-square overflow-hidden ${
                idx === 0 ? 'col-span-2' : idx === 6 ? 'col-span-2' : ''
              }`}
            >
              <img
                src={img}
                alt={`Galería ${idx + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => openModal(img)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* COTIZACIÓN */}
      <div className="mt-16 mb-28 max-w-screen-md mx-auto px-8 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">¿QUIERES COTIZAR?</h3>
        <p className="text-gray-700 text-lg md:text-xl mb-6">
          Contáctanos para recibir una cotización personalizada para tu proyecto.
        </p>
        <ContactUsButton>COTIZAR</ContactUsButton>
      </div>
    </>
  );
};

export default ProductPage;
