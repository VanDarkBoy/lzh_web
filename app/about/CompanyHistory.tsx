
'use client';

import { useState } from 'react';

interface Milestone {
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface CompanyHistoryContent {
  sectionTitle: string;
  description: string;
  milestones: Milestone[];
}

interface CompanyHistoryProps {
  content: CompanyHistoryContent;
}

export default function CompanyHistory({ content }: CompanyHistoryProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { sectionTitle, description, milestones } = content;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % milestones.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + milestones.length) % milestones.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">{sectionTitle}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{description}</p>
        </div>

        {/* 历史轮播 */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {milestones.map((milestone, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-12">
                    {/* 内容区域 */}
                    <div className="space-y-6">
                      <div className="text-6xl font-bold text-blue-600 opacity-20">
                        {milestone.year}
                      </div>
                      <div className="text-3xl font-bold text-blue-600 -mt-8">
                        {milestone.year}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{milestone.title}</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">{milestone.description}</p>
                    </div>

                    {/* 图片区域 */}
                    <div className="relative">
                      <img
                        src={milestone.image}
                        alt={milestone.title}
                        className="w-full h-80 object-cover rounded-xl shadow-lg"
                        onError={(e) => {
                          // Fallback handling if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://via.placeholder.com/400x300?text=Image+Unavailable";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 导航按钮 */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            aria-label="Previous slide"
          >
            <i className="ri-arrow-left-line text-gray-600 text-xl w-6 h-6 flex items-center justify-center"></i>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            aria-label="Next slide"
          >
            <i className="ri-arrow-right-line text-gray-600 text-xl w-6 h-6 flex items-center justify-center"></i>
          </button>

          {/* 指示器 */}
          <div className="flex justify-center space-x-2 mt-8">
            {milestones.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 时间线概览 */}
        <div className="mt-16">
          <div className="flex flex-wrap justify-center gap-4">
            {milestones.map((milestone, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  index === currentSlide
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {milestone.year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
