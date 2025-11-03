'use client';

import { useInView } from 'react-intersection-observer';

export interface TechnicalCapability {
  title: string;
  items: string[];
}

export interface TechnicalSection {
  title: string;
  description: string;
  historyTitle?: string;
  historyDescription?: string;
  solutionsTitle?: string;
  solutions: string[];
  capabilitiesTitle: string;
  capabilities: TechnicalCapability[];
  manufacturingTitle: string;
  manufacturingDescription: string;
  manufacturingHighlights: string[];
  testingTitle: string;
  testingDescription: string;
  testingItems: string[];
}

interface CompanyCapabilitiesProps {
  scrollY: number;
  content: TechnicalSection;
}

export default function CompanyCapabilities({ scrollY, content }: CompanyCapabilitiesProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const {
    title,
    description,
    historyTitle,
    historyDescription,
    solutionsTitle,
    solutions,
    capabilitiesTitle,
    capabilities,
    manufacturingTitle,
    manufacturingDescription,
    manufacturingHighlights,
    testingTitle,
    testingDescription,
    testingItems,
  } = content;

  return (
    <section
      ref={ref}
      className="py-20 bg-white"
      style={{
        transform: `translateY(${Math.max(0, (scrollY - 2000) * 0.02)}px)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <div className="space-y-20">
          {/* 能源解决方案 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              {historyTitle && (
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{historyTitle}</h3>
              )}
              {historyDescription && (
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">{historyDescription}</p>
              )}
              {solutionsTitle && (
                <h4 className="text-xl font-semibold text-gray-900 mb-4">{solutionsTitle}</h4>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {solutions.map((solution, index) => (
                  <div key={`${solution}-${index}`} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{solution}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <div className="relative">
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20energy%20storage%20solutions%20with%20various%20applications%20including%20residential%20solar%20systems%2C%20industrial%20batteries%2C%20electric%20vehicles%2C%20professional%20photography%20with%20clean%20blue%20and%20green%20technology%20colors&width=600&height=400&seq=energy-solutions&orientation=landscape"
                  alt={historyTitle || '能源解决方案'}
                  className="w-full h-80 object-cover object-top rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>

          {/* 研发能力 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:grid-flow-col-dense">
            <div className={`lg:col-start-2 transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {capabilitiesTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {capabilities.map((capability) => (
                  <div key={capability.title}>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">{capability.title}</h4>
                    <div className="space-y-2">
                      {capability.items.map((item, index) => (
                        <div key={`${capability.title}-${item}-${index}`} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`lg:col-start-1 transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <div className="relative">
                <img
                  src="https://readdy.ai/api/search-image?query=Professional R&D laboratory for battery technology development, engineers working with advanced testing equipment, modern research facility with clean technology environment&width=600&height=400&seq=rd-capabilities&orientation=landscape"
                  alt={capabilitiesTitle}
                  className="w-full h-80 object-cover object-top rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>

          {/* 制造实力 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {manufacturingTitle}
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {manufacturingDescription}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {manufacturingHighlights.map((highlight, index) => (
                  <div key={`${highlight}-${index}`} className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-800 font-medium">{highlight}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <div className="relative">
                <img
                  src="https://readdy.ai/api/search-image?query=Advanced%20manufacturing%20facility%20for%20lithium%20battery%20production%2C%20automated%20production%20lines%20with%20modern%20equipment%2C%20professional%20industrial%20environment%20with%20quality%20control%20systems&width=600&height=400&seq=manufacturing-strength&orientation=landscape"
                  alt={manufacturingTitle}
                  className="w-full h-80 object-cover object-top rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>

          {/* 测试能力 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:grid-flow-col-dense">
            <div className={`lg:col-start-2 transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {testingTitle}
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {testingDescription}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                {testingItems.map((item, index) => (
                  <div key={`${item}-${index}`} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`lg:col-start-1 transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <div className="relative">
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%20battery%20testing%20laboratory%20with%20advanced%20testing%20equipment%2C%20quality%20assurance%20facility%20with%20precise%20measurement%20instruments%2C%20clean%20technology%20testing%20environment&width=600&height=400&seq=testing-capabilities&orientation=landscape"
                  alt={testingTitle}
                  className="w-full h-80 object-cover object-top rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
