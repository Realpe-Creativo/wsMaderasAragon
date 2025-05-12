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
        title: "GANADERIA",
        subtitle: "Postes y rollizos resistentes para cercas, corrales y potreros. Aguantan clima, peso y tiempo",
        image: "/img/categories/corrales.jpg",
        href: "/categories/livestock",
    },
    {
        title: "ESTRUCTURAL",
        subtitle: "Madera técnica para pérgolas, cubiertas, estrucuturas y construcciones campestres",
        image: "/img/categories/strucutural.jpg",
        href: "/categories/structural",
    },
    {
        title: "JARDINERÍA Y ACABADOS",
        subtitle: "No hacemos los muebles, pero si vendemos la madera lista, cortada y tratada como la necesites para jardines, terrazas o espacios al aire libre",
        image: "/img/categories/garden.jpg",
        href: "/",
    },
    {
        title: "LEÑA",
        subtitle: "Nuestro equipo transforma la madera con conocimiento y respeto",
        image: "/img/categories/firewood.jpg",
        href: "/",
    },
];

const Categories: React.FC = () => {
    return (
        <>
            <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2">
                <GalleryGrid items={items} />
            </div>

            <div className="bg-stone-100 py-1 px-1">
                <div className="max-w-6xl mx-auto">
                    <GuaranteeStatsSlider />
                </div>
            </div>
        </>

    );
};

export default Categories;
