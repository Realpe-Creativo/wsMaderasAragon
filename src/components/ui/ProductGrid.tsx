// components/ProductGrid.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { LuArrowRight } from 'react-icons/lu';

export interface SubProduct {
  label: string;
  href: string;
}

export interface ProductItem {
  image: string;
  title: string;
  subtitle?: string;
  products: SubProduct[];
}

export interface ProductGridProps {
  items: ProductItem[];
  gridClassName?: string;
  cardClassName?: string;
  imageClassName?: string;
  overlayClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  buttonsContainerClassName?: string;
  buttonClassName?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  items,
  gridClassName             = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0',
  cardClassName             = 'relative group overflow-hidden h-[700px] cursor-pointer',
  imageClassName            = 'w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out',
  overlayClassName          = 'absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center p-4 text-white',
  titleClassName            = 'font-bold text-2xl md:text-3xl',
  subtitleClassName         = 'mt-2 text-lg md:text-xl font-semibold tracking-wide',
  buttonsContainerClassName = 'mt-4 flex flex-col space-y-2 items-start',
  buttonClassName           = 'flex w-45 bg-stone-600 h-fit transition-all px-3 py-2 items-center rounded-3xl justify-center text-stone-200 text-lg hover:drop-shadow-md hover:bg-stone-800 hover:text-white',
}) => {
  const spanClass = items.length === 2 ? 'lg:col-span-2' : '';

  return (
    <div className={gridClassName}>
      {items.map((item, idx) => (
        <div key={idx} className={`${cardClassName} ${spanClass}`}>
          <img
            src={item.image}
            alt={item.title}
            className={imageClassName}
          />

          <div className={overlayClassName}>
            <h3 className={titleClassName}>{item.title}</h3>
            {item.subtitle && (
              <p className={subtitleClassName}>{item.subtitle}</p>
            )}

            <div className={buttonsContainerClassName}>
              {item.products.map((p, i) => (
                <Link
                  key={i}
                  to={p.href}
                  className={buttonClassName}
                >
                  <LuArrowRight className="m-1" />
                  <span>{p.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
