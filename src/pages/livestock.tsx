// pages/categories.tsx

import React from 'react';
import GuaranteeStatsSlider from '@/components/ui/GuaranteeStats';
import ProductGrid, { ProductItem } from '@/components/ui/ProductGrid';

const items: ProductItem[] = [
  {
    image: '/img/livestock/fences.jpg',
    title: 'CERCAS',
    subtitle: 'Explora nuestras cercas disponibles',
    products: [
      {
        label: 'Poste Aserrado',
        href: '/products/posteAserrado',
      },
      {
        label: 'Poste Cilindrado',
        href: '/products/posteCilindrado',
      },
      {
        label: 'Poste Rollizo',
        href: '/products/posteRollizo',
      },
      // …añade más productos de la categoría “CERCAS”
    ],
  },
  {
    image: '/img/livestock/pens.jpg',
    title: 'CORRALES',
    subtitle: 'Modelos de corrales para tu ganado',
    products: [
      {
        label: 'Postes Ganaderos',
        href: '/products/postesGanaderos',
      },
      {
        label: 'Varetas de Eucalipto',
        href: '/products/varetaEucalipto',
      },
    ],
  },
  
];

const CategoriesPage: React.FC = () => {
  return (
    <>
      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2">
        <ProductGrid items={items} />
      </div>

      <div className="bg-[#F8F7DD] py-1 px-1">
        <div className="max-w-6xl mx-auto">
          <GuaranteeStatsSlider animate={false} />
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
