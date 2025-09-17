
'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductsHero from './ProductsHero';
import ProductCategories from './ProductCategories';
import ProductShowcase from './ProductShowcase';
import ProductFeatures from './ProductFeatures';
import PurchaseSupport from './PurchaseSupport';

export default function ProductsPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductsHero scrollY={scrollY} />
      <ProductCategories scrollY={scrollY} />
      <ProductShowcase scrollY={scrollY} />
      <ProductFeatures scrollY={scrollY} />
      <PurchaseSupport scrollY={scrollY} />
      <Footer />
    </div>
  );
}
