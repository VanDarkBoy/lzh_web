'use client';

import {useEffect, useMemo, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatAPP from '../components/WhatAPP';
import FloatingCountryFlags from '../components/FloatingCountryFlags';

type Slide = {
    image: string;
    title: string;
    description: string;
};

type Tags = {
    label: string;
    value: string;
};

type ProductCase = {
    id: string;
    title: string;
    location: string;
    caseTime: string;
    detailDescription: string;
    dealSlide: Slide[];
    dealTags: Tags[];
};


const buildFallbackSlide = (): Slide => ({
    image: 'https://placehold.co/1200x720?text=Project+Case',
    title: '案例实景',
    description: '案例图片暂未提供，敬请期待。',
});

const toText = (value: unknown): string | null => {
    if (typeof value === 'string') {
        return value;
    }

    if (typeof value === 'number') {
        return String(value);
    }

    return null;
};

const normalizeProductCase = (raw: unknown, fallbackId: string): ProductCase => {
    const record = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;

    const slideSource =
        (Array.isArray(record.dealSlide) && record.dealSlide) ||
        (Array.isArray(record.slides) && record.slides) ||
        (Array.isArray(record.images) && record.images) ||
        [];

    const slides: Slide[] = slideSource
        .map((slide, index) => {
            if (!slide || typeof slide !== 'object') {
                return null;
            }

            const slideRecord = slide as Record<string, unknown>;

            const title =
                typeof slideRecord.title === 'string'
                    ? slideRecord.title
                    : typeof slideRecord.name === 'string'
                        ? slideRecord.name
                        : `案例实景 ${index + 1}`;

            const description =
                typeof slideRecord.description === 'string'
                    ? slideRecord.description
                    : typeof slideRecord.remark === 'string'
                        ? slideRecord.remark
                        : '敬请期待更多案例信息。';

            const image =
                typeof slideRecord.image === 'string'
                    ? slideRecord.image
                    : typeof slideRecord.url === 'string'
                        ? slideRecord.url
                        : typeof slideRecord.src === 'string'
                            ? slideRecord.src
                            : '';

            if (!image && !description) {
                return null;
            }

            return {
                image: image || buildFallbackSlide().image,
                title,
                description,
            } satisfies Slide;
        })
        .filter((slide): slide is Slide => Boolean(slide));

    const tagsSource =
        (Array.isArray(record.dealTags) && record.dealTags) ||
        (Array.isArray(record.tags) && record.tags) ||
        [];

    const dealTags: Tags[] = tagsSource
        .map((tag) => {
            if (!tag || typeof tag !== 'object') {
                return null;
            }

            const tagRecord = tag as Record<string, unknown>;
            const label =
                typeof tagRecord.label === 'string'
                    ? tagRecord.label
                    : typeof tagRecord.name === 'string'
                        ? tagRecord.name
                        : '';
            const value =
                typeof tagRecord.value === 'string'
                    ? tagRecord.value
                    : typeof tagRecord.description === 'string'
                        ? tagRecord.description
                        : '';

            if (!label && !value) {
                return null;
            }

            return {label: label || '标签', value: value || '暂无描述'} satisfies Tags;
        })
        .filter((tag): tag is Tags => Boolean(tag));

    return {
        id:
            toText(record.id) ?? fallbackId,
        title: toText(record.title) ?? '未命名案例',
        location: toText(record.location) ?? '未知地点',
        caseTime: toText(record.caseTime) ?? '未知时间',
        detailDescription: toText(record.detailDescription) ?? '敬请期待更多案例详情。',
        dealSlide: slides.length > 0 ? slides : [buildFallbackSlide()],
        dealTags,
    } satisfies ProductCase;
};

export default function ProjectsDetailPage() {
    const searchParams = useSearchParams();

    const productId = useMemo(() => {
        const queryId = searchParams.get('id');

        if (queryId) {
            return queryId;
        }
        return '';
    }, [searchParams]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [productCase, setProductCase] = useState<ProductCase | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const slideCount = productCase?.dealSlide.length ?? 0;
    const currentSlide = useMemo(
        () => (productCase ? productCase.dealSlide[activeIndex] : null),
        [activeIndex, productCase]
    );

    useEffect(() => {
        setActiveIndex(0);
    }, [slideCount]);

    useEffect(() => {
        if (!productId) {
            setError('No valid case found ID');
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        const fetchDetail = async () => {
            try {
                setLoading(true);
                setError(null);

                const apiBase = process.env.NEXT_PUBLIC_API_BASE;

                const response = await fetch(`${apiBase}/api/getProductCaseDetail/${productId}`, {
                    signal: controller.signal,
                    cache: 'no-store',
                });

                if (!response.ok) {
                    throw new Error(`加载案例详情失败：${response.status}`);
                }

                const payload = await response.json();
                const normalized = normalizeProductCase(payload, productId);

                setProductCase(normalized);
            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') {
                    return;
                }
                console.error('Failed to load product case detail', err);
                setError('Failed to load case details, please try again later.');
                setProductCase(null);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();

        return () => controller.abort();
    }, [productId]);

    useEffect(() => {
        if (slideCount < 2) {
            return;
        }

        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slideCount);
        }, 5200);

        return () => clearInterval(timer);
    }, [slideCount]);

    const handlePrev = () => {
        if (slideCount < 2) {
            return;
        }
        setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
    };

    const handleNext = () => {
        if (slideCount < 2) {
            return;
        }
        setActiveIndex((prev) => (prev + 1) % slideCount);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
                <Header/>
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-slate-200 text-lg">Loading case details...</p>
                </main>
                <Footer/>
            </div>
        );
    }

    if (error || !productCase || !currentSlide) {
        return (
            <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
                <Header/>
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <p className="text-xl font-semibold text-white">{error || 'No corresponding case details found yet'}</p>
                        <p className="text-slate-300">Please return to the project list and try again</p>
                    </div>
                </main>
                <Footer/>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
            <Header/>
            <main className="flex-1">
                <section className="px-4 sm:px-6 lg:px-8 pb-16 pt-14 sm:pt-40">
                    <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-5">
                        <div className="lg:col-span-2 space-y-4">
                            <p className="text-sky-300 text-sm font-medium">项目背景</p>
                            <h2 className="text-3xl font-semibold text-white">{productCase.title}</h2>
                            <div className="text-sm text-slate-300 flex flex-wrap gap-x-4">
                                <span>项目地点：{productCase.location}</span>
                                <span>投运时间：{productCase.caseTime}</span>
                            </div>
                            <p className="text-slate-200 leading-relaxed">{productCase.detailDescription}</p>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {productCase.dealTags.map((tag) => (
                                    <div
                                        key={`${tag.label}-${tag.value}`}
                                        className="rounded-xl bg-slate-800/70 border border-white/10 px-4 py-3"
                                    >
                                        <p className="text-sm text-slate-300">{tag.label}</p>
                                        <p className="text-white font-semibold mt-1">{tag.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <div
                                className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-slate-900">
                                <div className="relative h-[420px] sm:h-[460px]">
                                    <img
                                        src={currentSlide.image}
                                        alt={currentSlide.title}
                                        className="h-full w-full object-cover"
                                    />
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"/>
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <p className="text-slate-200 mt-2 max-w-2xl">{currentSlide.description}</p>
                                    </div>
                                    <div className="absolute top-4 right-4 flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={handlePrev}
                                            className="p-2 rounded-full bg-white/15 hover:bg-white/25 transition"
                                            aria-label="上一张"
                                        >
                                            ←
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            className="p-2 rounded-full bg-white/15 hover:bg-white/25 transition"
                                            aria-label="下一张"
                                        >
                                            →
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-slate-900/80 backdrop-blur">
                                    <div className="flex items-center gap-2">
                                        {productCase.dealSlide.map((slide, index) => (
                                            <button
                                                key={`${slide.title}-${index}`}
                                                type="button"
                                                onClick={() => setActiveIndex(index)}
                                                className={`h-2.5 rounded-full transition-all duration-300 ${
                                                    index === activeIndex ? 'bg-sky-400 w-8' : 'bg-white/30 w-2'
                                                }`}
                                                aria-label={`跳转到 ${slide.title}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-slate-300">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
            <WhatAPP/>
            <FloatingCountryFlags/>
        </div>
    );
}
