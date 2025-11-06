'use client';

import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PurchaseSupportProps {
  scrollY: number;
}

interface PurchaseChannel {
  title: string;
  description: string;
  icon: string;
  action: string;
  features: string[];
}

interface SupportService {
  title: string;
  description: string;
  icon: string;
  availability: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ContactItem {
  icon: string;
  label: string;
  value: string;
}

interface PurchaseSupportContentText {
  heading: {
    titlePrefix: string;
    titleHighlight: string;
    description: string;
  };
  tabs: {
    purchase: string;
    support: string;
    faq: string;
  };
  contact: {
    title: string;
    items: ContactItem[];
    button: string;
  };
  faqFooter: {
    prompt: string;
    button: string;
  };
}

interface ProductPurchaseSupportContent {
  purchaseChannels: PurchaseChannel[];
  supportServices: SupportService[];
  faqData: FAQItem[];
  contentTxt: PurchaseSupportContentText;
}

export default function ProductPurchaseSupport({ scrollY }: PurchaseSupportProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [activeTab, setActiveTab] = useState<'purchase' | 'support' | 'faq'>('purchase');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [content, setContent] = useState<ProductPurchaseSupportContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ProductPurchaseSupportContent`);

        if (!response.ok) {
          throw new Error(`请求失败，状态码：${response.status}`);
        }

        const data: ProductPurchaseSupportContent = await response.json();
        setContent(data);
      } catch (err) {
        console.error('Failed to load product purchase support content', err);
        setError('数据加载失败，请稍后重试。');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (!content) {
    return (
      <section
        ref={ref}
        className="py-20 bg-white"
        style={{
          transform: `translateY(${Math.max(0, (scrollY - 3200) * 0.02)}px)`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 py-20">
            {isLoading ? '正在加载支持信息...' : error ?? '暂无支持信息。'}
          </div>
        </div>
      </section>
    );
  }

  const { contentTxt, purchaseChannels, supportServices, faqData } = content;

  return (
    <section
      ref={ref}
      className="py-20 bg-white"
      style={{
        transform: `translateY(${Math.max(0, (scrollY - 3200) * 0.02)}px)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            {contentTxt.heading.titlePrefix}
            <span className="text-blue-700">{contentTxt.heading.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {contentTxt.heading.description}
          </p>
        </div>

        {/* 标签切换 */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => setActiveTab('purchase')}
              className={`px-6 py-3 font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full ${
                activeTab === 'purchase'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {contentTxt.tabs.purchase}
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`px-6 py-3 font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full ${
                activeTab === 'support'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {contentTxt.tabs.support}
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-3 font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full ${
                activeTab === 'faq'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {contentTxt.tabs.faq}
            </button>
          </div>
        </div>

        {/* 售前咨询 */}
        {activeTab === 'purchase' && (
          <div className={`transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {purchaseChannels.map((channel, index) => (
                <div
                  key={index}
                  className={`bg-gray-50 p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-16 h-16 bg-blue-100 flex items-center justify-center mb-6">
                    <i className={`${channel.icon} w-8 h-8 flex items-center justify-center text-blue-700 text-2xl`}></i>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {channel.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {channel.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {channel.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <i className="ri-check-line w-4 h-4 flex items-center justify-center text-blue-600"></i>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/get-started">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full">
                      {channel.action}
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 技术支持 */}
        {activeTab === 'support' && (
          <div className={`transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {supportServices.map((service, index) => (
                <div
                  key={index}
                  className={`bg-white p-8 border-l-4 border-blue-600 shadow-lg hover:shadow-xl transition-all duration-500 ${
                    inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <i className={`${service.icon} w-6 h-6 flex items-center justify-center text-blue-700 text-xl`}></i>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {service.title}
                        </h3>
                        <span className="text-sm text-blue-600 font-medium">
                          {service.availability}
                        </span>
                      </div>

                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 联系方式 */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 lg:p-12 text-center shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">{contentTxt.contact.title}</h3>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {contentTxt.contact.items.map((item, index) => (
                  <div key={index}>
                    <i className={`${item.icon} w-8 h-8 flex items-center justify-center text-3xl mb-2 mx-auto`}></i>
                    <div className="font-semibold mb-1">{item.label}</div>
                    <div className="text-blue-100">{item.value}</div>
                  </div>
                ))}
              </div>

              <Link href="/get-started">
                <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 font-bold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer rounded-full">
                  {contentTxt.contact.button}
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* 常见问题 */}
        {activeTab === 'faq' && (
          <div className={`transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div
                    key={index}
                    className={`bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ${
                      inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
                    >
                      <h3 className="font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <i className={`ri-arrow-down-s-line w-5 h-5 flex items-center justify-center text-gray-500 transition-transform duration-300 ${
                        expandedFaq === index ? 'transform rotate-180' : ''
                      }`}></i>
                    </button>

                    {expandedFaq === index && (
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-gray-600 mb-6">{contentTxt.faqFooter.prompt}</p>
                <Link href="/get-started">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full">
                    {contentTxt.faqFooter.button}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
