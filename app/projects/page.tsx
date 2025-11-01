
'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectHero from './ProjectHero';
import ProjectGrid from './ProjectGrid';
import ProjectCategories from './ProjectCategories';

export default function ProjectsPage() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<number | 'All'>('All');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <ProjectHero scrollY={scrollY} />
        <ProjectCategories
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory} scrollY={0}        />
        <ProjectGrid 
          scrollY={scrollY} 
          selectedCategory={selectedCategory}
        />
      </main>
      <Footer />
    </div>
  );
}
