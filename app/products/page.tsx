'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductsHero from './ProductsHero';
import ProductCategories from './ProductCategories';
import ProductFeatures from './ProductFeatures';
import ProductPurchaseSupport from './ProductPurchaseSupport';
import type { Category, ProductCategoriesContent } from './types';

export default function ProductsPage() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [content, setContent] = useState<ProductCategoriesContent | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchContent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ProductCategoriesContent`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('加载产品分类文案失败');
        }

        const data: ProductCategoriesContent = await response.json();
        setContent(data);
        setContentError(null);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        setContentError(
          err instanceof Error ? err.message : '加载产品分类文案失败，请稍后重试'
        );
      }
    };

    fetchContent();

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductsHero scrollY={scrollY} />
      <ProductCategories
        scrollY={scrollY}
        onCategorySelect={setSelectedCategory}
        content={content}
        contentError={contentError}
      />
      <ProductFeatures scrollY={scrollY} selectedCategory={selectedCategory} />
      <ProductPurchaseSupport scrollY={scrollY} />
      <Footer />
    </div>
  );
}
