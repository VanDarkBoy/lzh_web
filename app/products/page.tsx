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
  const [heroContent] = useState<ProductsHeroContent | null>(productCenterContent.productsHeroContent);
  const [content] = useState<ProductCategoriesContent | null>(
    productCenterContent.productCategoriesContent
  );
  const [contentError] = useState<string | null>(null);
  const [featuresContent] = useState<ProductFeaturesContent | null>(
    productCenterContent.productFeaturesContent
  );
  const [featuresContentError] = useState<string | null>(null);
  const [purchaseSupportContent] = useState<ProductPurchaseSupportContent | null>(
    productCenterContent.productPurchaseSupportContent
  );

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
