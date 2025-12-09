"use client";

import Link from 'next/link';
import {useEffect, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingCountryFlags from '../components/FloatingCountryFlags';
import WhatAPP from '../components/WhatAPP';
import {blogList as defaultBlogList} from './data';
import type {BlogListItem} from './types';

const dateFormatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

export default function BlogListPage() {
    const [scrollY, setScrollY] = useState(0);
    const [blogList, setBlogList] = useState<BlogListItem[]>(() => defaultBlogList);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        const fetchBlogList = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/blogList`, {
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error('无法获取博客列表');
                }

                const data = (await response.json()) as BlogListItem[];
                setBlogList(data);
            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') {
                    return;
                }
                setError('List loading fails, showing default content');
                setBlogList(defaultBlogList);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogList();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col pt-24">
                <section className="relative h-[90vh] min-h-[560px] w-full overflow-hidden flex items-center justify-center">
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: 'url(https://www.lithiumvalley.com/wp-content/uploads/2024/10/Blog-Banner-1.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundAttachment: 'fixed',
                            transform: `translateY(${scrollY * 0.4}px)`,
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60 z-10" />
                    <div className="relative z-20 text-center max-w-4xl mx-auto px-6 sm:px-8 space-y-6">
                        <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] text-white/80">Blog</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
                            探索锂电行业前沿资讯
                        </h1>
                        <p className="text-base md:text-lg text-white/80 leading-relaxed">
                            关注最新技术、市场趋势与成功案例，获取关于新能源储能解决方案的深度洞见。
                        </p>
                    </div>
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
                        <div className="animate-bounce text-white text-xl">
                            <i className="ri-arrow-down-line" />
                        </div>
                    </div>
                </section>
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-16">
                    {loading && (
                        <div className="text-center text-sm text-gray-500 mb-4">Listloading...</div>
                    )}
                    {error && (
                        <div className="text-center text-sm text-red-500 mb-4">{error}</div>
                    )}

                    <div className="grid gap-12 md:grid-cols-2">
                        {blogList.map((blog) => (
                            <Link
                                key={blog.id}
                                href={`/blog-detail?id=${blog.id}`}
                                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                            >
                                <div className="bg-gray-100 aspect-[4/3] overflow-hidden flex items-center justify-center">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="max-h-full w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6 space-y-3">
                                    <div className="text-sm text-blue-600 font-medium">
                                        {dateFormatter.format(new Date(blog.pushDate))}
                                    </div>
                                    <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {blog.title}
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed max-h-16 overflow-hidden">
                                        {blog.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
            <WhatAPP />
            <FloatingCountryFlags />
        </div>
    );
}
