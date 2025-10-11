
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" 
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20clean%20energy%20storage%20facility%20with%20solar%20panels%20and%20battery%20systems%2C%20sustainable%20green%20technology%20landscape%20with%20blue%20sky%2C%20professional%20industrial%20photography%20showing%20renewable%20energy%20infrastructure%20and%20smart%20grid%20systems&width=1920&height=1080&seq=hero-energy-bg&orientation=landscape')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                不仅是电池<br />
                <span className="text-green-400">而是智慧能源</span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed max-w-3xl mx-auto">
                锂智慧提供高安全、模块化的锂电池储能系统，涵盖住宅与商业应用，助力绿色能源与可持续发展
              </p>
              
              {/* 核心亮点 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-shield-check-line text-green-400 text-2xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">可靠</h3>
                  <p className="text-sm text-gray-300">99.9%系统可靠性</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-lock-line text-blue-400 text-2xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">安全</h3>
                  <p className="text-sm text-gray-300">多重安全防护</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-stack-line text-purple-400 text-2xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">模块化</h3>
                  <p className="text-sm text-gray-300">灵活扩展配置</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-leaf-line text-green-400 text-2xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">绿色</h3>
                  <p className="text-sm text-gray-300">环保可持续</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <button className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold cursor-pointer whitespace-nowrap">
                    探索产品
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors text-lg font-semibold cursor-pointer whitespace-nowrap">
                    立即联系
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 产品类别入口 */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">产品分类</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                为不同应用场景提供专业的储能解决方案，满足从家庭到工业的全方位需求
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-product-shop>
              <Link href="/products?category=residential" className="group">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-6 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Modern%20residential%20home%20energy%20storage%20system%20with%20sleek%20white%20design%2C%20wall-mounted%20lithium%20battery%20unit%20with%20digital%20display%2C%20safe%20and%20compact%20home%20ESS%20installation%20in%20clean%20modern%20interior&width=400&height=300&seq=home-storage-category&orientation=landscape" 
                      alt="家用储能系统" 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">家用储能</h3>
                  <p className="text-gray-600 mb-4">安全可靠的家庭储能解决方案，让您的家庭拥有稳定的电力保障</p>
                  <div className="flex items-center text-green-600 font-semibold">
                    了解更多 <i className="ri-arrow-right-line ml-2 w-4 h-4 flex items-center justify-center"></i>
                  </div>
                </div>
              </Link>

              <Link href="/products?category=commercial" className="group">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                  <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-6 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Large%20scale%20commercial%20energy%20storage%20container%20system%2C%20industrial%20ESS%20facility%20with%20multiple%20battery%20cabinets%2C%20professional%20installation%20for%20business%20and%20industrial%20applications&width=400&height=300&seq=commercial-storage-category&orientation=landscape" 
                      alt="商用储能系统" 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">商用储能</h3>
                  <p className="text-gray-600 mb-4">大容量工商业储能方案，帮助企业降低用电成本，提高能源效率</p>
                  <div className="flex items-center text-green-600 font-semibold">
                    了解更多 <i className="ri-arrow-right-line ml-2 w-4 h-4 flex items-center justify-center"></i>
                  </div>
                </div>
              </Link>

              <Link href="/products?category=rv" className="group">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                  <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg mb-6 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Compact%20RV%20recreational%20vehicle%20battery%20system%20with%20integrated%20display%20and%20control%20panel%2C%20portable%20mobile%20energy%20storage%20solution%20for%20travel%20and%20camping%20applications&width=400&height=300&seq=rv-storage-category&orientation=landscape" 
                      alt="房车储能系统" 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">房车储能</h3>
                  <p className="text-gray-600 mb-4">便携式房车储能系统，让您的旅途更加自由自在，随时享受电力保障</p>
                  <div className="flex items-center text-green-600 font-semibold">
                    了解更多 <i className="ri-arrow-right-line ml-2 w-4 h-4 flex items-center justify-center"></i>
                  </div>
                </div>
              </Link>

              <Link href="/products?category=power" className="group">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                  <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg mb-6 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=High%20performance%20lithium%20battery%20pack%20with%20Bluetooth%20monitoring%20system%2C%20advanced%20power%20battery%20solution%20with%20long%20cycle%20life%20for%20electric%20vehicles%20and%20industrial%20equipment&width=400&height=300&seq=power-battery-category&orientation=landscape" 
                      alt="动力电池" 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">动力电池</h3>
                  <p className="text-gray-600 mb-4">高性能动力电池解决方案，为各种应用提供强劲动力支持</p>
                  <div className="flex items-center text-green-600 font-semibold">
                    了解更多 <i className="ri-arrow-right-line ml-2 w-4 h-4 flex items-center justify-center"></i>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 成功案例展示 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">成功案例</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                全球范围内的成功项目，见证我们的专业实力与卓越品质
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 2025年案例 */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Modern%20smart%20home%20with%20advanced%20energy%20storage%20system%2C%20contemporary%20residential%20building%20with%20integrated%20solar%20panels%20and%20sleek%20battery%20storage%2C%20futuristic%20home%20energy%20management%20with%20intelligent%20controls%20and%20monitoring%20displays&width=400&height=240&seq=case-2025&orientation=landscape" 
                    alt="智能家庭储能系统" 
                    className="w-full h-48 object-cover object-top transform group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">家用储能</span>
                  </div>
                  
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-sm">2025</span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center text-white text-sm mb-1">
                      <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center mr-1"></i>
                      北京市海淀区
                    </div>
                    <div className="flex items-center text-white text-sm">
                      <i className="ri-battery-line w-4 h-4 flex items-center justify-center mr-1"></i>
                      500kWh
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">智能家庭储能系统</h3>
                <p className="text-gray-600 text-sm mb-3">10kWh家用储能系统，集成太阳能板，实现家庭用电自给自足</p>
                <div className="text-green-600 font-semibold text-sm">节能85%</div>
              </div>

              {/* 2024年案例 */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Large%20luxury%20villa%20with%20comprehensive%20energy%20storage%20solution%2C%20premium%20residential%20property%20with%20multiple%20battery%20systems%20and%20solar%20integration%2C%20high-end%20home%20with%20sustainable%20energy%20infrastructure&width=400&height=240&seq=case-2024&orientation=landscape" 
                    alt="别墅储能解决方案" 
                    className="w-full h-48 object-cover object-top transform group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">家用储能</span>
                  </div>
                  
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-sm">2024</span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center text-white text-sm mb-1">
                      <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center mr-1"></i>
                      上海市浦东新区
                    </div>
                    <div className="flex items-center text-white text-sm">
                      <i className="ri-battery-line w-4 h-4 flex items-center justify-center mr-1"></i>
                      300kWh
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">别墅储能解决方案</h3>
                <p className="text-gray-600 text-sm mb-3">大容量家用储能系统，支持全屋备电和峰谷套利电价管理</p>
                <div className="text-green-600 font-semibold text-sm">20kWh容量</div>
              </div>

              {/* 2023年案例 */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Modern%20residential%20community%20with%20distributed%20energy%20storage%20systems%2C%20apartment%20complex%20with%20integrated%20renewable%20energy%20and%20battery%20storage%2C%20community-scale%20microgrid%20with%20clean%20energy%20infrastructure&width=400&height=240&seq=case-2023&orientation=landscape" 
                    alt="小区储能微网项目" 
                    className="w-full h-48 object-cover object-top transform group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">家用储能</span>
                  </div>
                  
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-sm">2023</span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center text-white text-sm mb-1">
                      <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center mr-1"></i>
                      北京市朝阳区
                    </div>
                    <div className="flex items-center text-white text-sm">
                      <i className="ri-battery-line w-4 h-4 flex items-center justify-center mr-1"></i>
                      500kWh
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">小区储能微网项目</h3>
                <p className="text-gray-600 text-sm mb-3">社区级储能系统，为小区住户提供清洁能源和应急备电</p>
                <div className="text-green-600 font-semibold text-sm">覆盖200户</div>
              </div>

              {/* 2022年案例 */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Rural%20farmhouse%20with%20rooftop%20solar%20panels%20and%20home%20energy%20storage%20system%2C%20countryside%20residence%20with%20sustainable%20energy%20solution%2C%20agricultural%20setting%20with%20clean%20energy%20technology%20integration&width=400&height=240&seq=case-2022&orientation=landscape" 
                    alt="农村户用储能系统" 
                    className="w-full h-48 object-cover object-top transform group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">家用储能</span>
                  </div>
                  
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-sm">2022</span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center text-white text-sm mb-1">
                      <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center mr-1"></i>
                      山东省临沂市
                    </div>
                    <div className="flex items-center text-white text-sm">
                      <i className="ri-battery-line w-4 h-4 flex items-center justify-center mr-1"></i>
                      150kWh
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">农村户用储能系统</h3>
                <p className="text-gray-600 text-sm mb-3">偏远地区家庭储能解决方案，结合光伏发电提供稳定电力</p>
                <div className="text-green-600 font-semibold text-sm">高效运行</div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/projects">
                <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap">
                  查看更多案例
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">准备开始您的储能之旅？</h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              我们的专业团队将为您提供一对一咨询服务，制定最适合您需求的储能解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold cursor-pointer whitespace-nowrap">
                  立即联系
                </button>
              </Link>
              <Link href="/download">
                <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-600 transition-colors text-lg font-semibold cursor-pointer whitespace-nowrap">
                  下载资料
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
