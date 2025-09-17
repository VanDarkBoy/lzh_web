
'use client';

import { useState } from 'react';

interface TeamSectionProps {
  scrollY: number;
}

interface Location {
  id: string;
  name: string;
  nameEn: string;
  type: string;
  description: string;
  manager: string;
  email: string;
  position: { top: string; left: string };
  image: string;
}

export default function TeamSection({ scrollY }: TeamSectionProps) {
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);

  const locations: Location[] = [
    // 工厂
    {
      id: 'dongguan-factory',
      name: '东莞制造工厂',
      nameEn: 'Dongguan Manufacturing Plant',
      type: '制造工厂',
      description: '主要制造基地，生产储能电池系统',
      manager: '张明',
      email: 'zhang.ming@lithiumvalley.com',
      position: { top: '35%', left: '76%' },
      image: 'https://readdy.ai/api/search-image?query=Modern%20lithium%20battery%20manufacturing%20plant%20in%20Dongguan%20China%2C%20large%20industrial%20facility%20with%20clean%20production%20lines%2C%20professional%20factory%20building%20with%20energy%20storage%20equipment%2C%20blue%20and%20white%20corporate%20colors&width=300&height=200&seq=factory-dongguan&orientation=landscape'
    },
    {
      id: 'vietnam-factory',
      name: '越南制造工厂',
      nameEn: 'Vietnam Manufacturing Plant',
      type: '制造工厂',
      description: '东南亚生产基地，服务亚太市场',
      manager: 'Nguyen Van Duc',
      email: 'nguyen.vd@lithiumvalley.com',
      position: { top: '42%', left: '74%' },
      image: 'https://readdy.ai/api/search-image?query=Modern%20manufacturing%20plant%20in%20Vietnam%20for%20battery%20production%2C%20industrial%20facility%20with%20clean%20architecture%2C%20professional%20factory%20building%20with%20energy%20storage%20systems%2C%20sustainable%20production%20facility&width=300&height=200&seq=factory-vietnam&orientation=landscape'
    },
    {
      id: 'nigeria-factory',
      name: '尼日利亚制造工厂',
      nameEn: 'Nigeria Manufacturing Plant',
      type: '制造工厂',
      description: '非洲生产基地，服务非洲市场',
      manager: 'Emeka Okafor',
      email: 'emeka.o@lithiumvalley.com',
      position: { top: '48%', left: '52%' },
      image: 'https://readdy.ai/api/search-image?query=Energy%20storage%20manufacturing%20facility%20in%20Nigeria%20Africa%2C%20modern%20industrial%20building%20with%20solar%20panels%2C%20professional%20factory%20for%20battery%20production%2C%20sustainable%20manufacturing%20plant&width=300&height=200&seq=factory-nigeria&orientation=landscape'
    },
    
    // 海外分部
    {
      id: 'spain-branch',
      name: '西班牙分部',
      nameEn: 'Spain Branch Office',
      type: '海外分部',
      description: '欧洲总部，负责欧洲市场开发',
      manager: 'Carlos Rodriguez',
      email: 'carlos.r@lithiumvalley.com',
      position: { top: '30%', left: '48%' },
      image: 'https://readdy.ai/api/search-image?query=Professional%20office%20building%20in%20Spain%20for%20renewable%20energy%20company%2C%20modern%20architecture%20with%20sustainable%20design%2C%20European%20business%20district%2C%20contemporary%20corporate%20building%20with%20solar%20technology&width=300&height=200&seq=branch-spain&orientation=landscape'
    },
    {
      id: 'italy-branch',
      name: '意大利分部',
      nameEn: 'Italy Branch Office',
      type: '海外分部',
      description: '南欧市场服务中心',
      manager: 'Marco Rossi',
      email: 'marco.r@lithiumvalley.com',
      position: { top: '32%', left: '53%' },
      image: 'https://readdy.ai/api/search-image?query=Modern%20office%20building%20in%20Italy%20for%20energy%20storage%20company%2C%20elegant%20Italian%20architecture%20with%20green%20technology%20elements%2C%20professional%20business%20facility%20in%20European%20setting&width=300&height=200&seq=branch-italy&orientation=landscape'
    },
    {
      id: 'south-africa-branch',
      name: '南非分部',
      nameEn: 'South Africa Branch',
      type: '海外分部',
      description: '非洲市场服务中心',
      manager: 'Thabo Mthembu',
      email: 'thabo.m@lithiumvalley.com',
      position: { top: '65%', left: '56%' },
      image: 'https://readdy.ai/api/search-image?query=Professional%20office%20building%20in%20South%20Africa%20for%20renewable%20energy%20company%2C%20modern%20architecture%20with%20sustainable%20design%20elements%2C%20African%20business%20district%2C%20contemporary%20corporate%20building&width=300&height=200&seq=branch-south-africa&orientation=landscape'
    },
    {
      id: 'kenya-branch',
      name: '肯尼亚分部',
      nameEn: 'Kenya Branch Office',
      type: '海外分部',
      description: '东非市场开发中心',
      manager: 'James Kimani',
      email: 'james.k@lithiumvalley.com',
      position: { top: '58%', left: '58%' },
      image: 'https://readdy.ai/api/search-image?query=Modern%20office%20building%20in%20Kenya%20for%20energy%20storage%20company%2C%20professional%20architecture%20with%20solar%20technology%2C%20East%20African%20business%20environment%2C%20contemporary%20corporate%20facility&width=300&height=200&seq=branch-kenya&orientation=landscape'
    },
    {
      id: 'australia-branch',
      name: '澳大利亚分部',
      nameEn: 'Australia Branch Office',
      type: '海外分部',
      description: '大洋洲市场服务中心',
      manager: 'David Wilson',
      email: 'david.w@lithiumvalley.com',
      position: { top: '75%', left: '85%' },
      image: 'https://readdy.ai/api/search-image?query=Professional%20office%20building%20in%20Australia%20for%20renewable%20energy%20company%2C%20modern%20architecture%20with%20sustainable%20design%2C%20Australian%20business%20district%2C%20contemporary%20corporate%20building%20with%20solar%20panels&width=300&height=200&seq=branch-australia&orientation=landscape'
    },
    {
      id: 'brazil-branch',
      name: '巴西分部',
      nameEn: 'Brazil Branch Office',
      type: '海外分部',
      description: '南美市场服务中心',
      manager: 'Ricardo Silva',
      email: 'ricardo.s@lithiumvalley.com',
      position: { top: '70%', left: '35%' },
      image: 'https://readdy.ai/api/search-image?query=Modern%20office%20building%20in%20Brazil%20for%20energy%20storage%20company%2C%20contemporary%20architecture%20with%20sustainable%20elements%2C%20South%20American%20business%20district%2C%20professional%20corporate%20facility&width=300&height=200&seq=branch-brazil&orientation=landscape'
    },
    {
      id: 'pakistan-branch',
      name: '巴基斯坦分部',
      nameEn: 'Pakistan Branch Office',
      type: '海外分部',
      description: '南亚市场开发中心',
      manager: 'Ahmed Khan',
      email: 'ahmed.k@lithiumvalley.com',
      position: { top: '40%', left: '68%' },
      image: 'https://readdy.ai/api/search-image?query=Professional%20office%20building%20in%20Pakistan%20for%20renewable%20energy%20company%2C%20modern%20architecture%20with%20energy%20technology%20elements%2C%20South%20Asian%20business%20environment%2C%20contemporary%20corporate%20building&width=300&height=200&seq=branch-pakistan&orientation=landscape'
    },
    {
      id: 'india-branch',
      name: '印度分部',
      nameEn: 'India Branch Office',
      type: '海外分部',
      description: '南亚市场服务中心',
      manager: 'Raj Patel',
      email: 'raj.p@lithiumvalley.com',
      position: { top: '42%', left: '70%' },
      image: 'https://readdy.ai/api/search-image?query=Modern%20office%20building%20in%20India%20for%20energy%20storage%20company%2C%20contemporary%20architecture%20with%20sustainable%20technology%2C%20Indian%20business%20district%2C%20professional%20corporate%20facility%20with%20renewable%20energy%20elements&width=300&height=200&seq=branch-india&orientation=landscape'
    },
    {
      id: 'tanzania-branch',
      name: '坦桑尼亚分部',
      nameEn: 'Tanzania Branch Office',
      type: '海外分部',
      description: '东非项目服务中心',
      manager: 'John Mwamba',
      email: 'john.m@lithiumvalley.com',
      position: { top: '62%', left: '59%' },
      image: 'https://readdy.ai/api/search-image?query=Professional%20office%20building%20in%20Tanzania%20for%20renewable%20energy%20company%2C%20modern%20architecture%20with%20sustainable%20design%2C%20East%20African%20business%20environment%2C%20contemporary%20corporate%20building&width=300&height=200&seq=branch-tanzania&orientation=landscape'
    },

    // 海外仓
    {
      id: 'hungary-warehouse',
      name: '匈牙利海外仓',
      nameEn: 'Hungary Overseas Warehouse',
      type: '海外仓',
      description: '欧洲客户交付中心',
      manager: 'László Nagy',
      email: 'laszlo.n@lithiumvalley.com',
      position: { top: '28%', left: '55%' },
      image: 'https://readdy.ai/api/search-image?query=Modern%20warehouse%20and%20distribution%20center%20in%20Hungary%2C%20large%20logistics%20facility%20for%20energy%20storage%20equipment%2C%20professional%20industrial%20building%20with%20clean%20architecture%2C%20European%20distribution%20hub&width=300&height=200&seq=warehouse-hungary&orientation=landscape'
    },
    {
      id: 'poland-warehouse',
      name: '波兰海外仓',
      nameEn: 'Poland Overseas Warehouse',
      type: '海外仓',
      description: '中东欧物流中心',
      manager: 'Piotr Kowalski',
      email: 'piotr.k@lithiumvalley.com',
      position: { top: '26%', left: '57%' },
      image: 'https://readdy.ai/api/search-image?query=Large%20warehouse%20facility%20in%20Poland%20for%20energy%20storage%20logistics%2C%20modern%20distribution%20center%20with%20professional%20architecture%2C%20Central%20European%20logistics%20hub%20for%20battery%20storage%20systems&width=300&height=200&seq=warehouse-poland&orientation=landscape'
    }
  ];

  const getLocationTypeColor = (type: string) => {
    switch (type) {
      case '制造工厂':
        return 'bg-green-600';
      case '海外分部':
        return 'bg-blue-600';
      case '海外仓':
        return 'bg-orange-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getLocationTypeColorLight = (type: string) => {
    switch (type) {
      case '制造工厂':
        return 'bg-green-100 text-green-600';
      case '海外分部':
        return 'bg-blue-100 text-blue-600';
      case '海外仓':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题部分 */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
            全球布局
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            全球战略布局
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              就近服务客户
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            在全球设立制造工厂、分部办事处和海外仓库，为客户提供就近的专业服务和快速交付
          </p>
        </div>

        {/* 世界地图展示 */}
        <div className="relative mb-16">
          <div className="relative w-full max-w-6xl mx-auto">
            <img 
              src="https://readdy.ai/api/search-image?query=World%20map%20silhouette%20with%20clean%20blue%20and%20gray%20colors%2C%20professional%20business%20world%20map%20for%20global%20company%20locations%2C%20minimal%20design%20with%20clear%20continent%20outlines%2C%20corporate%20style%20geography%20map&width=1200&height=600&seq=world-map-clean&orientation=landscape"
              alt="全球布局地图"
              className="w-full h-auto"
            />
            
            {/* 位置标记点 */}
            {locations.map((location) => (
              <div
                key={location.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ top: location.position.top, left: location.position.left }}
                onMouseEnter={() => setHoveredLocation(location)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                {/* 标记点 */}
                <div className="relative">
                  <div className={`w-4 h-4 ${getLocationTypeColor(location.type)} rounded-full border-2 border-white shadow-lg animate-pulse`}></div>
                  <div className={`absolute inset-0 w-4 h-4 ${getLocationTypeColor(location.type)} rounded-full opacity-30 animate-ping`}></div>
                </div>
                
                {/* 简短标签 */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md whitespace-nowrap text-xs font-medium text-gray-800 border opacity-0 group-hover:opacity-100 transition-opacity">
                  {location.name}
                </div>
              </div>
            ))}
          </div>

          {/* 悬浮详情卡片 */}
          {hoveredLocation && (
            <div 
              className="fixed z-50 bg-white rounded-xl shadow-2xl p-6 border max-w-sm transform -translate-x-1/2 -translate-y-full pointer-events-none"
              style={{ 
                top: '50%',
                left: '50%',
                marginTop: '-100px'
              }}
            >
              <img 
                src={hoveredLocation.image}
                alt={hoveredLocation.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <div className="mb-3">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getLocationTypeColorLight(hoveredLocation.type)}`}>
                  {hoveredLocation.type}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {hoveredLocation.name}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {hoveredLocation.nameEn}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                {hoveredLocation.description}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-700">
                  <i className="ri-user-line text-blue-600 mr-2 w-4 h-4 flex items-center justify-center"></i>
                  <span>{hoveredLocation.manager}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <i className="ri-mail-line text-blue-600 mr-2 w-4 h-4 flex items-center justify-center"></i>
                  <span className="text-xs">{hoveredLocation.email}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 图例和统计 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 图例 */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">布局类型</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-600 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold text-gray-900">制造工厂</div>
                  <div className="text-sm text-gray-600">中国东莞、越南、尼日利亚</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold text-gray-900">海外分部</div>
                  <div className="text-sm text-gray-600">西班牙、意大利、南非、肯尼亚、澳大利亚、巴西、巴基斯坦、印度、坦桑尼亚</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-600 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold text-gray-900">海外仓</div>
                  <div className="text-sm text-gray-600">匈牙利、波兰</div>
                </div>
              </div>
            </div>
          </div>

          {/* 统计数据 */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">全球布局数据</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">3</div>
                <div className="text-gray-700 font-medium">制造工厂</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">9</div>
                <div className="text-gray-700 font-medium">海外分部</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">2</div>
                <div className="text-gray-700 font-medium">海外仓库</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-700 font-medium">全球服务</div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">服务优势</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 就近生产，降低物流成本</li>
                <li>• 本地化服务，快速响应客户需求</li>
                <li>• 全球统一标准，确保产品质量</li>
                <li>• 24小时技术支持，无时差服务</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
