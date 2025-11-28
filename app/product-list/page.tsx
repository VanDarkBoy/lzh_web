'use client';

import {useEffect, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatAPP from '../components/WhatAPP';
import FloatingCountryFlags from '../components/FloatingCountryFlags';
import ProductListHero from './ProductListHero';
import ProductGrid from './ProductGrid';
import {ProductListContent, defaultProductListContent} from './types';

export default function ProductListPage() {
    const [content, setContent] = useState<ProductListContent>(defaultProductListContent);
    const [contentError, setContentError] = useState<string | null>(null);


    useEffect(() => {
        const controller = new AbortController();

        const fetchContent = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ProductListContent`, {
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch product list content: ${response.status}`);
                }

                const data: ProductListContent = await response.json();
                setContent(data);
            } catch (error) {
                if (error instanceof DOMException && error.name === 'AbortError') {
                    return;
                }
                console.error(error);
                setContent(defaultProductListContent);
                setContentError(
                    error instanceof Error ? error.message : '加载产品列表文案失败，请稍后重试'
                );
            }
        };

        fetchContent();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Header/>
            <ProductListHero content={content}/>
            <ProductGrid content={content} contentError={contentError}/>
            <Footer/>
            <WhatAPP/>
            <FloatingCountryFlags/>
        </div>
    );
}


