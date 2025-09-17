
'use client';

import { useInView } from 'react-intersection-observer';

interface ProjectCategoriesProps {
  scrollY: number;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  {
    id: 'All',
    name: '全部案例',
    count: 14,
    icon: 'ri-apps-line'
  },
  {
    id: 'Residential',
    name: '家用储能',
    count: 7,
    icon: 'ri-home-line'
  },
  {
    id: 'Commercial',
    name: '工商业储能',
    count: 7,
    icon: 'ri-building-line'
  }
];

export default function ProjectCategories({ scrollY, selectedCategory, onCategoryChange }: ProjectCategoriesProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section 
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-white"
      style={{
        transform: `translateY(${Math.max(0, (scrollY - 1000) * 0.02)}px)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-4 sm:mb-6">
              应用
              <br />
              <span className="text-emerald-700">案例</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              从家用储能到工商业储能，我们的解决方案在各个领域都有成功应用
            </p>
          </div>
        </div>

        <div className={`transition-all duration-1000 delay-300 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`group relative px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'text-white'
                    : 'text-gray-600 hover:text-emerald-700'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-emerald-600 shadow-lg'
                    : 'bg-transparent group-hover:bg-emerald-50'
                }`}></div>
                
                <div className="relative flex items-center space-x-2 sm:space-x-3">
                  <i className={`${category.icon} text-lg sm:text-xl w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center`}></i>
                  <span>{category.name}</span>
                  <span className={`ml-1 sm:ml-2 px-2 py-1 text-xs rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-500 group-hover:bg-emerald-100 group-hover:text-emerald-700'
                  }`}>
                    {category.count}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
