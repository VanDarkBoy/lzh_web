'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link';

type NavItem = {
    href: string;
    label: string;
    mobileOnly?: boolean;
    desktopOnly?: boolean;
    isCta?: boolean;
};

const DEFAULT_NAV_ITEMS: NavItem[] = [
    {href: '/', label: '首页'},
    {href: '/about', label: '关于我们'},
    {href: '/products', label: '产品中心'},
    {href: '/product-list', label: '产品列表'},
    {href: '/download', label: '下载中心'},
    {href: '/projects', label: '应用案例'},
    {href: '/blog', label: '博客'},
    {href: '/get-started', label: '获取报价',isCta:true}
];

const DEFAULT_LOGO_URL =
    'https://lithiumvalley.com/images/20251105_060653_a821c0daf6bf.jpg';

type HeaderContentResponse = {
    logoUrl: string;
};

const desktopLinkClass =
    'text-gray-600 hover:text-blue-600 transition-colors duration-300 cursor-pointer rounded-md';
const desktopCTALinkClass =
    'bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 transition-colors duration-300 cursor-pointer whitespace-nowrap rounded-xl';
const mobileLinkClass =
    'block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors cursor-pointer';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [navItems, setNavItems] = useState<NavItem[]>(DEFAULT_NAV_ITEMS);
    const [logoUrl, setLogoUrl] = useState<string>(DEFAULT_LOGO_URL);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleDropdownToggle = (menu: string) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    const handleMouseEnter = (menu: string) => {
        setOpenDropdown(menu);
    };

    const handleMouseLeave = () => {
        setTimeout(() => {
            const hoverElement = document.querySelector('.dropdown-container:hover, .dropdown-menu:hover');
            if (!hoverElement) {
                setOpenDropdown(null);
            }
        }, 100);
    };

    useEffect(() => {
        const controller = new AbortController();

        const loadNavItems = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE}/api/header`,
                    {signal: controller.signal}
                );

                if (!response.ok) {
                    throw new Error(`Failed to load header data: ${response.status}`);
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    setNavItems(data);
                } else if (Array.isArray(data?.navItems)) {
                    setNavItems(data.navItems);
                }
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    console.error('Error fetching header navigation items:', error);
                }
            }
        };

        loadNavItems();

        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        const loadHeaderLogo = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE}/api/headerContent`,
                    {signal: controller.signal}
                );

                if (!response.ok) {
                    throw new Error(`Failed to load header logo: ${response.status}`);
                }

                const data: HeaderContentResponse = await response.json();

                setLogoUrl(data.logoUrl);
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    console.error('Error fetching header logo:', error);
                }
            }
        };

        loadHeaderLogo();

        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.dropdown-container') && !target.closest('.dropdown-menu')) {
                setOpenDropdown(null);
            }
        };

        if (openDropdown) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [openDropdown]);

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    return (
        <>
            {openDropdown && (
                <div
                    className="fixed top-0 left-0 right-0 bg-white shadow-lg transition-all duration-300 z-40"
                    style={{
                        height: openDropdown === 'products' ? '400px' : '240px'
                    }}
                />
            )}

            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                openDropdown ? 'bg-transparent' : 'bg-white/95 backdrop-blur-sm shadow-sm'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <img
                                    src={logoUrl}
                                    alt="Lithium Valley Logo"
                                    className="h-32 sm:h-20 w-32 bg-transparent mix-blend-multiply"
                                />
                            </Link>
                        </div>

                        <nav className="hidden md:flex items-center space-x-8">
                            {navItems.filter((item) => !item.mobileOnly).map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={item.isCta ? desktopCTALinkClass : desktopLinkClass}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        <button
                            onClick={toggleMenu}
                            className="lg:hidden p-2 text-gray-700 hover:text-green-600 transition-colors cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl w-6 h-6 flex items-center justify-center`}></i>
                        </button>
                    </div>

                    <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
                        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                        <nav className="py-4 space-y-1 border-t border-gray-200">
                            {navItems.filter((item) => !item.desktopOnly).map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={
                                        item.isCta
                                            ? `${mobileLinkClass} bg-blue-600 text-white hover:bg-blue-700 hover:text-white`
                                            : mobileLinkClass
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}
