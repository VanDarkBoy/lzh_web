
'use client';

import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ProductShowcaseProps {
  scrollY: number;
}

const typicalProducts = [
  {
    id: 1,
    name: "LV2500W HB 堆叠式一体化 ESS",
    model: "LV2500W HB",
    description: "集成逆变器、UPS 和充电系统，模块化设计，满足家庭与商用用户需求",
    features: "IP65 防护等级，适应各种环境，安装时间减少 50%",
    specifications: {
      power: "2.5kW",
      voltage: "48V",
      capacity: "100Ah",
      efficiency: "95%+"
    },
    applications: ["家庭储能", "商用备电", "离网系统"],
    advantages: ["一体化设计", "快速安装", "高防护等级", "智能管理"],
    image: "https://readdy.ai/api/search-image?query=LV2500W%20integrated%20ESS%20unit%20with%20stackable%20modular%20design%2C%20professional%20white%20and%20blue%20energy%20storage%20system%20with%20digital%20display%2C%20IP65%20rated%20outdoor%20installation%2C%20integrated%20inverter%20UPS%20and%20charging%20system%20in%20one%20compact%20unit%2C%20modern%20industrial%20design&width=600&height=400&seq=lv2500w&orientation=landscape"
  },
  {
    id: 2,
    name: "LV-BAT-W2.56Ac 壁挂式电池",
    model: "W2.56Ac / W5.12Ac",
    description: "模块化壁挂式储能电池系统，灵活配置容量",
    features: "LiFePO4 电池，95% DoD，超长循环寿命，壁挂式设计节省空间",
    specifications: {
      power: "2.56kWh / 5.12kWh",
      voltage: "51.2V",
      capacity: "50Ah / 100Ah",
      efficiency: "95%+"
    },
    applications: ["家用储能", "备用电源", "太阳能配套"],
    advantages: ["壁挂设计", "节省空间", "模块扩展", "长寿命"],
    image: "https://readdy.ai/api/search-image?query=wall-mounted%20LiFePO4%20battery%20system%20with%20sleek%20white%20cabinet%20design%2C%20residential%20garage%20installation%20showing%20modular%20expandable%20battery%20units%2C%20smart%20BMS%20display%20with%20LED%20indicators%2C%20clean%20home%20energy%20storage%20solution%20mounted%20on%20wall&width=600&height=400&seq=wall-battery&orientation=landscape"
  },
  {
    id: 3,
    name: "LV-BST-H5.12Aa 高压堆叠系统",
    model: "H5.12Aa / L2.56Aa",
    description: "高压堆叠式储能系统，支持大功率应用",
    features: "堆叠式设计，易于扩容，智能BMS管理，适合商用环境",
    specifications: {
      power: "5.12kWh / 2.56kWh",
      voltage: "384V / 256V",
      capacity: "高容量配置",
      efficiency: "96%+"
    },
    applications: ["商业储能", "工业应用", "大功率系统"],
    advantages: ["高压系统", "堆叠扩容", "大功率", "智能BMS"],
    image: "https://readdy.ai/api/search-image?query=high-voltage%20stackable%20battery%20system%20with%20professional%20industrial%20design%2C%20commercial%20energy%20storage%20facility%20showing%20multiple%20stacked%20battery%20modules%2C%20advanced%20BMS%20control%20system%20with%20monitoring%20displays%2C%20scalable%20architecture%20for%20commercial%20applications&width=600&height=400&seq=high-voltage&orientation=landscape"
  },
  {
    id: 4,
    name: "W15-5A 大功率系统",
    model: "W15-5A",
    description: "大功率储能解决方案，适合高负载应用",
    features: "高功率输出，适合大型负载，支持快速充放电，工业级可靠性",
    specifications: {
      power: "15kWh",
      voltage: "48V",
      capacity: "300Ah",
      efficiency: "95%+"
    },
    applications: ["工商业", "离网系统", "大负载应用"],
    advantages: ["大功率", "高可靠", "快充快放", "工业级"],
    image: "https://readdy.ai/api/search-image?query=high-power%2015kWh%20energy%20storage%20system%20for%20industrial%20applications%2C%20large%20commercial%20battery%20cabinet%20with%20advanced%20cooling%20system%2C%20professional%20installation%20in%20commercial%20facility%2C%20heavy-duty%20energy%20storage%20solution%20with%20monitoring%20equipment&width=600&height=400&seq=high-power&orientation=landscape"
  },
  {
    id: 5,
    name: "W30-E5 / W32-E5 企业级系统",
    model: "W30-E5 / W32-E5",
    description: "企业级大容量储能系统，支持大型商业应用",
    features: "企业级可靠性，支持并联扩容，智能能源管理，适合大型项目",
    specifications: {
      power: "30kWh / 32kWh",
      voltage: "384V",
      capacity: "高容量企业级",
      efficiency: "96%+"
    },
    applications: ["大型商业", "工业园区", "数据中心"],
    advantages: ["企业级", "大容量", "并联扩容", "智能管理"],
    image: "https://readdy.ai/api/search-image?query=enterprise-grade%20large%20capacity%20energy%20storage%20system%2C%20commercial%20building%20with%20multiple%20ESS%20containers%2C%20professional%20energy%20management%20facility%20with%20monitoring%20center%2C%20scalable%20commercial%20battery%20installation%20for%20large%20buildings&width=600&height=400&seq=enterprise&orientation=landscape"
  },
  {
    id: 6,
    name: "W8-5C 钠离子电池",
    model: "W8-5C (钠离子)",
    description: "新一代钠离子电池储能系统，成本优化解决方案",
    features: "钠离子技术，成本优势，环保材料，适合大规模应用",
    specifications: {
      power: "8kWh",
      voltage: "25.6V",
      capacity: "钠离子高密度",
      efficiency: "93%+"
    },
    applications: ["成本敏感应用", "大规模储能", "电网储能"],
    advantages: ["成本优势", "环保材料", "钠离子技术", "规模应用"],
    image: "https://readdy.ai/api/search-image?query=sodium-ion%20battery%20energy%20storage%20system%20with%20eco-friendly%20design%2C%20next-generation%20battery%20technology%20installation%2C%20cost-effective%20large-scale%20energy%20storage%20solution%2C%20sustainable%20battery%20materials%20with%20environmental%20benefits%20and%20green%20technology%20focus&width=600&height=400&seq=sodium-ion&orientation=landscape"
  }
];

export default function ProductShowcase({ scrollY }: ProductShowcaseProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [currentProduct, setCurrentProduct] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % typicalProducts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handleProductChange = (index: number) => {
    setCurrentProduct(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const currentProductData = typicalProducts[currentProduct];

  return (
    <section 
      ref={ref}
      className="py-20 bg-white"
      style={{
        transform: `translateY(${Math.max(0, (scrollY - 1600) * 0.02)}px)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            主推<span className="text-blue-700">产品</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Lithium Valley 提供一系列领先的储能产品，满足不同市场需求，以下是我们的主要产品线，涵盖从家用到企业级的完整解决方案
          </p>
        </div>

        {/* 产品选择器 */}
        <div className="flex justify-center mb-12 overflow-x-auto">
          <div className="flex gap-2 bg-gray-100 p-2 rounded-full min-w-max">
            {typicalProducts.map((product, index) => (
              <button
                key={index}
                onClick={() => handleProductChange(index)}
                className={`px-4 py-3 text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full ${
                  currentProduct === index
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-white'
                }`}
              >
                {product.model}
              </button>
            ))}
          </div>
        </div>

        {/* 主要产品展示 */}
        <div className={`transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-gray-50 shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12" data-product-shop>
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
                    {currentProductData.model}
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {currentProductData.name}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {currentProductData.description}
                  </p>
                </div>

                {/* 技术规格 */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">技术规格</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(currentProductData.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-3 bg-white border-l-4 border-blue-600">
                        <span className="text-gray-600 text-sm capitalize">
                          {key === 'power' ? '系统功率' : 
                           key === 'voltage' ? '系统电压' :
                           key === 'capacity' ? '电池容量' :
                           key === 'efficiency' ? '系统效率' : key}:
                        </span>
                        <span className="text-gray-900 font-semibold text-sm">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 产品优势 */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">产品优势</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {currentProductData.advantages.map((advantage, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <i className="ri-check-line w-5 h-5 flex items-center justify-center text-blue-600"></i>
                        <span className="text-gray-700 text-sm">{advantage}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 应用场景 */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">应用场景</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProductData.applications.map((app, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 产品特色 */}
                <div className="bg-blue-50 p-6 border-l-4 border-blue-600 mb-8">
                  <h4 className="text-lg font-semibold text-blue-800 mb-2">产品特色</h4>
                  <p className="text-blue-700 text-sm leading-relaxed">{currentProductData.features}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/product-list">
                    <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full">
                      查看详情
                    </button>
                  </Link>
                  <Link href="/get-started">
                    <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full">
                      获取报价
                    </button>
                  </Link>
                </div>

              </div>

              <div className="relative">
                <img
                  src={currentProductData.image}
                  alt={currentProductData.name}
                  className="w-full h-full object-cover object-top transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* 轮播指示器 */}
                <div className="absolute bottom-6 left-6 flex gap-2">
                  {typicalProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleProductChange(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                        currentProduct === index ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 产品网格展示 */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">完整产品系列</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {typicalProducts.map((product, index) => (
              <div
                key={product.id}
                className={`bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => handleProductChange(index)}
                data-product-shop
              >
                <div className="relative mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 text-white px-2 py-1 text-xs font-medium rounded">
                      {product.model}
                    </span>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h4>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {product.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.applications.slice(0, 2).map((app, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      {app}
                    </span>
                  ))}
                </div>
                
                <Link href={`/product-detail?id=${product.id}`}>
                  <button className="w-full bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded">
                    查看详情
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
