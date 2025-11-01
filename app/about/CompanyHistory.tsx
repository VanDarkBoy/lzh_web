
'use client';

import { useState } from 'react';

export default function CompanyHistory() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const milestones = [
    {
      year: "2025",
      title: "全球化布局加速",
      description:
        "着眼全球市场，全力加速海外布局进程，快速在尼日利亚、越南建设工厂，深度推进本地化，打磨差异化产品。",
      image:
        "https://readdy.ai/api/search-image?query=Global%20manufacturing%20expansion%20with%20new%20factories%20in%20Nigeria%20and%20Vietnam%2C%20international%20production%20facilities%20with%20modern%20equipment%2C%20global%20business%20acceleration%20strategy&width=400&height=300&seq=2025-milestone&orientation=landscape"
    },
    {
      year: "2023",
      title: "海外布局与战略重组",
      description:
        "公司扩大生产规模，加快海外布局，建立了全球化的生产分销战略体系，陆续在德国、匈牙利、美国和南非等地设立办事处和海外仓库。上市公司宗申动力与我司签订并购协议，收购我司60%股权。",
      image:
        "https://readdy.ai/api/search-image?query=Global%20business%20expansion%20with%20international%20offices%20and%20warehouses%2C%20strategic%20partnership%20with%20listed%20company%2C%20professional%20corporate%20merger%20and%20acquisition%20celebration&width=400&height=300&seq=2023-milestone&orientation=landscape"
    },
    {
      year: "2022",
      title: "市场拓展新动力",
      description: "为了拓展市场份额，公司在武汉设立了营销中心，以便更好地服务当地客户和开拓新市场。营销中心的成立为公司的发展注入了新的动力。",
      image:
        "https://readdy.ai/api/search-image?query=New%20marketing%20center%20establishment%20in%20Wuhan%2C%20professional%20business%20facility%20with%20marketing%20team%2C%20customer%20service%20expansion%20and%20market%20development&width=400&height=300&seq=2022-milestone&orientation=landscape"
    },
    {
      year: "2020",
      title: "储能业务突破",
      description:
        "公司开始进军储能业务，并在南京新增了研发中心。通过不断创新和优化产品，公司成功地将储能设备应用于多个领域，为客户提供更加可靠和高效的解决方案。",
      image:
        "https://readdy.ai/api/search-image?query=Energy storage business development with R&D center in Nanjing, advanced battery technology research facility, innovative storage equipment development&width=400&height=300&seq=2020-milestone&orientation=landscape"
    },
    {
      year: "2018",
      title: "集团化运营升级",
      description:
        "随着业务的快速发展，东莞市锂智慧能源有限公司作为集团公司成立，旨在协调和管理其子工厂，提高整体运营效率和管理水平。",
      image:
        "https://readdy.ai/api/search-image?query=Corporate%20group%20establishment%20in%20Dongguan%2C%20professional%20business%20headquarters%20building%2C%20company%20management%20upgrade%20and%20operational%20efficiency%20improvement&width=400&height=300&seq=2018-milestone&orientation=landscape"
    },
    {
      year: "2013",
      title: "公司创立起航",
      description:
        "深圳市锂谷科技有限公司成立，专注于自主研发和生产AGV(自动导引车)和太阳能电池等智能设备和系统。",
      image:
        "https://readdy.ai/api/search-image?query=Company%20founding%20in%20Shenzhen%20with%20AGV%20automatic%20guided%20vehicles%20and%20solar%20battery%20systems%2C%20startup%20technology%20company%20with%20intelligent%20equipment%20development&width=400&height=300&seq=2013-milestone&orientation=landscape"
    }
  ];

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
          <h2 className="text-4xl font-bold text-gray-900 mb-6">发展历程</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            从初创企业到全球化公司，见证我们在新能源领域的每一个重要时刻
          </p>
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
