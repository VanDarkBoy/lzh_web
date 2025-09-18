'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Product {
  id: bigint;
  name: string;
  category: string;
  image: string;
  description: string;
  specs: string;
  dealFeatures: string[];
}

interface ProductGridProps {
  scrollY: number;
}

export default function ProductGrid({ scrollY }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/getAllProduct`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('获取产品列表失败');
        }

        const data: Product[] = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        setError('加载产品数据失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  const categories = [
    { id: 'all', name: '全部产品', count: products.length },
    { id: 'residential', name: '家用储能系统', count: products.filter(p => p.category === 'residential').length },
    { id: 'commercial', name: '工商业ESS', count: products.filter(p => p.category === 'commercial').length },
    { id: 'rv', name: '房车控制系统（12V和24V）', count: products.filter(p => p.category === 'rv').length },
    { id: 'power', name: '动力电池', count: products.filter(p => p.category === 'power').length }
  ];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 分类筛选 */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-md'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="max-w-3xl mx-auto mb-8 rounded-xl bg-red-50 px-6 py-4 text-center text-red-600 shadow">
            {error}
          </div>
        )}

        {/* 产品网格 */}
        <div data-product-shop>
          {loading ? (
            <div className="flex min-h-[200px] items-center justify-center text-gray-500">
              正在加载产品信息...
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* 产品图片 */}
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* 产品信息 */}
                  <div className="p-6">
                    <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
                      {product.category === 'residential' && '家用储能系统'}
                      {product.category === 'commercial' && '工商业ESS'}
                      {product.category === 'rv' && '房车控制系统'}
                      {product.category === 'power' && '动力电池'}
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-gray-900">{product.name}</h3>
                    <p className="mb-4 text-gray-600">{product.description}</p>

                    <div className="mb-4 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                      {product.specs}
                    </div>

                    <ul className="mb-6 space-y-2 text-sm text-gray-600">
                      {product.dealFeatures.map((feature, featureIndex) => (
                        <li key={`${product.id}-feature-${featureIndex}`} className="flex items-center">
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/product-detail/${product.id}`}
                      className="inline-flex items-center justify-center rounded-lg border border-blue-600 px-4 py-2 text-blue-600 transition-colors duration-300 hover:bg-blue-600 hover:text-white"
                    >
                      查看详情
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[200px] items-center justify-center rounded-xl bg-white text-gray-500 shadow">
              暂无符合条件的产品。
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
