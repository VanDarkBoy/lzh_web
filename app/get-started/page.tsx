
'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGrid from './ProductGrid';
import ProductCategories from './ProductCategories';
import ShopHero from './ShopHero';

export default function ShopPage() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <ShopHero scrollY={scrollY} />
        <ProductCategories 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <ProductGrid 
          scrollY={scrollY} 
          selectedCategory={selectedCategory}
        />
      </main>
      <Footer />
    </div>
  );
}
