
'use client';

import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import Link from 'next/link';

interface ProductCategoriesProps {
  scrollY: number;
}

const categories = [
  {
    id: 1,
    name: "住宅储能系统",
    description: "适用于家庭，安装简便，安全高效",
    details: "专为家庭用户设计，支持太阳能配套使用，提供不间断电源保障。模块化设计便于安装和维护，智能管理系统自动优化能源使用。",
    features: ["安装简便", "安全高效", "智能管理", "太阳能配套"],
    capacity: "2.56kWh - 15.36kWh",
    applications: "家庭备用电源、峰谷套利、光伏储能",
    image: "https://readdy.ai/api/search-image?query=modern%20residential%20energy%20storage%20system%20installed%20on%20house%20wall%2C%20sleek%20white%20LiFePO4%20battery%20cabinet%20with%20digital%20display%2C%20beautiful%20family%20home%20with%20solar%20panels%20on%20roof%2C%20clean%20garage%20installation%20showing%20battery%20management%20system%2C%20professional%20residential%20setting%20with%20safety%20equipment&width=600&height=400&seq=residential-storage&orientation=landscape"
  },
  {
    id: 2,
    name: "商用储能系统",
    description: "容量从 60kWh 至 2MWh，适用于中小型商业应用",
    details: "大容量储能解决方案，帮助工商业用户降低能源成本，提供峰谷套利和需量管理功能。支持并联扩容，满足不同规模需求。",
    features: ["大容量", "成本降低", "需量管理", "并联扩容"],
    capacity: "60kWh - 2MWh",
    applications: "工厂、商场、写字楼、工业园区",
    image: "https://readdy.ai/api/search-image?query=large%20commercial%20energy%20storage%20facility%20with%20industrial%20battery%20containers%2C%20professional%20warehouse%20setting%20with%20multiple%20ESS%20units%20and%20monitoring%20systems%2C%20commercial%20building%20with%20energy%20management%20equipment%2C%20business%20environment%20with%20scalable%20battery%20architecture%20and%20safety%20systems&width=600&height=400&seq=commercial-storage&orientation=landscape"
  },
  {
    id: 3,
    name: "房车系统",
    description: "集成显示、保护与控制功能，提供持续稳定的电力供应",
    details: "专为房车和移动应用设计，集成显示屏、保护电路和智能控制系统。轻量化设计，支持快速充电，适应户外各种环境。",
    features: ["集成控制", "户外适用", "快速充电", "轻量设计"],
    capacity: "12.8V - 25.6V 系列",
    applications: "房车、游艇、露营车、移动设备",
    image: "https://readdy.ai/api/search-image?query=RV%20recreational%20vehicle%20with%20compact%20lithium%20energy%20storage%20system%2C%20modern%20motorhome%20interior%20showing%20installed%20battery%20unit%20with%20digital%20control%20panel%2C%20outdoor%20camping%20scene%20with%20solar%20panels%20on%20RV%20roof%2C%20adventure%20lifestyle%20with%20mobile%20power%20solution%20and%20wireless%20monitoring&width=600&height=400&seq=rv-storage&orientation=landscape"
  },
  {
    id: 4,
    name: "铅酸替代系统",
    description: "使用 LiFePO₄ 技术替代传统铅酸电池，环保且寿命更长",
    details: "直接替换传统铅酸电池，无需修改现有系统。使用寿命是铅酸电池的3-5倍，重量轻50%，充电速度快3倍，维护成本几乎为零。",
    features: ["直接替换", "免维护", "环保材料", "长寿命"],
    capacity: "12V - 48V 系列",
    applications: "UPS系统、通信基站、应急照明、电动叉车",
    image: "https://readdy.ai/api/search-image?query=lithium%20battery%20replacement%20comparison%20showing%20modern%20LiFePO4%20vs%20traditional%20lead-acid%20batteries%2C%20industrial%20setting%20with%20battery%20upgrade%20installation%2C%20telecommunications%20equipment%20room%20with%20new%20lithium%20systems%2C%20maintenance-free%20design%20with%20environmental%20benefits%20and%20efficiency%20improvements&width=600&height=400&seq=replacement-storage&orientation=landscape"
  },
  {
    id: 5,
    name: "动力电池",
    description: "适用于电动设备，提供蓝牙监控与超长的循环寿命",
    details: "高性能动力电池，配备先进BMS和蓝牙监控功能。支持大电流放电，循环寿命超过6000次，适用于各种电动设备和动力应用。",
    features: ["蓝牙监控", "大电流", "高循环", "BMS保护"],
    capacity: "定制化容量配置",
    applications: "电动工具、电动车辆、机器人、无人机",
    image: "https://readdy.ai/api/search-image?query=high-performance%20lithium%20power%20batteries%20with%20bluetooth%20monitoring%20technology%2C%20professional%20battery%20modules%20with%20digital%20displays%20and%20wireless%20connectivity%2C%20industrial%20power%20equipment%20setting%2C%20advanced%20battery%20management%20system%20with%20smartphone%20app%20control%20and%20real-time%20monitoring&width=600&height=400&seq=power-storage&orientation=landscape"
  }
];

export default function ProductCategories({ scrollY }: ProductCategoriesProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <section 
      ref={ref}
      className="py-20 bg-gray-50"
      style={{
        transform: `translateY(${Math.max(0, (scrollY - 800) * 0.02)}px)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6">
            产品系列
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            产品<span className="text-blue-700">分类</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            覆盖家用、工商业、动力等全场景应用，提供高效可靠的储能解决方案
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`cursor-pointer transition-all duration-300 ${
                selectedCategory.id === category.id
                  ? 'transform scale-105'
                  : 'hover:transform hover:scale-102'
              } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedCategory(category)}
            >
              <div className={`p-6 text-center transition-all duration-300 ${
                selectedCategory.id === category.id
                  ? 'bg-blue-600 text-white shadow-xl'
                  : 'bg-white text-gray-900 hover:shadow-lg'
              }`}>
                <div className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center text-2xl ${
                  selectedCategory.id === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  <i className={`${
                    index === 0 ? 'ri-home-line' :
                    index === 1 ? 'ri-building-line' :
                    index === 2 ? 'ri-truck-line' :
                    index === 3 ? 'ri-recycle-line' :
                    'ri-battery-charge-line'
                  } w-8 h-8 flex items-center justify-center`}></i>
                </div>
                <h3 className="font-semibold text-sm mb-2 leading-tight">
                  {category.name}
                </h3>
                <p className={`text-xs leading-relaxed ${
                  selectedCategory.id === category.id ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={`bg-white shadow-2xl overflow-hidden transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-8 lg:p-12" data-product-shop>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
                  {selectedCategory.capacity}
                </span>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedCategory.name}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {selectedCategory.details}
                </p>
              </div>
              
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">产品特色</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedCategory.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <i className="ri-check-line w-5 h-5 flex items-center justify-center text-blue-600"></i>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">应用场景</h4>
                <p className="text-gray-600">{selectedCategory.applications}</p>
              </div>
              
              <div className="flex gap-4">
                <Link href="/get-started">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full">
                    获取报价
                  </button>
                </Link>
                <Link href={`/product-detail?id=${selectedCategory.id}`}>
                  <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full">
                    查看详情
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={selectedCategory.image}
                alt={selectedCategory.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
