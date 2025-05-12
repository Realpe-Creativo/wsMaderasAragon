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
        label: 'Poste Acerrado',
        href: '/categories/livestock/fences',
      },
      {
        label: 'Poste Cilindrado',
        href: '/products/fence/wood',
      },
      {
        label: 'Poste Rollizo',
        href: '/products/fence/wire',
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
        href: '/products/pen/simple',
      },
      {
        label: 'Varetas de Eucalipto',
        href: '/products/pen/premium',
      },
      // …más productos de “CORRALES”
    ],
  },
  // …puedes añadir nuevas categorías siguiendo el mismo esquema
];

const CategoriesPage: React.FC = () => {
  return (
    <>
      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2">
        <ProductGrid items={items} />
      </div>

      <div className="bg-stone-100 py-1 px-1">
        <div className="max-w-6xl mx-auto">
          <GuaranteeStatsSlider animate={false} />
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
