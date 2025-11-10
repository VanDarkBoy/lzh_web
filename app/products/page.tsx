'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatAPP from '../components/WhatAPP';
import FloatingCountryFlags from '../components/FloatingCountryFlags';
import ProductsHero from './ProductsHero';
import ProductCategories from './ProductCategories';
import ProductFeatures from './ProductFeatures';
import ProductPurchaseSupport from './ProductPurchaseSupport';
import type {
  Category,
  ProductCategoriesContent,
  ProductCenterContent,
  ProductFeaturesContent,
  ProductPurchaseSupportContent,
  ProductsHeroContent,
} from './types';

export default function ProductsPage() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [heroContent, setHeroContent] = useState<ProductsHeroContent | null>(null);
  const [content, setContent] = useState<ProductCategoriesContent | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  const [featuresContent, setFeaturesContent] = useState<ProductFeaturesContent | null>(null);
  const [featuresContentError, setFeaturesContentError] = useState<string | null>(null);
  const [purchaseSupportContent, setPurchaseSupportContent] = useState<ProductPurchaseSupportContent | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProductCenterContent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ProductCenterContent`, {
          signal: controller.signal,
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('加载产品中心内容失败');
        }

        const data: ProductCenterContent = await response.json();
        setHeroContent(data.productsHeroContent);
        setContent(data.productCategoriesContent);
        setFeaturesContent(data.productFeaturesContent);
        setPurchaseSupportContent(data.productPurchaseSupportContent);
        setContentError(null);
        setFeaturesContentError(null);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        console.error('Failed to load product center content', err);
        setHeroContent(null);
        setContent(null);
        setFeaturesContent(null);
        setPurchaseSupportContent(null);
        setContentError(
          err instanceof Error ? err.message : '加载产品分类文案失败，请稍后重试'
        );
        setFeaturesContentError('加载产品功能展示内容失败，请稍后重试。');
      }
    };

    fetchProductCenterContent();

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductsHero scrollY={scrollY} content={heroContent} />
      <ProductCategories
        scrollY={scrollY}
        onCategorySelect={setSelectedCategory}
        content={content}
        contentError={contentError}
      />
      <ProductFeatures
        scrollY={scrollY}
        selectedCategory={selectedCategory}
        content={featuresContent}
        contentError={featuresContentError}
      />
      <ProductPurchaseSupport
        scrollY={scrollY}
        content={purchaseSupportContent}
      />
      <Footer />
      <WhatAPP />
      <FloatingCountryFlags />
    </div>
  );
}
