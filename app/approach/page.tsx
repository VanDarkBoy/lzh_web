
'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductHero from './ProductHero';
import ProductShowcase from './ProductShowcase';
import ProductSpecs from './ProductSpecs';
import ProductAdvantages from './ProductAdvantages';

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
      <ProductHero scrollY={scrollY} />
      <ProductShowcase scrollY={scrollY} />
      <ProductSpecs scrollY={scrollY} />
      <ProductAdvantages scrollY={scrollY} />
      <Footer />
    </div>
  );
}