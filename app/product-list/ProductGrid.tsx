'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface Product {
  id: bigint;
  name: string;
  category: bigint;
  image: string;
  description: string;
  specs: string;
  dealFeatures: string[];
}

interface Category {
  id: bigint;
  name: string;
  count: number;
}

interface ProductGridContent {
  errors: {
    fetchProducts: string;
    fetchCategories: string;
    loadFailed: string;
  };
  states: {
    loading: string;
    viewDetails: string;
    empty: string;
  };
}

const defaultContent: ProductGridContent = {
  errors: {
    fetchProducts: '获取产品列表失败',
    fetchCategories: '获取产品分类失败',
    loadFailed: '加载产品数据失败，请稍后重试'
  },
  states: {
    loading: '正在加载产品信息...',
    viewDetails: '查看详情',
    empty: '暂无符合条件的产品。'
  }
};

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<bigint>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<ProductGridContent>(defaultContent);
  const [contentError, setContentError] = useState<string | null>(null);
  const contentRef = useRef<ProductGridContent>(defaultContent);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchContent = async () => {
      if (!process.env.NEXT_PUBLIC_API_BASE) {
        setContentError('未配置产品列表文案接口地址');
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ProductGrid`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('加载产品列表文案失败');
        }

        const data: ProductGridContent = await response.json();
        setContent(data);
        contentRef.current = data;
        setContentError(null);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        setContentError(
          err instanceof Error ? err.message : '加载产品列表文案失败，请稍后重试'
        );
      }
    };

    fetchContent();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const productsController = new AbortController();
    const categoriesController = new AbortController();

    if (!process.env.NEXT_PUBLIC_API_BASE) {
      setError('未配置产品列表接口地址');
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/getAllProduct`, {
            signal: productsController.signal
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/product_list_categories`, {
            signal: categoriesController.signal
          })
        ]);

        if (!productsResponse.ok) {
          throw new Error(contentRef.current.errors.fetchProducts);
        }

        if (!categoriesResponse.ok) {
          throw new Error(contentRef.current.errors.fetchCategories);
        }

        const productsData: Product[] = await productsResponse.json();
        const categoriesData: Category[] = await categoriesResponse.json();
        setProducts(productsData);
        setCategories(categoriesData);
        if (categoriesData.length > 0) {
          setActiveCategory((current) => current || categoriesData[0].id);
        }
        setError(null);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        setError(contentRef.current.errors.loadFailed);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      productsController.abort();
      categoriesController.abort();
    };
  }, []);

  const filteredProducts = products.filter(product => product.category === activeCategory);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* 分类筛选 */}
          <aside className="lg:w-64">
            <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-lg lg:sticky lg:top-24">
              <h2 className="mb-6 text-center text-lg font-semibold text-gray-800 lg:text-left">产品分类</h2>
              <div className="flex flex-wrap justify-center gap-3 lg:flex-col lg:items-stretch">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap lg:w-full ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-4">
                      <span>{category.name}</span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-600">
                        {category.count}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {contentError && (
              <div className="mx-auto mb-8 max-w-3xl rounded-xl border border-yellow-200 bg-yellow-50 px-6 py-4 text-center text-yellow-700 shadow">
                {contentError}
              </div>
            )}
            {error && (
              <div className="mx-auto mb-8 max-w-3xl rounded-xl bg-red-50 px-6 py-4 text-center text-red-600 shadow">
                {error}
              </div>
            )}

            {/* 产品网格 */}
            <div data-product-shop>
              {loading ? (
                <div className="flex min-h-[200px] items-center justify-center text-gray-500">
                  {content.states.loading}
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
                      href={`/product-detail?id=${product.id.toString()}`}
                      className="inline-flex items-center justify-center rounded-lg border border-blue-600 px-4 py-2 text-blue-600 transition-colors duration-300 hover:bg-blue-600 hover:text-white"
                    >
                      {content.states.viewDetails}
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
                  {content.states.empty}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
