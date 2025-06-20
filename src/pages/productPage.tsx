// src/pages/ProductPage.tsx
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import rawData from '@/data/products.json';
import ContactUsButton from '@/components/ui/contactUsButton';
import GuaranteeStatsSlider from '@/components/ui/GuaranteeStats';
import ThreeDModel from '@/components/ui/ThreeDModel';
import { Products, Product } from '@/types/Product';
import "./productPage.css"

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
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <div>Falta el parámetro “slug” en la URL.</div>;
  }

  const product: Product | undefined = productsData[slug];
  if (!product) {
    return <div>Producto “{slug}” no encontrado.</div>;
  }

  const {
    title,
    description,
    modelPath,
    mainImage,
    collageImages,
    recommendedUses,
    characteristics,
    additionalText,
    advantages,
    whyChoose,
  } = product;

  const shuffled = useMemo(() => shuffleArray(collageImages), [collageImages]);

  const columns = 3;

  const imagesWithSpan = useMemo(() => {
    const base = shuffled.map((src, idx) => ({
      src,
      span: idx === 0 || idx === 6 ? 2 : 1,
    }));
    const sumSpans = base.reduce((sum, img) => sum + img.span, 0);
    const missingSpans = (columns - (sumSpans % columns)) % columns;
    const padding = base.slice(0, missingSpans).map(img => ({ src: img.src, span: 1 }));
    return [...base, ...padding];
  }, [shuffled, columns]);

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

      <div className="mt-16 bg-white w-full">
        <div className="max-w-screen-xl mx-auto px-8 py-28">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-12" style={{ color: '#394930' }}>{title}</h1>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full max-w-lg md:w-3/4 md:max-w-2xl h-[500px] object-contain rounded-lg shadow-lg">
              {modelPath ? (
                <ThreeDModel modelPath={modelPath} />
              ) : (
                <img
                  src={mainImage}
                  alt={title}
                  className="w-full h-full object-contain rounded-lg shadow-lg"
                />
              )}
            </div>
            <div className="w-full md:w-2/4 text-gray-700 text-lg md:text-xl leading-relaxed">
              <p
                className="text-center md:text-left"
                dangerouslySetInnerHTML={{ __html: description }}
              />
              <div className="mt-6 flex justify-center">
                <ContactUsButton>Contáctanos</ContactUsButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* USOS RECOMENDADOS + GRUPOS */}
      <div className="bg-[#394930] py-12">
        <div className="max-w-screen-xl mx-auto px-8">
          <h3
            className="text-2xl md:text-3xl font-semibold mb-4"
            style={{ color: "white" }}
          >
            {recommendedUses.title}
          </h3>
          <p
            className="text-gray-700 text-lg md:text-xl mb-8"
            style={{ color: "white" }}
          >
            {recommendedUses.text}
          </p>

          {/* Si existen grupos, mapeamos cada uno */}
          {recommendedUses.groups
            ? recommendedUses.groups.map((group, gi) => (
              <div key={gi} className="mb-10">
                {group.title && (
                  <h4
                    className="text-xl md:text-2xl font-medium mb-6"
                    style={{ color: "white" }}
                  >
                    {group.title}
                  </h4>
                )}
                {group.text && (
                  <p
                    className="text-gray-200 text-base md:text-lg mb-4"
                    style={{ color: "white" }}
                  >
                    {group.text}
                  </p>
                )}
                <div
                  className="grid gap-6"
                  style={{
                    gridTemplateColumns: `repeat(${group.columns}, minmax(0,1fr))`
                  }}
                >
                  {group.specs.map((spec, si) => (
                    <p
                      key={si}
                      className="text-gray-100 text-lg md:text-xl text-center"
                      dangerouslySetInnerHTML={{ __html: spec }}
                    />
                  ))}
                </div>
              </div>
            ))
            : (
              <div
                className="grid gap-6"
                style={{
                  gridTemplateColumns: `repeat(${recommendedUses.columns}, minmax(0,1fr))`
                }}
              >
                {recommendedUses.specs!.map((spec, idx) => (
                  <p
                    key={idx}
                    className="text-gray-100 text-lg md:text-xl text-center"
                    dangerouslySetInnerHTML={{ __html: spec }}
                  />
                ))}
              </div>
            )}
        </div>
      </div>

      {/* CARACTERÍSTICAS DEL PRODUCTO */}
      {characteristics && (
        <div className="bg-[#394930] py-5">
          <div className="max-w-screen-xl mx-auto px-8">
            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: `repeat(${characteristics.columns}, minmax(0,1fr))`
              }}
            >
              {characteristics.specs.map((spec, idx) => (
                <p
                  key={idx}
                  className="text-gray-700 text-lg md:text-xl text-center"
                  dangerouslySetInnerHTML={{ __html: spec }}
                  style={{ color: "white" }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TEXTO ADICIONAL*/}
      {additionalText !== null && (
        <div className="bg-[#394930] w-full">
          <div className="max-w-screen-xl mx-auto px-8 py-14">
            <p
              className="text-gray-700 text-lg md:text-xl mb-8 text-center"
              style={{ color: "white" }}
            >
              {additionalText}
            </p>
          </div>
        </div>
      )}


      {/* VENTAJAS DEL PRODUCTO */}
      <div className="bg-[#394930] py-12">
        <div className="max-w-screen-xl mx-auto px-8">
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6" style={{ color: "white" }}>
            VENTAJAS DEL PRODUCTO
          </h3>

          {/* Grid de 5 columnas en escritorio, sin fondo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {advantages.slice(0, 5).map((adv, idx) => (
              <div key={idx} className="p-4 text-center">
                <p className="text-gray-700 text-lg md:text-xl" style={{ color: "white" }}>
                  {adv}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POR QUÉ ELEGIRNOS */}

      <div className="bg-[#F8F7DD] w-full">
        <div className="max-w-screen-xl mx-auto px-8 py-14">
          <h3 className="text-2xl md:text-3xl font-semibold text-right mb-4">
            {whyChoose.title}
          </h3>
          <p
            className="text-gray-700 text-lg md:text-xl"
            dangerouslySetInnerHTML={{ __html: whyChoose.text }}
          />
        </div>
      </div>

      <div className=" px-1 bg-[#F8F7DD]">
        <div className="max-w-6xl mx-auto">
          <GuaranteeStatsSlider className="py-0" />
        </div>
      </div>

      {/* GALERÍA */}
      <div className="bg-[#394930] w-full">
        <div className="max-w-screen-xl mx-auto px-8 py-14">
          <h3
            className="text-2xl md:text-3xl font-semibold text-center mb-6"
            style={{ color: "white" }}
          >
            GALERÍA DE IMÁGENES
          </h3>
          <div
            className="grid gap-0 grid-flow-row-dense"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {imagesWithSpan.map(({ src, span }, idx) => (
              <div
                key={idx}
                className={`aspect-square overflow-hidden ${span === 2 ? "col-span-2" : ""}`}
              >
                <img
                  src={src}
                  alt={`Galería ${idx + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => openModal(src)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COTIZACIÓN */}
      <div className="w-full bg-[#F8F7DD]">
        <div className="max-w-screen-md mx-auto px-8 py-16 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">
            ¿QUIERES COTIZAR?
          </h3>
          <p className="text-gray-700 text-lg md:text-xl mb-6">
            Contáctanos para recibir una cotización personalizada para tu proyecto.
          </p>
          <ContactUsButton>COTIZAR</ContactUsButton>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
