
'use client';

import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import Link from 'next/link';

interface ProductShowcaseProps {
  scrollY: number;
}

const productCategories = [
  {
    id: 1,
    name: "住宅储能系统",
    category: "家用储能解决方案",
    description: "安全可靠的家用储能系统，易于安装，完美匹配太阳能发电，为家庭提供持续稳定的清洁能源供应。",
    image: "https://readdy.ai/api/search-image?query=residential%20home%20energy%20storage%20system%20mounted%20on%20modern%20house%20wall%2C%20sleek%20white%20LiFePO4%20battery%20unit%20with%20LED%20display%2C%20family%20home%20with%20solar%20panels%20on%20roof%2C%20clean%20garage%20installation%20with%20safety%20monitoring%20equipment%2C%20smart%20home%20energy%20management&width=600&height=400&seq=residential-category&orientation=landscape",
    features: ["安全可靠", "易于安装", "智能管理"],
    capacity: "2.56kWh - 15.36kWh"
  },
  {
    id: 2,
    name: "工商业 ESS",
    category: "大型储能方案",
    description: "60kWh至2MWh大容量储能系统，支持中小型工商业项目，提供峰谷套利和备用电源双重价值。",
    image: "https://readdy.ai/api/search-image?query=commercial%20industrial%20energy%20storage%20facility%20with%20large%20battery%20containers%2C%20professional%20warehouse%20setting%20with%20multiple%20ESS%20units%2C%20blue%20and%20white%20industrial%20design%2C%20safety%20monitoring%20systems%20and%20control%20panels%2C%20scalable%20battery%20architecture&width=600&height=400&seq=commercial-category&orientation=landscape",
    features: ["大容量", "可扩展", "高效率"],
    capacity: "60kWh - 2MWh"
  },
  {
    id: 3,
    name: "房车系统",
    category: "移动储能解决方案",
    description: "专为房车设计的便携式储能系统，集成显示、保护和控制功能，让您的旅行更加自由自在。",
    image: "https://readdy.ai/api/search-image?query=RV%20recreational%20vehicle%20with%20compact%20energy%20storage%20system%2C%20portable%20lithium%20battery%20unit%20installed%20inside%20modern%20RV%2C%20outdoor%20camping%20scene%20with%20solar%20panels%20on%20RV%20roof%2C%20adventure%20lifestyle%20with%20mobile%20power%20solution%20and%20control%20display&width=600&height=400&seq=rv-category&orientation=landscape",
    features: ["便携设计", "集成控制", "户外适用"],
    capacity: "12.8V - 25.6V"
  },
  {
    id: 4,
    name: "铅酸替代",
    category: "升级换代方案",
    description: "环保长寿命的锂电池，直接替换传统铅酸电池，性能提升显著，维护成本大幅降低。",
    image: "https://readdy.ai/api/search-image?query=lithium%20battery%20replacement%20for%20lead-acid%20batteries%2C%20side-by-side%20comparison%20showing%20modern%20LiFePO4%20vs%20old%20lead-acid%2C%20industrial%20setting%20with%20battery%20upgrade%20installation%2C%20maintenance-free%20design%20with%20environmental%20benefits&width=600&height=400&seq=replacement-category&orientation=landscape",
    features: ["直接替换", "免维护", "环保材料"],
    capacity: "12V - 48V 系列"
  },
  {
    id: 5,
    name: "动力电池",
    category: "高性能电池解决方案",
    description: "配备蓝牙监控功能的高循环寿命动力电池，广泛应用于各种动力设备和备用电源系统。",
    image: "https://readdy.ai/api/search-image?query=high-performance%20lithium%20power%20batteries%20with%20bluetooth%20monitoring%2C%20professional%20battery%20modules%20with%20digital%20displays%2C%20industrial%20power%20application%20setting%2C%20advanced%20battery%20management%20system%20with%20wireless%20connectivity&width=600&height=400&seq=power-category&orientation=landscape",
    features: ["蓝牙监控", "高循环", "智能管理"],
    capacity: "定制化容量"
  }
];

export default function ProductShowcase({ scrollY }: ProductShowcaseProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [selectedCategory, setSelectedCategory] = useState(productCategories[0]);

  return (
    <section 
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-gray-50"
      style={{
        transform: `translateY(${Math.max(0, (scrollY - 1000) * 0.02)}px)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6">
            产品
            <br />
            <span className="text-blue-700">分类</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            覆盖住宅、工商业、移动应用等全场景的储能解决方案，满足不同客户的多样化需求
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-4">
              {productCategories.map((category, index) => (
                <div
                  key={category.id}
                  className={`p-6 cursor-pointer transition-all duration-300 ${ 
                    selectedCategory.id === category.id 
                      ? 'bg-white shadow-lg border-l-4 border-blue-600' 
                      : 'bg-white/50 hover:bg-white hover:shadow-md'
                  } ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onClick={() => setSelectedCategory(category)}
                  data-product-shop
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 flex items-center justify-center transition-colors duration-300 ${
                      selectedCategory.id === category.id ? 'bg-blue-600' : 'bg-gray-200'
                    }`}>
                      <span className={`text-lg font-bold ${
                        selectedCategory.id === category.id ? 'text-white' : 'text-gray-600'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-blue-600 mb-2 font-medium">
                        {category.category}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {category.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {category.features.map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        容量范围: {category.capacity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link href="/get-started">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer w-full sm:w-auto rounded-full">
                  获取产品报价
                </button>
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className={`transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <div className="relative overflow-hidden shadow-2xl">
                <img
                  src={selectedCategory.image}
                  alt={selectedCategory.name}
                  className="w-full h-96 object-cover object-top transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{selectedCategory.name}</h3>
                  <p className="text-white/90">{selectedCategory.category}</p>
                  <p className="text-white/80 text-sm mt-1">{selectedCategory.capacity}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
