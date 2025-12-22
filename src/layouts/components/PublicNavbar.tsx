import React, {useState} from "react";
import {
    LuInstagram,
    LuFacebook,
    LuMenu,
    LuShoppingBag,
    LuNewspaper,
    LuMessageCircle,
    LuInfo
} from "react-icons/lu";
import {Link} from "react-router-dom";
import {useWindowScroll} from "@mantine/hooks";

interface PublicNavbarProps {
    tab: string;
}

interface MenuItem {
    key: string;
    label: string;
    to?: string;
    Icon?: React.ComponentType<{ size?: number }>;
    children?: MenuItem[];
}

const menuItems: MenuItem[] = [
    {
        key: "products",
        label: "Productos",
        Icon: LuShoppingBag,
        to: "/categories",
        children: [
            {
                key: "ganaderia",
                label: "Ganadería",
                children: [
                    {
                        key: "cercas",
                        label: "Cercas",
                        children: [
                            {
                                key: "poste_aserrado",
                                label: "Poste Aserrado",
                                to: "/products/posteAserrado",
                            },
                            {
                                key: "poste_cilindrado",
                                label: "Poste Cilindrado",
                                to: "/products/posteCilindrado",
                            },
                            {
                                key: "poste_rollizo",
                                label: "Poste Rollizo",
                                to: "/products/posteRollizo",
                            },
                        ],
                    },
                    {
                        key: "corrales",
                        label: "Corrales",
                        children: [
                            {
                                key: "poste_ganadero",
                                label: "Poste Ganadero",
                                to: "/products/postesGanaderos",
                            },
                            {
                                key: "vareta_eucalipto",
                                label: "Vareta de Eucalipto",
                                to: "/products/varetaEucalipto",
                            },
                        ],
                    },
                ],
            },
            {
                key: "estructural",
                label: "Estructural",
                children: [
                    {
                        key: "columnas_vigas",
                        label: "Columnas y Vigas",
                        to: "/products/columnas&vigas",
                    },
                    {
                        key: "acabados",
                        label: "Acabados",
                        to: "/products/acabadosPersonalizados",
                    },
                ],
            },
            {key: "jardineria", label: "Jardinería y Acabados", to: "/products/jardineria"},
            {key: "lenna", label: "Leña", to: "/products/lenna"},
        ],
    },
    {key: "know", label: "Conócenos", Icon: LuInfo, to: "/know"},
    {key: "news", label: "Bitácora", Icon: LuNewspaper, to: "/news"},
    {key: "contact", label: "Contáctanos", Icon: LuMessageCircle, to: "/contact"},
];

export default function PublicNavbar({tab}: PublicNavbarProps) {
    const [, scrollTo] = useWindowScroll();
    const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // padding left & right per level
    const indentClasses = [
        "pl-6 pr-6",   // level 0
        "pl-10 pr-10", // level 1
        "pl-14 pr-14", // level 2
        "pl-20 pr-20", // level 3
        "pl-24 pr-24", // level 4
    ];

    // determine active tab
    const isActiveKey = (key: string) =>
        key === "products"
            ? tab === "products" || tab === "categories"
            : tab === key;

    const toggleKey = (key: string) => {
        setOpenKeys(prev => {
            const next = new Set(prev);
            next.has(key) ? next.delete(key) : next.add(key);
            return next;
        });
    };

    const handleLinkClick = (_to?: string) => {
        setIsMobileMenuOpen(false);
        scrollTo({y: 0});
    };

    const renderItems = (items: MenuItem[], level = 0) =>
        items.map(item => {
            const hasChildren = !!item.children?.length;
            const isOpen = openKeys.has(item.key);
            const active = isActiveKey(item.key);
            const padding = indentClasses[level] || indentClasses[indentClasses.length - 1];

            // shared classes
            const base = `${padding} w-full flex items-center py-3 transition-colors`;
            const activeCls = "bg-[#BADF72]/75 text-white";
            const inactiveCls = "text-white hover:bg-[#BADF72] hover:text-[#394930]";

            // choose justify based on children
            const justifyCls = hasChildren ? "justify-between" : "justify-start";

            return (
                <div key={item.key}>
                    {hasChildren ? (
                        <button
                            onClick={() => toggleKey(item.key)}
                            className={`${base} ${justifyCls} ${active ? activeCls : inactiveCls}`}
                        >
              <span className="flex items-center">
                {item.Icon && (
                    <span className="inline-block mr-2">
                    <item.Icon size={18}/>
                  </span>
                )}
                  {item.label}
              </span>
                            <span
                                className={`transform transition-transform duration-300 ease-in-out ${isOpen ? "rotate-90" : ""}`}>
                ▶
              </span>
                        </button>
                    ) : (
                        <Link
                            to={item.to!}
                            onClick={() => handleLinkClick(item.to)}
                            className={`${base} ${justifyCls} ${active ? activeCls : inactiveCls}`}
                        >
                            {item.Icon && (
                                <span className="inline-block mr-2">
                  <item.Icon size={18}/>
                </span>
                            )}
                            {item.label}
                        </Link>
                    )}

                    {hasChildren && (
                        <div
                            className={`bg-[#394930]/90 overflow-hidden transition-[max-height] duration-300 ease-in-out origin-top transform ${
                                isOpen ? "max-h-screen" : "max-h-0"
                            }`}
                        >
                            {renderItems(item.children!, level + 1)}
                        </div>
                    )}
                </div>
            );
        });

    return (
        <div className="fixed w-full z-50">
            {/* Social bar */}
            <div className="flex w-full bg-[#394930] p-2 backdrop-blur-sm">
                <div className="flex w-full justify-end items-center">
                    <a
                        href="https://instagram.com/maderasaragon"
                        target="_blank"
                        className="mx-1 text-white hover:text-purple-500 transition-colors"
                    >
                        <LuInstagram size={20}/>
                    </a>
                    <a
                        href="https://facebook.com/MaderasAragonSAS"
                        target="_blank"
                        className="mx-1 text-white hover:text-blue-500 transition-colors"
                    >
                        <LuFacebook size={20}/>
                    </a>
                </div>
            </div>

            {/* Mobile navbar header */}
            <div className="flex items-center justify-between bg-[#394930]/65 p-3 md:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(o => !o)}
                    className="transition-transform duration-300 ease-in-out"
                >
                    <LuMenu
                        size={24}
                        className={`text-white transform ${isMobileMenuOpen ? "rotate-90" : ""}`}
                    />
                </button>
                <Link
                    to="/"
                    onClick={() => {
                        setIsMobileMenuOpen(false);
                        scrollTo({y: 0});
                    }}
                    className="flex-1 flex justify-center"
                >
                    <img src="/logo-white.png" className="w-12" alt="Logo Maderas Aragón"/>
                </Link>
                <div className="w-6"/>
            </div>

            {/* Mobile dropdown animado */}
            <div
                className={`overflow-hidden transform origin-top transition-[max-height] duration-300 ease-in-out ${
                    isMobileMenuOpen ? "max-h-screen" : "max-h-0"
                }`}
            >
                <nav className="flex flex-col bg-[#394930]/95 md:hidden">
                    {renderItems(menuItems)}
                </nav>
            </div>

            {/* Desktop navbar */}
            <div className="hidden md:flex bg-[#394930]/65">
                <div className="flex w-3/12 ms-16 items-center">
                    <Link
                        to="/"
                        onClick={() => scrollTo({y: 0})}
                        className="flex items-center"
                    >
                        <img
                            src="/logo-white.png"
                            className="w-14 mx-2"
                            alt="Logo Maderas Aragón"
                        />
                        <span className="text-2xl font-title-bold text-white">
              Maderas Aragón
            </span>
                    </Link>
                </div>
                <div className="flex w-6/12 p-3 justify-center">
                    {menuItems.map(({key, to, Icon, label}) => {
                        const active = isActiveKey(key);
                        const activeCls = "bg-[#BADF72]/75 text-white";
                        const inactiveCls =
                            "bg-[#394930] text-stone-200 hover:drop-shadow-md hover:bg-[#BADF72] hover:text-[#394930]";

                        return (
                            <Link
                                key={key}
                                to={to!}
                                onClick={() => scrollTo({y: 0})}
                                className={`flex items-center mx-2 px-2 py-1 rounded-3xl transition-all ${
                                    active ? activeCls : inactiveCls
                                }`}
                            >
                                {Icon && (
                                    <span className="inline-block mr-2">
                    <Icon size={18}/>
                  </span>
                                )}
                                <span className="hidden md:inline">{label}</span>
                            </Link>
                        );
                    })}
                </div>
                <div className="flex w-3/12 justify-end pe-16 items-center">
                    {/* Placeholder for more desktop icons/buttons */}
                </div>
            </div>
        </div>
    );
}
