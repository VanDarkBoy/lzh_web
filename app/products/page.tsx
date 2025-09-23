
'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductsHero from './ProductsHero';
import ProductCategories from './ProductCategories';
import ProductShowcase from './ProductShowcase';
import ProductFeatures from './ProductFeatures';
import PurchaseSupport from './PurchaseSupport';
import type { Category } from './types';

export default function ProductsPage() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductsHero scrollY={scrollY} />
      <ProductCategories
        scrollY={scrollY}
        onCategorySelect={setSelectedCategory}
      />
      {/*<ProductShowcase scrollY={scrollY} />*/}
      <ProductFeatures scrollY={scrollY} selectedCategory={selectedCategory} />
      <PurchaseSupport scrollY={scrollY} />
      <Footer />
    </div>
  );
}
