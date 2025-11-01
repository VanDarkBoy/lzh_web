
'use client';

import { useState } from 'react';

interface Location {
  id: string;
  name: string;
  nameEn: string;
  type: string;
  description: string;
  manager: string;
  email: string;
  position: { top: string; left: string };
}

export default function GlobalPresence() {
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);

  const locations: Location[] = [
    // 制造工厂
    {
      id: 'dongguan-factory',
      name: '东莞总部工厂',
      nameEn: 'Dongguan Headquarters',
      type: '制造工厂',
      description: '东莞市樟木头镇樟洋社区银洋路11号',
      manager: '张明',
      email: 'zhang.ming@lithiumvalley.com',
      position: { top: '33%', left: '78%' }
    },
    {
      id: 'vietnam-factory',
      name: '越南制造工厂',
      nameEn: 'Vietnam Manufacturing Plant',
      type: '制造工厂',
      description: '越南海阳省金城县富泰镇富泰工业园西区',
      manager: 'Nguyen Van Duc',
      email: 'nguyen.vd@lithiumvalley.com',
      position: { top: '41%', left: '73%' }
    },
    {
      id: 'nigeria-factory',
      name: '尼日利亚制造工厂',
      nameEn: 'Nigeria Manufacturing Plant',
      type: '制造工厂',
      description: '奥贡州伊贝萨镇奥贡广东自贸区',
      manager: 'Emeka Okafor',
      email: 'emeka.o@lithiumvalley.com',
      position: { top: '52%', left: '48%' }
    },
    
    // 国内办公室
    {
      id: 'shenzhen-office',
      name: '深圳办公室',
      nameEn: 'Shenzhen Office',
      type: '国内办公室',
      description: '深圳市龙华新区民治街道汇隆商务中心一期2018',
      manager: '李华',
      email: 'li.hua@lithiumvalley.com',
      position: { top: '34%', left: '78%' }
    },
    {
      id: 'wuhan-office',
      name: '武汉办公室',
      nameEn: 'Wuhan Office',
      type: '国内办公室',
      description: '武汉市江夏区光谷大道万企利yi空间305',
      manager: '王强',
      email: 'wang.qiang@lithiumvalley.com',
      position: { top: '31%', left: '76%' }
    },
    {
      id: 'nanjing-office',
      name: '南京办公室',
      nameEn: 'Nanjing Office',
      type: '国内办公室',
      description: '南京市雨花台区花神大道23号1号楼东5楼507、509室',
      manager: '赵敏',
      email: 'zhao.min@lithiumvalley.com',
      position: { top: '30%', left: '76%' }
    },
    
    // 海外分部
    {
      id: 'germany-office',
      name: '德国办公室',
      nameEn: 'Germany Office',
      type: '海外分部',
      description: '杜塞尔多夫格拉芬贝格大街',
      manager: 'Hans Mueller',
      email: 'hans.m@lithiumvalley.com',
      position: { top: '25%', left: '52%' }
    },
    {
      id: 'italy-office',
      name: '意大利办公室',
      nameEn: 'Italy Office',
      type: '海外分部',
      description: '意大利米兰商务中心',
      manager: 'Marco Rossi',
      email: 'marco.r@lithiumvalley.com',
      position: { top: '29%', left: '52%' }
    },
    {
      id: 'uk-branch',
      name: '英国办公室',
      nameEn: 'UK Office',
      type: '海外分部',
      description: '英国伦敦金融城',
      manager: 'James Smith',
      email: 'james.s@lithiumvalley.com',
      position: { top: '22%', left: '48%' }
    },
    {
      id: 'south-africa-branch',
      name: '南非办公室',
      nameEn: 'South Africa Office',
      type: '海外分部',
      description: '南非约翰内斯堡商务区',
      manager: 'Thabo Mthembu',
      email: 'thabo.m@lithiumvalley.com',
      position: { top: '70%', left: '56%' }
    },
    {
      id: 'kenya-branch',
      name: '肯尼亚办公室',
      nameEn: 'Kenya Office',
      type: '海外分部',
      description: '肯尼亚内罗毕商务中心',
      manager: 'James Kimani',
      email: 'james.k@lithiumvalley.com',
      position: { top: '55%', left: '58%' }
    },
    {
      id: 'australia-branch',
      name: '澳大利亚办公室',
      nameEn: 'Australia Office',
      type: '海外分部',
      description: '澳大利亚悉尼商务区',
      manager: 'David Wilson',
      email: 'david.w@lithiumvalley.com',
      position: { top: '80%', left: '86%' }
    },
    {
      id: 'brazil-branch',
      name: '巴西办公室',
      nameEn: 'Brazil Office',
      type: '海外分部',
      description: '巴西圣保罗商务中心',
      manager: 'Ricardo Silva',
      email: 'ricardo.s@lithiumvalley.com',
      position: { top: '70%', left: '32%' }
    },
    {
      id: 'north-america-office',
      name: '北美办公室',
      nameEn: 'North America Office',
      type: '海外分部',
      description: '美国加利福尼亚商务中心',
      manager: 'Michael Johnson',
      email: 'michael.j@lithiumvalley.com',
      position: { top: '28%', left: '20%' }
    },
    {
      id: 'mexico-office',
      name: '墨西哥办公室',
      nameEn: 'Mexico Office',
      type: '海外分部',
      description: '墨西哥城商务区',
      manager: 'Carlos Rodriguez',
      email: 'carlos.r@lithiumvalley.com',
      position: { top: '43%', left: '23%' }
    },

    // 海外仓
    {
      id: 'hungary-warehouse',
      name: '匈牙利海外仓',
      nameEn: 'Hungary Overseas Warehouse',
      type: '海外仓',
      description: '匈牙利布达佩斯物流中心',
      manager: 'László Nagy',
      email: 'laszlo.n@lithiumvalley.com',
      position: { top: '27%', left: '54%' }
    },
    {
      id: 'poland-warehouse',
      name: '波兰海外仓',
      nameEn: 'Poland Overseas Warehouse',
      type: '海外仓',
      description: '波兰华沙物流中心',
      manager: 'Piotr Kowalski',
      email: 'piotr.k@lithiumvalley.com',
      position: { top: '24%', left: '55%' }
    }
  ];

  const getLocationTypeColor = (type: string) => {
    switch (type) {
      case '制造工厂':
        return 'bg-green-600';
      case '国内办公室':
        return 'bg-purple-600';
      case '海外分部':
        return 'bg-blue-600';
      case '海外仓':
        return 'bg-orange-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            全球领先品牌
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            锂谷科技已建立全球化业务网络，在中国设有总部及多个分公司，越南、尼日利亚设有制造工厂，在德国、英国、意大利、南非、肯尼亚、澳大利亚、巴西、北美、墨西哥等地设有海外办公室，匈牙利、波兰设有海外仓库，基本覆盖全球大部分国家和地区。
          </p>
        </div>

        {/* 世界地图 */}
        <div className="relative mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="relative w-full max-w-5xl mx-auto">
            <img 
              src="https://readdy.ai/api/search-image?query=Clean%20world%20map%20silhouette%20with%20professional%20blue%20and%20gray%20colors%20for%20global%20company%20locations%2C%20minimal%20design%20with%20clear%20continent%20outlines%2C%20corporate%20style%20geography%20map%20for%20business%20presentation&width=1000&height=500&seq=global-map-clean&orientation=landscape"
              alt="全球布局地图"
              className="w-full h-auto opacity-80"
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
                  <div className={`w-4 h-4 ${getLocationTypeColor(location.type)} rounded-full border-2 border-white shadow-lg animate-pulse hover:scale-125 transition-transform`}></div>
                  <div className={`absolute inset-0 w-4 h-4 ${getLocationTypeColor(location.type)} rounded-full opacity-30 animate-ping`}></div>
                </div>
              </div>
            ))}

            {/* 悬浮详情卡片 */}
            {hoveredLocation && (
              <div 
                className="absolute z-50 bg-white rounded-xl shadow-2xl p-6 border max-w-sm transform -translate-x-1/2 -translate-y-full pointer-events-none"
                style={{ 
                  top: hoveredLocation.position.top,
                  left: hoveredLocation.position.left,
                  marginTop: '-140px'
                }}
              >
                <div className="mb-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    hoveredLocation.type === '制造工厂' ? 'bg-green-100 text-green-600' :
                    hoveredLocation.type === '国内办公室' ? 'bg-purple-100 text-purple-600' :
                    hoveredLocation.type === '海外分部' ? 'bg-blue-100 text-blue-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
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
        </div>

        {/* 统计数据和图例 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 制造工厂 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="ri-building-line text-green-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">3</div>
            <div className="text-lg font-semibold text-gray-900 mb-2">制造工厂</div>
            <div className="text-sm text-gray-600">
              中国东莞、越南、尼日利亚
            </div>
          </div>

          {/* 国内办公室 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="ri-home-office-line text-purple-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
            <div className="text-lg font-semibold text-gray-900 mb-2">国内办公室</div>
            <div className="text-sm text-gray-600">
              深圳、武汉、南京
            </div>
          </div>

          {/* 海外分部 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="ri-global-line text-blue-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">9</div>
            <div className="text-lg font-semibold text-gray-900 mb-2">海外分部</div>
            <div className="text-sm text-gray-600">
              覆盖五大洲主要市场
            </div>
          </div>

          {/* 海外仓 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="ri-store-line text-orange-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-2">2</div>
            <div className="text-lg font-semibold text-gray-900 mb-2">海外仓库</div>
            <div className="text-sm text-gray-600">
              匈牙利、波兰
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
