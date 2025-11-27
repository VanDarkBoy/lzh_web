'use client';

import { useEffect, useState } from 'react';

import { DownloadPageContent } from './downloadContent';

interface DownloadItem {
  id: string;
  name: string;
  category: string;
  type: string;
  size: string;
  description: string;
  icon: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

interface DownloadCenterProps {
  messages: DownloadPageContent['messages'];
}

export default function DownloadCenter({ messages }: DownloadCenterProps) {
  const [downloadItems, setDownloadItems] = useState<DownloadItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const itemsController = new AbortController();
    const categoriesController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const [itemsResponse, categoriesResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/getDownloadItems`, {
            signal: itemsController.signal
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/getDownloadCategories`, {
            signal: categoriesController.signal
          })
        ]);

        if (!itemsResponse.ok) {
          throw new Error(messages.fetchItemsError);
        }

        if (!categoriesResponse.ok) {
          throw new Error(messages.fetchCategoriesError);
        }

        const itemsData: DownloadItem[] = await itemsResponse.json();
        const categoriesData: Category[] = await categoriesResponse.json();

        setDownloadItems(itemsData);
        setCategories(categoriesData);
        setActiveCategory((current) => {
          if (categoriesData.some((category) => category.id === current)) {
            return current;
          }
          if (categoriesData.length > 0) {
            return categoriesData[0].id;
          }
          return 'all';
        });
        setError(null);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        setError(err instanceof Error ? err.message : messages.genericError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      itemsController.abort();
      categoriesController.abort();
    };
  }, [messages]);

  const filteredItems =
    activeCategory === 'all'
      ? downloadItems
      : downloadItems.filter((item) => item.category === activeCategory);

  const handleDownload = async (item: DownloadItem) => {
    if (!process.env.NEXT_PUBLIC_API_BASE) {
      console.error(messages.missingApiBase);
      alert(messages.missingApiBase);
      return;
    }

    const requestUrl = `${process.env.NEXT_PUBLIC_API_BASE}/api/downloadResource?id=${encodeURIComponent(item.id)}`;

    try {
      const response = await fetch(requestUrl);

      if (!response.ok) {
        throw new Error(messages.fetchDownloadLinkError);
      }

      const data = (await response.json()) as { url?: unknown };
      const fileUrl = typeof data.url === 'string' ? data.url.trim() : '';

      if (!fileUrl) {
        throw new Error(messages.invalidDownloadLink);
      }

      const anchor = document.createElement('a');
      anchor.href = fileUrl;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } catch (err) {
      console.error('下载失败', err);
      alert(err instanceof Error ? err.message : messages.retryDownloadLinkError);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-600 shadow-md'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center text-gray-500">{messages.loadingText}</div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg">
                    <i className={`${item.icon} text-green-600 text-xl`}></i>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mb-1">
                      {item.type}
                    </span>
                    <div className="text-gray-500 text-sm">{item.size}</div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.description}</p>

                <button
                  onClick={() => handleDownload(item)}
                  className="w-full py-2 px-4 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap bg-green-600 text-white hover:bg-green-700"
                >
                  {messages.downloadButtonText}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center text-gray-500">{messages.emptyStateText}</div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
