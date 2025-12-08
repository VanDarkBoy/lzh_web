'use client';

import {useEffect, useMemo, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingCountryFlags from '../components/FloatingCountryFlags';
import WhatAPP from '../components/WhatAPP';
import type {BlogDetail} from '../blog/types';

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

export default function BlogDetailPage() {
    const searchParams = useSearchParams();

    const blogId = useMemo(() => searchParams.get('id') ?? '', [searchParams]);

    const [blog, setBlog] = useState<BlogDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!blogId) {
            setError('未找到有效的文章 ID');
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        const fetchBlogDetail = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/blog/${blogId}`, {
                    cache: 'no-store',
                    signal: controller.signal
                });

                if (response.status === 404) {
                    throw new Error('未找到对应的文章');
                }

                if (!response.ok) {
                    throw new Error('获取文章详情失败');
                }

                const payload: BlogDetail = await response.json();
                setBlog(payload);
            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') {
                    return;
                }
                console.error('Failed to fetch blog detail', err);
                setError('文章详情加载失败，请稍后再试。');
                setBlog(null);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogDetail();

        return () => controller.abort();
    }, [blogId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="pt-28 pb-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
                        正在加载文章详情...
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="pt-28 pb-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                        <p className="text-xl font-semibold text-gray-900">{error || '未找到对应的文章详情'}</p>
                        <p className="text-gray-600">请返回博客列表后重试。</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="pt-28 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6 mb-10">
                        <div className="text-sm text-blue-600 font-medium">
                            {dateFormatter.format(new Date(blog.pushDate))}
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 leading-tight">{blog.title}</h1>
                        <p className="text-gray-600 text-lg">{blog.description}</p>
                    </div>

                    <div className="rounded-3xl overflow-hidden shadow-lg mb-10">
                        <img src={blog.image} alt={blog.title} className="w-full h-[420px] object-cover" />
                    </div>

                    <article
                        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700"
                        dangerouslySetInnerHTML={{__html: blog.content}}
                    />
                </div>
            </main>
            <Footer />
            <WhatAPP />
            <FloatingCountryFlags />
        </div>
    );
}
