'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatAPP from '../components/WhatAPP';
import FloatingCountryFlags from '../components/FloatingCountryFlags';
import ProductListHero from './ProductListHero';
import ProductGrid from './ProductGrid';
import { ProductListContent, defaultProductListContent } from './productListContent';

export default function ProductListPage() {
  const [content, setContent] = useState<ProductListContent>(defaultProductListContent);
  const [contentError, setContentError] = useState<string | null>(null);


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchContent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ProductListContent`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch product list content: ${response.status}`);
        }

        const data: Partial<ProductListContent> = await response.json();

        if (isMounted) {
          setContent(mergeWithDefaultContent(data));
          setContentError(null);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        console.error(error);
        if (isMounted) {
          setContent(defaultProductListContent);
          setContentError(
            error instanceof Error ? error.message : '加载产品列表文案失败，请稍后重试'
          );
        }
      }
    };

    fetchContent();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductListHero  content={content} />
      <ProductGrid content={content} contentError={contentError} />
      <Footer />
      <WhatAPP />
      <FloatingCountryFlags />
    </div>
  );
}

function mergeWithDefaultContent(data: Partial<ProductListContent>): ProductListContent {
  return {
    title: data?.title ?? defaultProductListContent.title,
    description: data?.description ?? defaultProductListContent.description,
    backgroundImage: data?.backgroundImage ?? defaultProductListContent.backgroundImage,
    errors: {
      fetchProducts: data?.errors?.fetchProducts ?? defaultProductListContent.errors.fetchProducts,
      fetchCategories: data?.errors?.fetchCategories ?? defaultProductListContent.errors.fetchCategories,
      loadFailed: data?.errors?.loadFailed ?? defaultProductListContent.errors.loadFailed
    },
    states: {
      loading: data?.states?.loading ?? defaultProductListContent.states.loading,
      viewDetails: data?.states?.viewDetails ?? defaultProductListContent.states.viewDetails,
      productsCategories: data?.states?.productsCategories ?? defaultProductListContent.states.productsCategories,
      empty: data?.states?.empty ?? defaultProductListContent.states.empty
    }
  };
}
