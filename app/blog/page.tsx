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
    const [blogList, setBlogList] = useState<BlogListItem[]>(() => defaultBlogList);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="pt-28 pb-16">
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">


                    {loading && (
                        <div className="text-center text-sm text-gray-500 mb-4">Listloading...</div>
                    )}
                    {error && (
                        <div className="text-center text-sm text-red-500 mb-4">{error}</div>
                    )}

                    <div className="grid gap-8 md:grid-cols-2">
                        {blogList.map((blog) => (
                            <Link
                                key={blog.id}
                                href={`/blog-detail?id=${blog.id}`}
                                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                            >
                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
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
