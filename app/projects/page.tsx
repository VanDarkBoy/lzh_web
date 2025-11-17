
'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatAPP from '../components/WhatAPP';
import FloatingCountryFlags from '../components/FloatingCountryFlags';
import ProjectHero from './ProjectHero';
import ProjectGrid from './ProjectGrid';
import ProjectCategories from './ProjectCategories';
import {
  ProjectContent,
  defaultProjectContent,
  normalizeProjectContent,
} from './projectContent';

export default function ProjectsPage() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<number | 'All'>('All');
  const [content, setContent] = useState<ProjectContent>(defaultProjectContent);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const apiBase = process.env.NEXT_PUBLIC_API_BASE;

    const fetchContent = async () => {
      try {
        const response = await fetch(`${apiBase}/api/projectContent`, {
          signal: controller.signal,
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch project content: ${response.status}`);
        }

        const payload = await response.json();
        setContent(normalizeProjectContent(payload));
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        console.error('Failed to load project content:', error);
      }
    };

    fetchContent();

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <ProjectHero scrollY={scrollY} content={content.hero} />
        <ProjectCategories
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          scrollY={0}
          content={content.categories}
        />
        <ProjectGrid
          scrollY={scrollY}
          selectedCategory={selectedCategory}
          content={content.grid}
        />
      </main>
      <Footer />
      <WhatAPP />
      <FloatingCountryFlags />
    </div>
  );
}
