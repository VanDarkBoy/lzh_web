'use client';

import { useEffect, useState } from 'react';

interface ProductListHeroProps {
  scrollY: number;
}

interface HeroContent {
  title: string;
  description: string;
}

interface Category {
  id: number | string;
  name: string;
  count: number;
}

const defaultHeroContent: HeroContent = {
  title: '产品列表',
  description: '探索 Lithium Valley 完整的储能产品系列，从家用到工业级解决方案'
};

const badgeColors = ['bg-green-400', 'bg-blue-400', 'bg-purple-400', 'bg-orange-400', 'bg-pink-400', 'bg-teal-400'];

export default function ProductListHero({ scrollY }: ProductListHeroProps) {
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE;

    if (!apiBase) {
      console.warn('NEXT_PUBLIC_API_BASE is not defined');
      return;
    }

    let isMounted = true;

    const fetchHeroContent = async () => {
      try {
        const response = await fetch(`${apiBase}/api/ProductListHero`);
        if (!response.ok) {
          throw new Error(`Failed to fetch hero content: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
          setHeroContent({
            title: data?.title ?? defaultHeroContent.title,
            description: data?.description ?? defaultHeroContent.description
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiBase}/api/product_list_categories`);
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.status}`);
        }
        const data: Category[] = await response.json();
        if (isMounted) {
          setCategories(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchHeroContent();
    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Clean%20modern%20energy%20storage%20facility%20with%20multiple%20battery%20systems%20arranged%20in%20professional%20display%2C%20industrial%20ESS%20product%20showcase%20with%20white%20background%2C%20professional%20product%20photography%20for%20lithium%20battery%20storage%20systems&width=1920&height=1080&seq=product-list-hero&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `translateY(${scrollY * 0.5}px)`
      }}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            {heroContent.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto">
            {heroContent.description}
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-lg">
            {categories.map((category, index) => (
              <div className="flex items-center" key={category.id ?? index}>
                <div className={`w-3 h-3 rounded-full mr-3 ${badgeColors[index % badgeColors.length]}`}></div>
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}