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
                    throw new Error('Unable to get a list of blogs');
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
            <main className="flex-1 flex flex-col pt-20">
                <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: `url(https://www.lithiumvalley.com/wp-content/uploads/2024/08/Blog.jpeg)`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundAttachment: 'fixed',
                            transform: `translateY(${scrollY * 0.5}px)`,
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10"></div>

                    <div className="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-lg sm:text-xl md:text-2xl uppercase tracking-[0.25em] text-white/80">Blog</p>
                    </div>

                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="animate-bounce">
                            <i className="ri-arrow-down-line text-white text-2xl w-6 h-6 flex items-center justify-center"></i>
                        </div>
                    </div>

                </section>
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pb-16">
                    {loading && (
                        <div className="text-center text-sm text-gray-500 mb-4">Listloading...</div>
                    )}
                    {error && (
                        <div className="text-center text-sm text-red-500 mb-4">{error}</div>
                    )}

                    <div className="grid gap-10 lg:gap-12 lg:grid-cols-2">
                        {blogList.map((blog) => (
                            <Link
                                key={blog.id}
                                href={`/blog-detail?id=${blog.id}`}
                                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                            >
                                <div className="flex flex-col sm:flex-row h-full">
                                    <div className="sm:w-1/2 lg:w-2/5 bg-gray-100 aspect-[3/2] sm:aspect-[4/3] lg:aspect-square overflow-hidden flex-shrink-0">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex-1 p-6 sm:p-8 flex flex-col gap-3 justify-center">
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
                                                Blog
                                            </span>
                                            <span className="text-gray-300">•</span>
                                            <span className="text-blue-600 font-medium">
                                                {dateFormatter.format(new Date(blog.pushDate))}
                                            </span>
                                        </div>
                                        <h2 className="text-xl sm:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {blog.title}
                                        </h2>
                                        <p className="text-gray-600 leading-relaxed max-h-20 overflow-hidden">
                                            {blog.description}
                                        </p>
                                    </div>
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
