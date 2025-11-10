'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatAPP from '../components/WhatAPP';
import FloatingCountryFlags from '../components/FloatingCountryFlags';
import ProductListHero, { HeroContent, defaultHeroContent } from './ProductListHero';
import ProductGrid, { ProductGridContent, defaultProductGridContent } from './ProductGrid';

export default function ProductListPage() {
  const [scrollY, setScrollY] = useState(0);
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
  const [productGridContent, setProductGridContent] = useState<ProductGridContent>(createDefaultGridContent);
  const [productGridContentError, setProductGridContentError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchHeroContent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ProductListHero`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch hero content: ${response.status}`);
        }

        const data = await response.json();
        if (isMounted) {
          setHeroContent({
            title: data?.title ?? defaultHeroContent.title,
            description: data?.description ?? defaultHeroContent.description,
            backgroundImage: data?.backgroundImage ?? defaultHeroContent.backgroundImage
          });
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        console.error(error);
      }
    };

    fetchHeroContent();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchContent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ProductGrid`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('加载产品列表文案失败');
        }

        const data: ProductGridContent = await response.json();
        setProductGridContent(data);
        setProductGridContentError(null);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        setProductGridContent(createDefaultGridContent());
        setProductGridContentError(
          err instanceof Error ? err.message : '加载产品列表文案失败，请稍后重试'
        );
      }
    };

    fetchContent();

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductListHero scrollY={scrollY} heroContent={heroContent} />
      <ProductGrid content={productGridContent} contentError={productGridContentError} />
      <Footer />
      <WhatAPP />
      <FloatingCountryFlags />
    </div>
  );
}

function createDefaultGridContent(): ProductGridContent {
  return {
    errors: { ...defaultProductGridContent.errors },
    states: { ...defaultProductGridContent.states }
  };
}
