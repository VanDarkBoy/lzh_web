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
import { productCenterContent } from './types';
import type {
  Category,
  ProductCategoriesContent,
  ProductFeaturesContent,
  ProductPurchaseSupportContent,
  ProductCenterContent,
  ProductsHeroContent,
} from './types';

export default function ProductsPage() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [heroContent, setHeroContent] = useState<ProductsHeroContent | null>(
    productCenterContent.productsHeroContent
  );
  const [content, setContent] = useState<ProductCategoriesContent | null>(
    productCenterContent.productCategoriesContent
  );
  const [contentError, setContentError] = useState<string | null>(null);
  const [featuresContent, setFeaturesContent] = useState<ProductFeaturesContent | null>(
    productCenterContent.productFeaturesContent
  );
  const [featuresContentError, setFeaturesContentError] = useState<string | null>(null);
  const [purchaseSupportContent, setPurchaseSupportContent] =
    useState<ProductPurchaseSupportContent | null>(productCenterContent.productPurchaseSupportContent);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProductCenterContent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ProductCenterContent`, {
          signal: controller.signal,
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Failed to load product center content');
        }

        const data: ProductCenterContent = await response.json();
        setHeroContent(data.productsHeroContent);
        setContent(data.productCategoriesContent);
        setFeaturesContent(data.productFeaturesContent);
        setPurchaseSupportContent(data.productPurchaseSupportContent);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        console.error('Failed to load product center content', err);
        setHeroContent(productCenterContent.productsHeroContent);
        setContent(productCenterContent.productCategoriesContent);
        setFeaturesContent(productCenterContent.productFeaturesContent);
        setPurchaseSupportContent(productCenterContent.productPurchaseSupportContent);
        setContentError(
          err instanceof Error ? err.message : 'Failed to load product category copy, please try again later.'
        );
        setFeaturesContentError('Failed to load product feature display content, please try again later.');
      }
    };

    fetchProductCenterContent();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
