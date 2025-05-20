// pages/categories.tsx

import GalleryGrid from '@/components/ui/GalleryGridProps';
import GuaranteeStatsSlider from '@/components/ui/GuaranteeStats';
import React from 'react';

interface CategoryItem {
    image: string;
    title: string;
    subtitle: string
    href: string;
}

const items: CategoryItem[] = [
    {
        title: "COLUMNAS Y VIGAS",
        subtitle: "Resistencia, naturalidad y adaptabilidad para tus estructuras campestres.",
        image: "/img/structural/column.jpg",
        href: "/products/columnas&vigas",
    },
    {
        title: "ACABADOS",
        subtitle: "Belleza natural, suavidad al tacto y precisión para tus proyectos especiales.",
        image: "/img/structural/finishes.jpg",
        href: "/products/acabadosPersonalizados",
    },
];

const CategoriesPage: React.FC = () => {
    return (
        <>
        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2">
          <GalleryGrid items={items} />
        </div>

        <div className="bg-[#F8F7DD] py-1 px-1">
          <div className="max-w-6xl mx-auto">
            <GuaranteeStatsSlider animate={false}/>
          </div>
        </div>
      </>
        
    );
};

export default CategoriesPage;
