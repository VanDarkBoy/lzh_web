
'use client';

import Link from 'next/link';
import { useState } from 'react';

interface ProductGridProps {
  scrollY: number;
}

export default function ProductGrid({ scrollY }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const products = [
    // 家用储能系统 - 5个产品
    {
      id: 'lv2500w-hb',
      name: 'LV2500W HB 堆叠式一体化ESS',
      category: 'residential',
      image: 'https://readdy.ai/api/search-image?query=Modern%20white%20stackable%20home%20energy%20storage%20system%20with%20integrated%20inverter%20and%20UPS%20functions%2C%20sleek%20modular%20design%20ESS%20unit%20with%20digital%20display%2C%20professional%20product%20photography%20on%20white%20background&width=400&height=400&seq=lv2500w-hb&orientation=squarish',
      description: '集成逆变器、UPS和充电系统，模块化设计，IP65防护等级',
      specs: '2.56kWh | 5.12kWh可扩展',
      features: ['一体化设计', 'IP65防护', '安装效率提升50%']
    },
    {
      id: 'lv-bat-w256ac',
      name: 'LV-BAT-W2.56Ac 壁挂式电池',
      category: 'residential',
      image: 'https://readdy.ai/api/search-image?query=Compact%20wall-mounted%20lithium%20battery%20unit%20with%20sleek%20white%20housing%20and%20digital%20display%2C%20residential%20energy%20storage%20battery%20pack%20for%20home%20installation%2C%20clean%20modern%20design%20on%20white%20background&width=400&height=400&seq=lv-bat-w256&orientation=squarish',
      description: '紧凑型壁挂式设计，适合家庭储能应用',
      specs: '2.56kWh | LiFePO₄电池',
      features: ['壁挂安装', '安全可靠', '长寿命设计']
    },
    {
      id: 'lv-bat-w512ac',
      name: 'LV-BAT-W5.12Ac 大容量壁挂电池',
      category: 'residential',
      image: 'https://readdy.ai/api/search-image?query=Large%20capacity%20wall-mounted%20battery%20system%20with%20modern%20white%20design%20and%20integrated%20control%20panel%2C%20high-capacity%20residential%20ESS%20unit%2C%20professional%20energy%20storage%20product%20photography&width=400&height=400&seq=lv-bat-w512&orientation=squarish',
      description: '大容量壁挂式储能系统，满足更大功率需求',
      specs: '5.12kWh | 高容量配置',
      features: ['大容量', '智能管理', '高效充放电']
    },
    {
      id: 'home-stack-10k',
      name: 'LV-HOME-10K 家用堆叠系统',
      category: 'residential',
      image: 'https://readdy.ai/api/search-image?query=Residential%20stackable%20energy%20storage%20system%20with%2010kWh%20capacity%2C%20modern%20home%20battery%20solution%20with%20white%20and%20gray%20design%2C%20family-friendly%20ESS%20with%20safety%20features&width=400&height=400&seq=home-stack-10k&orientation=squarish',
      description: '10kWh大容量家用堆叠系统，支持全屋用电',
      specs: '10kWh | 堆叠扩展',
      features: ['大容量配置', '全屋供电', '安全防护']
    },
    {
      id: 'home-smart-7k',
      name: 'LV-SMART-7K 智能家用系统',
      category: 'residential',
      image: 'https://readdy.ai/api/search-image?query=Smart%20home%20energy%20storage%20system%20with%207kWh%20capacity%20and%20intelligent%20control%20features%2C%20residential%20ESS%20with%20app%20connectivity%20and%20modern%20white%20design&width=400&height=400&seq=home-smart-7k&orientation=squarish',
      description: '7kWh智能家用储能，支持APP远程控制',
      specs: '7kWh | 智能控制',
      features: ['APP控制', '智能优化', '远程监控']
    },

    // 工商业ESS - 5个产品
    {
      id: 'lv-bst-h512aa',
      name: 'LV-BST-H5.12Aa 高压堆叠系统',
      category: 'commercial',
      image: 'https://readdy.ai/api/search-image?query=High%20voltage%20stackable%20battery%20system%20with%20multiple%20units%20arranged%20vertically%2C%20commercial%20grade%20ESS%20with%20professional%20gray%20and%20white%20design%2C%20industrial%20energy%20storage%20solution&width=400&height=400&seq=lv-bst-h512&orientation=squarish',
      description: '高压堆叠设计，适用于商业和工业应用',
      specs: '5.12kWh | 高压系统',
      features: ['高压设计', '模块堆叠', '工业级质量']
    },
    {
      id: 'w15-5a',
      name: 'W15-5A 大功率储能系统',
      category: 'commercial',
      image: 'https://readdy.ai/api/search-image?query=Large%20commercial%20energy%20storage%20cabinet%20system%20with%20high%20power%20capacity%2C%20industrial%20ESS%20unit%20with%20ventilation%20and%20monitoring%20systems%2C%20professional%20gray%20cabinet%20design%20for%20business%20applications&width=400&height=400&seq=w15-5a&orientation=squarish',
      description: '大功率商用储能解决方案，适合中大型企业',
      specs: '15kWh | 5A输出',
      features: ['大功率输出', '企业级应用', '智能监控']
    },
    {
      id: 'w30-e5',
      name: 'W30-E5 企业级储能系统',
      category: 'commercial',
      image: 'https://readdy.ai/api/search-image?query=Enterprise%20grade%20energy%20storage%20system%20with%20large%20capacity%20cabinet%20design%2C%20commercial%20ESS%20with%20advanced%20cooling%20and%20management%20systems%2C%20industrial%20white%20and%20gray%20housing%20with%20digital%20controls&width=400&height=400&seq=w30-e5&orientation=squarish',
      description: '企业级大容量储能系统，支持大规模应用',
      specs: '30kWh | E5系列',
      features: ['企业级设计', '大容量配置', '高可靠性']
    },
    {
      id: 'w32-e5',
      name: 'W32-E5 超大容量系统',
      category: 'commercial',
      image: 'https://readdy.ai/api/search-image?query=Ultra%20high%20capacity%20commercial%20energy%20storage%20system%20with%20robust%20cabinet%20design%2C%20large%20scale%20ESS%20for%20industrial%20applications%2C%20professional%20industrial%20design%20with%20advanced%20thermal%20management&width=400&height=400&seq=w32-e5&orientation=squarish',
      description: '超大容量配置，满足工业级储能需求',
      specs: '32kWh | 超大容量',
      features: ['超大容量', '工业级应用', '高效管理']
    },
    {
      id: 'commercial-grid-50k',
      name: 'LV-GRID-50K 电网级储能',
      category: 'commercial',
      image: 'https://readdy.ai/api/search-image?query=Grid-scale%20commercial%20energy%20storage%20system%20with%2050kWh%20capacity%2C%20large%20industrial%20ESS%20container%20with%20professional%20monitoring%20and%20control%20systems%2C%20utility-grade%20energy%20storage%20solution&width=400&height=400&seq=grid-50k&orientation=squarish',
      description: '50kWh电网级储能系统，支持电网调频调峰',
      specs: '50kWh | 电网级',
      features: ['电网级应用', '调频调峰', '大规模储能']
    },

    // 房车控制系统（12V和24V） - 2个产品
    {
      id: 'rv-control-12v',
      name: 'RV-CTRL-12V 房车控制系统',
      category: 'rv',
      image: 'https://readdy.ai/api/search-image?query=RV%20control%20system%20with%2012V%20configuration%20and%20integrated%20display%20panel%2C%20recreational%20vehicle%20battery%20management%20system%20with%20digital%20controls%2C%20compact%20design%20for%20mobile%20applications&width=400&height=400&seq=rv-ctrl-12v&orientation=squarish',
      description: '12V房车专用控制系统，集成显示与保护功能',
      specs: '12V系统 | 集成控制',
      features: ['12V专用', '集成显示', '保护功能']
    },
    {
      id: 'rv-control-24v',
      name: 'RV-CTRL-24V 房车控制系统',
      category: 'rv',
      image: 'https://readdy.ai/api/search-image?query=RV%20control%20system%20with%2024V%20configuration%20and%20advanced%20monitoring%20features%2C%20recreational%20vehicle%20battery%20control%20unit%20with%20digital%20interface%2C%20professional%20mobile%20power%20management%20system&width=400&height=400&seq=rv-ctrl-24v&orientation=squarish',
      description: '24V房车控制系统，适合大功率房车应用',
      specs: '24V系统 | 高功率',
      features: ['24V系统', '大功率控制', '智能监控']
    },

    // 动力电池 - 2个产品
    {
      id: 'power-bt-monitor',
      name: '蓝牙监控动力电池',
      category: 'power',
      image: 'https://readdy.ai/api/search-image?query=Power%20battery%20pack%20with%20Bluetooth%20monitoring%20system%20and%20digital%20display%2C%20advanced%20lithium%20battery%20for%20electric%20vehicles%20with%20wireless%20connectivity%2C%20high%20performance%20battery%20with%20smart%20monitoring&width=400&height=400&seq=power-bt&orientation=squarish',
      description: '配备蓝牙监控功能的高性能动力电池',
      specs: '10kWh | 蓝牙监控',
      features: ['蓝牙监控', '高性能', '长循环寿命']
    },
    {
      id: 'power-industrial',
      name: '工业级动力电池',
      category: 'power',
      image: 'https://readdy.ai/api/search-image?query=Industrial%20grade%20power%20battery%20system%20with%20heavy%20duty%20design%20and%20advanced%20BMS%2C%20professional%20lithium%20battery%20for%20industrial%20equipment%20and%20electric%20vehicles%2C%20robust%20construction%20with%20safety%20features&width=400&height=400&seq=power-industrial&orientation=squarish',
      description: '工业级动力电池，适用于重型设备和电动车辆',
      specs: '20kWh | 工业级',
      features: ['工业级设计', '重型应用', '高安全性']
    }
  ];

  const categories = [
    { id: 'all', name: '全部产品', count: products.length },
    { id: 'residential', name: '家用储能系统', count: products.filter(p => p.category === 'residential').length },
    { id: 'commercial', name: '工商业ESS', count: products.filter(p => p.category === 'commercial').length },
    { id: 'rv', name: '房车控制系统（12V和24V）', count: products.filter(p => p.category === 'rv').length },
    { id: 'power', name: '动力电池', count: products.filter(p => p.category === 'power').length }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 分类筛选 */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-md'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* 产品网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" data-product-shop>
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* 产品图片 */}
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.category === 'residential' && '家用'}
                  {product.category === 'commercial' && '商用'}
                  {product.category === 'rv' && '房车'}
                  {product.category === 'power' && '动力'}
                </div>
              </div>

              {/* 产品信息 */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {product.description}
                </p>
                
                {/* 规格信息 */}
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">技术规格</div>
                  <div className="text-blue-600 font-semibold">{product.specs}</div>
                </div>

                {/* 特性标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* 查看详情按钮 */}
                <div className="flex items-center justify-center">
                  <Link href={`/products/${product.id}`}>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold cursor-pointer whitespace-nowrap">
                      查看详情
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部信息 */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">需要定制解决方案？</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              我们的技术团队可以根据您的具体需求，提供个性化的储能解决方案设计和配置建议
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold cursor-pointer whitespace-nowrap">
                  联系技术专家
                </button>
              </Link>
              <Link href="/get-started">
                <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-semibold cursor-pointer whitespace-nowrap">
                  获取报价方案
                </button>
              </Link>
            </div>
          </div>
        </div>
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
