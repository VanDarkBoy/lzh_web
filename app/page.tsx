'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatAPP from './components/WhatAPP';
import FloatingCountryFlags from './components/FloatingCountryFlags';

const CATEGORY_GRADIENTS = [
    'from-blue-100 to-blue-200',
    'from-green-100 to-green-200',
    'from-purple-100 to-purple-200',
    'from-orange-100 to-orange-200',
];

type Category = {
    id: number;
    name: string;
    description: string;
    image: string
};

interface ProjectItem {
    id: number;
    title: string;
    description: string;
    location: string;
    caseTime: string;
    image: string;
    categoryName: string;
    stats: string;
    size: string;
}

type ButtonLink = {
    text: string;
};

type FeatureItem = {
    title: string;
    description: string;
    icon?: string;
    containerClass?: string;
    iconClass?: string;
};

type HomeContent = {
    heroTitle: string;
    heroHighlight: string;
    backgroundImage: string;
    heroDescription: string;
    heroButtons: {
        primary: ButtonLink;
        secondary: ButtonLink;
    };
    features: FeatureItem[];
    categoriesTitle: string;
    categoriesDescription: string;
    categoryCtaText: string;
    projectsTitle: string;
    projectsDescription: string;
    projectsButtonText: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtons: {
        primary: ButtonLink;
        secondary: ButtonLink;
    };
};

const DEFAULT_HOME_CONTENT: HomeContent = {
    heroTitle: '不仅是电池',
    heroHighlight: '而是智慧能源',
    backgroundImage: 'https://lithiumvalley.com/images/20251105_021624_98c8a942164a.jpg',
    heroDescription:
        '锂智慧提供高安全、模块化的锂电池储能系统，涵盖住宅与商业应用，助力绿色能源与可持续发展',
    heroButtons: {
        primary: {text: '探索产品'},
        secondary: {text: '立即联系'},
    },
    features: [
        {
            title: '可靠',
            description: '99.9%系统可靠性',
            icon: 'ri-shield-check-line',
            containerClass: 'bg-green-500/20',
            iconClass: 'text-green-400',
        },
        {
            title: '安全',
            description: '多重安全防护',
            icon: 'ri-lock-line',
            containerClass: 'bg-blue-500/20',
            iconClass: 'text-blue-400',
        },
        {
            title: '模块化',
            description: '灵活扩展配置',
            icon: 'ri-stack-line',
            containerClass: 'bg-purple-500/20',
            iconClass: 'text-purple-400',
        },
        {
            title: '绿色',
            description: '环保可持续',
            icon: 'ri-leaf-line',
            containerClass: 'bg-green-500/20',
            iconClass: 'text-green-400',
        },
    ],
    categoriesTitle: '产品分类',
    categoriesDescription: '为不同应用场景提供专业的储能解决方案，满足从家庭到工业的全方位需求',
    categoryCtaText: '了解更多',
    projectsTitle: '成功案例',
    projectsDescription: '全球范围内的成功项目，见证我们的专业实力与卓越品质',
    projectsButtonText: '查看更多案例',
    ctaTitle: '准备开始您的储能之旅？',
    ctaDescription: '我们的专业团队将为您提供一对一咨询服务，制定最适合您需求的储能解决方案',
    ctaButtons: {
        primary: {text: '立即联系'},
        secondary: {text: '下载资料'},
    },
};

const mergeHomeContent = (base: HomeContent, update: Partial<HomeContent>): HomeContent => {
    const mergeButton = (baseButton: ButtonLink, updateButton?: Partial<ButtonLink>): ButtonLink => ({
        ...baseButton,
        ...(updateButton ?? {}),
    });

    const mergedHeroButtons = {
        primary: mergeButton(base.heroButtons.primary, update.heroButtons?.primary),
        secondary: mergeButton(base.heroButtons.secondary, update.heroButtons?.secondary),
    };

    const mergedFeatures = update.features
        ? update.features.map((feature) => ({
            title: feature.title,
            description: feature.description,
            icon: feature.icon,
            containerClass: feature.containerClass,
            iconClass: feature.iconClass,
        }))
        : base.features;

    const mergedCtaButtons = {
        primary: mergeButton(base.ctaButtons.primary, update.ctaButtons?.primary),
        secondary: mergeButton(base.ctaButtons.secondary, update.ctaButtons?.secondary),
    };

    return {
        ...base,
        ...update,
        heroButtons: mergedHeroButtons,
        features: mergedFeatures,
        ctaButtons: mergedCtaButtons,
    };
};

export default function Home() {
    const [scrollY, setScrollY] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [categoriesError, setCategoriesError] = useState<string | null>(null);
    const [projects, setProjects] = useState<ProjectItem[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const [projectsError, setProjectsError] = useState<string | null>(null);
    const [homeContent, setHomeContent] = useState<HomeContent>(DEFAULT_HOME_CONTENT);
    const [isLoadingHomeContent, setIsLoadingHomeContent] = useState(true);
    const [homeContentError, setHomeContentError] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/getCategoriesHome`);
                if (!response.ok) {
                    throw new Error('Failed to get product classification');
                }
                const data: Category[] = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch home categories:', error);
                setCategoriesError('The product category cannot be loaded for now, please try again later');
            } finally {
                setIsLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchHomeContent = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/homeContent`);
                if (!response.ok) {
                    throw new Error('Failed to fetch home content');
                }
                const data: Partial<HomeContent> = await response.json();
                setHomeContent((prev) => mergeHomeContent(prev, data));
            } catch (error) {
                console.error('Failed to fetch home content:', error);
                setHomeContentError('The homepage content is temporarily unable to load, so please try again later');
            } finally {
                setIsLoadingHomeContent(false);
            }
        };

        fetchHomeContent();
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/getAllProductCaseHome`);
                if (!response.ok) {
                    throw new Error('Get success stories failed');
                }
                const data: ProjectItem[] = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Failed to fetch home projects:', error);
                setProjectsError('The success story cannot be loaded for now, please try again later');
            } finally {
                setIsLoadingProjects(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header/>
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
                         style={{
                             backgroundImage: `url(${homeContent.backgroundImage})`,
                             backgroundSize: 'cover',
                             backgroundPosition: 'center',
                             backgroundAttachment: 'fixed'
                         }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        {!isLoadingHomeContent && homeContentError && (
                            <div
                                className="mb-6 inline-block rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-100">
                                {homeContentError}
                            </div>
                        )}
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                                {homeContent.heroTitle}
                                <br/>
                                <span className="text-green-400">{homeContent.heroHighlight}</span>
                            </h1>
                            <p className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed max-w-3xl mx-auto">
                                {homeContent.heroDescription}
                            </p>

                            {/* 核心亮点 */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                                {homeContent.features.map((feature, index) => {
                                    const defaultFeature = DEFAULT_HOME_CONTENT.features[index % DEFAULT_HOME_CONTENT.features.length];
                                    const containerClass = feature.containerClass ?? defaultFeature?.containerClass ?? 'bg-green-500/20';
                                    const iconClass = feature.iconClass ?? defaultFeature?.iconClass ?? 'text-green-400';

                                    return (
                                        <div key={`${feature.title}-${index}`} className="text-center">
                                            <div
                                                className={`w-16 h-16 ${containerClass} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                                <i className={`${feature.icon ?? defaultFeature?.icon ?? 'ri-shield-check-line'} ${iconClass} text-2xl`}></i>
                                            </div>
                                            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                            <p className="text-sm text-gray-300">{feature.description}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/products">
                                    <button
                                        className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold cursor-pointer whitespace-nowrap">
                                        {homeContent.heroButtons.primary.text}
                                    </button>
                                </Link>
                                <Link href="/get-started">
                                    <button
                                        className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors text-lg font-semibold cursor-pointer whitespace-nowrap">
                                        {homeContent.heroButtons.secondary.text}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 产品类别入口 */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">{homeContent.categoriesTitle}</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                {homeContent.categoriesDescription}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-product-shop>
                            {isLoadingCategories && (
                                <div className="col-span-full text-center text-gray-500">Loading Product
                                    Categories...</div>
                            )}
                            {categoriesError && !isLoadingCategories && (
                                <div className="col-span-full text-center text-red-500">{categoriesError}</div>
                            )}
                            {!isLoadingCategories && !categoriesError && categories.length === 0 && (
                                <div className="col-span-full text-center text-gray-500">There is no product
                                    classification</div>
                            )}
                            {categories.map((category, index) => {
                                const gradientClass = CATEGORY_GRADIENTS[index % CATEGORY_GRADIENTS.length];

                                return (
                                    <Link key={category.id} href={`/products?category=${category.id}`}
                                          className="group">
                                        <div
                                            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                                            <div
                                                className={`h-48 bg-gradient-to-br ${gradientClass} rounded-lg mb-6 overflow-hidden`}>
                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className="w-full h-full object-cover object-top"
                                                />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">{category.name}</h3>
                                            <p className="text-gray-600 mb-4">{category.description}</p>
                                            <div className="flex items-center text-green-600 font-semibold">
                                                {homeContent.categoryCtaText} <i
                                                className="ri-arrow-right-line ml-2 w-4 h-4 flex items-center justify-center"></i>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 成功案例展示 */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">{homeContent.projectsTitle}</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                {homeContent.projectsDescription}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {isLoadingProjects && (
                                <div className="col-span-full text-center text-gray-500">Loading success
                                    stories...</div>
                            )}
                            {projectsError && !isLoadingProjects && (
                                <div className="col-span-full text-center text-red-500">{projectsError}</div>
                            )}
                            {!isLoadingProjects && !projectsError && projects.length === 0 && (
                                <div className="col-span-full text-center text-gray-500">There are no cases</div>
                            )}
                            {projects.map((project) => (
                                <div key={project.id} className="group cursor-pointer">
                                    <div className="relative overflow-hidden rounded-xl mb-6">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-48 object-cover object-top transform group-hover:scale-105 transition-transform duration-300"
                                        />

                                        <div className="absolute top-3 left-3">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {project.categoryName}
                      </span>
                                        </div>

                                        <div className="absolute top-3 right-3">
                                            <span
                                                className="bg-black/70 text-white px-2 py-1 rounded text-sm">{project.caseTime}</span>
                                        </div>

                                        <div
                                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                            <div className="flex items-center text-white text-sm mb-1">
                                                <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center mr-1"></i>
                                                {project.location}
                                            </div>
                                            <div className="flex items-center text-white text-sm">
                                                <i className="ri-battery-line w-4 h-4 flex items-center justify-center mr-1"></i>
                                                {project.size}
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                                    <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                                    <div className="text-green-600 font-semibold text-sm">{project.stats}</div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link href="/projects">
                                <button
                                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap">
                                    {homeContent.projectsButtonText}
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-bold text-white mb-6">{homeContent.ctaTitle}</h2>
                        <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
                            {homeContent.ctaDescription}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/get-started">
                                <button
                                    className="px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold cursor-pointer whitespace-nowrap">
                                    {homeContent.ctaButtons.primary.text}
                                </button>
                            </Link>
                            <Link href="/download">
                                <button
                                    className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-600 transition-colors text-lg font-semibold cursor-pointer whitespace-nowrap">
                                    {homeContent.ctaButtons.secondary.text}
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
            <WhatAPP />
            <FloatingCountryFlags />
        </div>
    );
}
