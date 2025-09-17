'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectSouthHero from './ProjectSouthHero';
import ProjectSouthGrid from './ProjectSouthGrid';
import ProjectSouthCategories from './ProjectSouthCategories';

export default function ProjectSouthPage() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <ProjectSouthHero scrollY={scrollY} />
        <ProjectSouthCategories 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <ProjectSouthGrid 
          scrollY={scrollY} 
          selectedCategory={selectedCategory}
        />
      </main>
      <Footer />
    </div>
  );
}