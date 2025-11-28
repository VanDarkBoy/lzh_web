'use client';

import { useEffect, useState } from 'react';
import { ProductListContent, defaultProductListContent } from './types';

interface Category {
  id: number | string;
  name: string;
  count: number;
}

const badgeColors = ['bg-green-400', 'bg-blue-400', 'bg-purple-400', 'bg-orange-400', 'bg-pink-400', 'bg-teal-400'];

interface ProductListHeroProps {
  content?: ProductListContent;
}

export default function ProductListHero({content = defaultProductListContent }: ProductListHeroProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/product_list_categories`);
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

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayContent = content ?? defaultProductListContent;

  return (
    <section
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50"
      style={{
        backgroundImage: `url(${displayContent.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">{displayContent.title}</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto">
            {displayContent.description}
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
