// components/GalleryGrid.tsx

import React from 'react';
import { Link } from 'react-router-dom';

export interface GridItem {
  image: string;
  title: string;
  subtitle: string;
  href: string;
}

export interface GalleryGridProps {
  /** Elementos a renderizar */
  items: GridItem[];
  /** Clases del grid container */
  gridClassName?: string;
  /** Clases de cada tarjeta/enlace */
  itemClassName?: string;
  /** Clases de la imagen */
  imageClassName?: string;
  /** Clases del overlay */
  overlayClassName?: string;
  /** Clases del título */
  titleClassName?: string;
  /** Clases del subtítulo */
  subtitleClassName?: string;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  gridClassName     = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0',
  itemClassName     = 'relative group overflow-hidden h-[700px] cursor-pointer',
  imageClassName    = 'w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out',
  overlayClassName  = 'absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center p-4 text-white',
  titleClassName    = 'font-bold text-2xl md:text-3xl',
  subtitleClassName = 'mt-2 text-lg md:text-xl font-semibold tracking-wide',
}) => {
  // Si solo hay 2 items, cada uno ocupará 2 de las 4 columnas en lg
  const spanClass = items.length === 2 ? 'lg:col-span-2' : '';

  return (
    <div className={gridClassName}>
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className={`${itemClassName} ${spanClass}`}
        >
          <img
            src={item.image}
            alt={item.title}
            className={imageClassName}
          />
          <div className={overlayClassName}>
            <h3 className={titleClassName}>{item.title}</h3>
            <p className={subtitleClassName}>{item.subtitle}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GalleryGrid;
