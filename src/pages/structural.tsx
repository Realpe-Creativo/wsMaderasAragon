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
        subtitle: "",
        image: "/img/structural/column.jpg",
        href: "/",
    },
    {
        title: "ACABADOS",
        subtitle: "",
        image: "/img/structural/finishes.jpg",
        href: "/",
    },
];

const CategoriesPage: React.FC = () => {
    return (
        <>
        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2">
          <GalleryGrid items={items} />
        </div>

        <div className="bg-stone-100 py-1 px-1">
          <div className="max-w-6xl mx-auto">
            <GuaranteeStatsSlider animate={false}/>
          </div>
        </div>
      </>
        
    );
};

export default CategoriesPage;
