
'use client';

import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

interface ProductSpecsProps {
  scrollY: number;
}

const typicalProducts = [
  {
    name: "LV2500W HB 堆叠式一体化 ESS",
    model: "LV2500W HB",
    description: "逆变器+UPS+充电一体化设计",
    specifications: "2.5kW",
    features: "IP65 防护等级，安装效率提升 50%",
    voltage: "48V",
    capacity: "100Ah",
    applications: "住宅储能、小型商业",
    image: "https://readdy.ai/image/78fade42075db25ed5a2e70ff249826e/c20cc0fe039ddd52825252d69d124fa4.webp"
  },
  {
    name: "LV-BAT-W2.56Ac 壁挂式电池",
    model: "W2.56Ac / W5.12Ac",
    description: "模块化壁挂式储能电池系统",
    specifications: "2.56kWh / 5.12kWh",
    features: "LiFePO4 电池，95% DoD，超长循环寿命",
    voltage: "51.2V",
    capacity: "50Ah / 100Ah",
    applications: "家用储能、备用电源",
    image: "https://readdy.ai/image/78fade42075db25ed5a2e70ff249826e/9e8ad7fd0d25e84f760b3fdf647e2dbd.webp"
  },
  {
    name: "LV-BST-H5.12Aa 高压堆叠系统",
    model: "H5.12Aa / L2.56Aa",
    description: "高压堆叠式储能系统",
    specifications: "5.12kWh / 2.56kWh",
    features: "堆叠式设计，易于扩容，智能BMS管理",
    voltage: "384V / 256V",
    capacity: "高容量配置",
    applications: "商业储能、工业应用",
    image: "https://readdy.ai/image/78fade42075db25ed5a2e70ff249826e/6ad2bd1483f31d0a94f9b3eefdd1438a.webp"
  },
  {
    name: "W15-5A 大功率系统",
    model: "W15-5A",
    description: "大功率储能解决方案",
    specifications: "15kWh",
    features: "高功率输出，适合大型负载",
    voltage: "48V",
    capacity: "300Ah",
    applications: "工商业、离网系统",
    image: "https://readdy.ai/image/78fade42075db25ed5a2e70ff249826e/4ecd39ccdf1c1d8052ac0e4685b65499.webp"
  },
  {
    name: "W30-E5 / W32-E5 企业级系统",
    model: "W30-E5 / W32-E5",
    description: "企业级大容量储能系统",
    specifications: "30kWh / 32kWh",
    features: "企业级可靠性，支持并联扩容",
    voltage: "384V",
    capacity: "高容量企业级",
    applications: "大型商业、工业园区",
    image: "https://readdy.ai/image/78fade42075db25ed5a2e70ff249826e/6ad2bd1483f31d0a94f9b3eefdd1438a.webp"
  },
  {
    name: "W8-5C 钠离子电池",
    model: "W8-5C (钠离子)",
    description: "新一代钠离子电池储能系统",
    specifications: "8kWh",
    features: "钠离子技术，成本优势，环保材料",
    voltage: "25.6V",
    capacity: "钠离子高密度",
    applications: "成本敏感应用、大规模储能",
    image: "https://readdy.ai/image/78fade42075db25ed5a2e70ff249826e/9e8ad7fd0d25e84f760b3fdf647e2dbd.webp"
  }
];

export default function ProductSpecs({ scrollY }: ProductSpecsProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [selectedProduct, setSelectedProduct] = useState(0);

  const renderSpecifications = () => {
    const product = typicalProducts[selectedProduct];
    
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 pb-3">
          <span className="text-gray-600 font-medium mb-1 sm:mb-0">产品型号:</span>
          <span className="text-gray-900 font-semibold">{product.model}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 pb-3">
          <span className="text-gray-600 font-medium mb-1 sm:mb-0">系统容量:</span>
          <span className="text-gray-900 font-semibold">{product.specifications}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 pb-3">
          <span className="text-gray-600 font-medium mb-1 sm:mb-0">系统电压:</span>
          <span className="text-gray-900 font-semibold">{product.voltage}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 pb-3">
          <span className="text-gray-600 font-medium mb-1 sm:mb-0">电池容量:</span>
          <span className="text-gray-900 font-semibold">{product.capacity}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 pb-3">
          <span className="text-gray-600 font-medium mb-1 sm:mb-0">应用场景:</span>
          <span className="text-gray-900 font-semibold">{product.applications}</span>
        </div>
        
        <div className="bg-blue-50 p-4 sm:p-6 border-l-4 border-blue-600 mt-6">
          <h4 className="text-lg font-semibold text-blue-800 mb-2">产品特色</h4>
          <p className="text-blue-700 text-sm">{product.features}</p>
        </div>
        
        <div className="bg-gray-50 p-4 sm:p-6 mt-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">产品描述</h4>
          <p className="text-gray-700 text-sm">{product.description}</p>
        </div>
      </div>
    );
  };

  return (
    <section 
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-white"
      style={{
        transform: `translateY(${Math.max(0, (scrollY - 2000) * 0.02)}px)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6">
            典型
            <br />
            <span className="text-blue-700">产品</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Lithium Valley 储能系统核心产品线，从家用到企业级的全系列解决方案
          </p>
        </div>

        <div className="flex justify-center mb-12 overflow-x-auto">
          <div className="flex gap-2 sm:gap-4 bg-gray-100 p-2 rounded-full min-w-max">
            {typicalProducts.map((product, index) => (
              <button
                key={index}
                onClick={() => setSelectedProduct(index)}
                className={`px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  selectedProduct === index
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-white'
                } rounded-full`}
              >
                {product.model}
              </button>
            ))}
          </div>
        </div>

        <div className={`transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1" data-product-shop>
              <div className="bg-gray-50 p-6 sm:p-8 shadow-lg">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                  {typicalProducts[selectedProduct].name}
                </h3>
                
                {renderSpecifications()}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative overflow-hidden shadow-2xl rounded-lg">
                <img
                  src={typicalProducts[selectedProduct].image}
                  alt={typicalProducts[selectedProduct].name}
                  className="w-full h-96 sm:h-[500px] object-contain bg-white transition-all duration-500 p-4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
