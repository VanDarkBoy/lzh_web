'use client';

import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Category, ProductCategoriesContent } from './types';

interface ProductCategoriesProps {
  scrollY: number;
  onCategorySelect?: (category: Category | null) => void;
  content: ProductCategoriesContent | null;
  contentError?: string | null;
}

export default function ProductCategories({
  scrollY,
  onCategorySelect,
  content,
  contentError,
}: ProductCategoriesProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      if (!process.env.NEXT_PUBLIC_API_BASE) {
        setError('未配置产品分类接口地址');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE}/api/getCategoriesAllDetail`,
            {
              signal: controller.signal,
            }
        );

        if (!response.ok) {
          throw new Error('获取产品分类失败');
        }

        const data: Category[] = await response.json();

        setCategories(data);
        setSelectedCategory((current) => {
          if (current) {
            const matched = data.find(
                (category) => category.id === current.id
            );

            if (matched) {
              return matched;
            }
          }

          return data.length > 0 ? data[0] : null;
        });
        setError(null);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        setError(
            err instanceof Error ? err.message : '加载产品分类失败，请稍后重试'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (onCategorySelect) {
      onCategorySelect(selectedCategory);
    }
  }, [onCategorySelect, selectedCategory]);

  const activeCategory = selectedCategory;
  const fallbackIcons = [
    'ri-home-line',
    'ri-building-line',
    'ri-truck-line',
    'ri-recycle-line',
    'ri-battery-charge-line'
  ];

  const displayError = error ?? contentError;
  const sectionHeader = content?.sectionHeader;
  const ctaButtons = content?.ctaButtons;
  const emptyStates = content?.emptyStates;
  const categoriyDetail = content?.categoriyDetail;


  return (
      <section
          ref={ref}
          className="py-20 bg-gray-50"
          style={{
            transform: `translateY(${Math.max(0, (scrollY - 800) * 0.02)}px)`
          }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6">
              {sectionHeader?.badge ?? ''}
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              {sectionHeader?.title?.main ?? ''}
              <span className="text-blue-700">
                {sectionHeader?.title?.highlight ?? ''}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {sectionHeader?.description ?? ''}
            </p>
          </div>

          {displayError && (
              <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
                {displayError}
              </div>
          )}

          <div className="grid lg:grid-cols-5 gap-8 mb-12">
            {loading ? (
                <div className="lg:col-span-5 flex min-h-[120px] items-center justify-center text-gray-500">
                  正在加载产品分类...
                </div>
            ) : categories.length > 0 ? (
                categories.map((category, index) => {
                  const isActive =
                      activeCategory &&
                      activeCategory.id === category.id;

                  const iconClass =
                      category.icon && category.icon.trim().length > 0
                          ? category.icon
                          : fallbackIcons[index % fallbackIcons.length];

                  return (
                      <div
                          key={category.id}
                          className={`cursor-pointer transition-all duration-300 ${
                              isActive
                                  ? 'transform scale-105'
                                  : 'hover:transform hover:scale-102'
                          } ${
                              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                          }`}
                          style={{ transitionDelay: `${index * 100}ms` }}
                          onClick={() => setSelectedCategory(category)}
                      >
                        <div
                            className={`p-6 text-center transition-all duration-300 ${
                                isActive
                                    ? 'bg-blue-600 text-white shadow-xl'
                                    : 'bg-white text-gray-900 hover:shadow-lg'
                            }`}
                        >
                          <div
                              className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center text-2xl ${
                                  isActive
                                      ? 'bg-white/20 text-white'
                                      : 'bg-blue-100 text-blue-600'
                              }`}
                          >
                            <i
                                className={`${iconClass} w-8 h-8 flex items-center justify-center`}
                            ></i>
                          </div>
                          <h3 className="font-semibold text-sm mb-2 leading-tight">
                            {category.name}
                          </h3>
                          <p
                              className={`text-xs leading-relaxed ${
                                  isActive ? 'text-white/90' : 'text-gray-600'
                              }`}
                          >
                            {category.description}
                          </p>
                        </div>
                      </div>
                  );
                })
            ) : (
                <div className="lg:col-span-5 flex min-h-[120px] items-center justify-center text-gray-500">
                  {emptyStates?.categories ?? ''}
                </div>
            )}
          </div>

          <div
              className={`bg-white shadow-2xl overflow-hidden transition-all duration-700 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            {loading ? (
                <div className="flex min-h-[200px] items-center justify-center text-gray-500">
                  正在加载产品信息...
                </div>
            ) : activeCategory ? (
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="p-8 lg:p-12" data-product-shop>
                    <div className="mb-6">
                      {/*<span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">*/}
                      {/*  {activeCategory.capacity}*/}
                      {/*</span>*/}
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        {activeCategory.name}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {activeCategory.details}
                      </p>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">{categoriyDetail?.productFeatures ?? ''}</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {activeCategory.dealFeatures.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <i className="ri-check-line w-5 h-5 flex items-center justify-center text-blue-600"></i>
                              <span className="text-gray-700 text-sm">{feature}</span>
                            </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">{categoriyDetail?.applicationScenarios ?? ''}</h4>
                      <p className="text-gray-600">{activeCategory.applications}</p>
                    </div>

                    <div className="flex gap-4">
                      <Link href="/get-started">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full">
                          {ctaButtons?.primary ?? ''}
                        </button>
                      </Link>
                      <Link
                          href="/product-list"
                      >
                        <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full">
                          {ctaButtons?.secondary ?? ''}
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="relative">
                    <img
                        src={activeCategory.image}
                        alt={activeCategory.name}
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                </div>
            ) : (
                <div className="flex min-h-[200px] items-center justify-center text-gray-500">
                  {emptyStates?.details ?? ''}
                </div>
            )}
          </div>
        </div>
      </section>
  );
}
