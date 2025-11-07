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

    const fetchHeroContent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ProductsHeroContent`, {
          signal: controller.signal,
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to load ProductsHero content: ${response.statusText}`);
        }

        const data: ProductsHeroContent = await response.json();
        setHeroContent(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        console.error(error);
      }
    };

    fetchHeroContent();

    return () => controller.abort();
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

  useEffect(() => {
    const controller = new AbortController();

    const fetchFeaturesContent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ProductFeaturesContent`, {
          signal: controller.signal,
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('获取产品功能展示内容失败');
        }

        const data: ProductFeaturesContent = await response.json();
        setFeaturesContent(data);
        setFeaturesContentError(null);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        console.error('Error fetching product features content:', err);
        setFeaturesContent(null);
        setFeaturesContentError('加载产品功能展示内容失败，请稍后重试。');
      } finally {

      }
    };

    fetchFeaturesContent();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPurchaseSupportContent = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/ProductPurchaseSupportContent`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`请求失败，状态码：${response.status}`);
        }

        const data: ProductPurchaseSupportContent = await response.json();
        setPurchaseSupportContent(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        console.error('Failed to load product purchase support content', err);
        setPurchaseSupportContent(null);
      } finally {
      }
    };

    fetchPurchaseSupportContent();

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
