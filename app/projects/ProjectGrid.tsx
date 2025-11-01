
'use client';

import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

interface ProjectGridProps {
  scrollY: number;
  selectedCategory: string;
}

const allProjects = [
  // 家用储能案例 - 7个案例 (2019-2025)
  {
    id: 1,
    title: "智能家庭储能系统",
    description: "10kWh家用储能系统，集成太阳能板，实现家庭用电自给自足",
    categoryId: "1",
    location: "深圳市南山区",
    caseTime: "2025",
    image: "https://readdy.ai/api/search-image?query=Modern%20smart%20home%20with%20solar%20panels%20and%20energy%20storage%20system%2C%20residential%20building%20with%20integrated%20renewable%20energy%2C%20family%20house%20with%20battery%20storage%20unit%2C%20clean%20architectural%20photography&width=600&height=800&seq=home-storage-1&orientation=portrait",
    stats: "节能85%",
    size: "10kWh"
  },
  {
    id: 2,
    title: "别墅储能解决方案",
    description: "大容量家用储能系统，支持全屋备电和峰谷电价套利",
    categoryId: "1",
    location: "上海市浦东新区",
    caseTime: "2024",
    image: "https://readdy.ai/api/search-image?query=Luxury%20villa%20with%20large%20capacity%20home%20energy%20storage%20system%2C%20modern%20residential%20house%20with%20solar%20roof%20and%20battery%20backup%2C%20elegant%20home%20energy%20solution&width=600&height=800&seq=villa-storage-2&orientation=portrait",
    stats: "20kWh容量",
    size: "20kWh"
  },
  {
    id: 3,
    title: "小区储能微网项目",
    description: "社区级储能系统，为小区住户提供清洁能源和应急备电",
    categoryId: "2",
    location: "北京市海淀区",
    caseTime: "2023",
    image: "https://readdy.ai/api/search-image?query=Residential%20community%20with%20microgrid%20energy%20storage%20system%2C%20modern%20apartment%20complex%20with%20shared%20renewable%20energy%20infrastructure%2C%20community%20solar%20and%20battery%20storage&width=600&height=800&seq=community-storage-3&orientation=portrait",
    stats: "服务200户",
    size: "500kWh"
  },
  {
    id: 4,
    title: "农村户用储能系统",
    description: "偏远地区家庭储能解决方案，结合光伏发电提供可靠电力",
    categoryId: "2",
    location: "广西桂林市",
    caseTime: "2022",
    image: "https://readdy.ai/api/search-image?query=Rural%20home%20with%20off-grid%20solar%20energy%20storage%20system%2C%20countryside%20house%20with%20solar%20panels%20and%20battery%20storage%2C%20remote%20area%20renewable%20energy%20solution&width=600&height=800&seq=rural-storage-4&orientation=portrait",
    stats: "离网运行",
    size: "15kWh"
  },
  {
    id: 5,
    title: "高端住宅储能项目",
    description: "豪华住宅配备智能储能系统，实现能源管理优化",
    categoryId: "3",
    location: "杭州市西湖区",
    caseTime: "2021",
    image: "https://readdy.ai/api/search-image?query=Luxury%20residential%20house%20with%20smart%20energy%20storage%20management%20system%2C%20high-end%20home%20with%20advanced%20battery%20technology%2C%20premium%20residential%20energy%20solution&width=600&height=800&seq=luxury-storage-5&orientation=portrait",
    stats: "智能管理",
    size: "25kWh"
  },
  {
    id: 6,
    title: "联排别墅储能群",
    description: "多户联排别墅共享储能系统，降低用电成本",
    categoryId: "3",
    location: "成都市高新区",
    caseTime: "2020",
    image: "https://readdy.ai/api/search-image?query=Row%20of%20townhouses%20with%20shared%20energy%20storage%20system%2C%20modern%20residential%20development%20with%20community%20battery%20storage%2C%20multiple%20family%20homes%20with%20solar%20energy&width=600&height=800&seq=townhouse-storage-6&orientation=portrait",
    stats: "共享储能",
    size: "100kWh"
  },
  {
    id: 7,
    title: "经济适用房储能试点",
    description: "经济适用房配置小型储能系统，降低居民用电负担",
    categoryId: "4",
    location: "武汉市江汉区",
    caseTime: "2019",
    image: "https://readdy.ai/api/search-image?query=Affordable%20housing%20complex%20with%20small%20scale%20energy%20storage%20systems%2C%20economic%20residential%20buildings%20with%20solar%20panels%2C%20cost-effective%20home%20energy%20solution&width=600&height=800&seq=affordable-storage-7&orientation=portrait",
    stats: "成本节约40%",
    size: "5kWh"
  },

  // 工商业储能案例 - 7个案例 (2019-2025)
  {
    id: 8,
    title: "科技园区储能项目",
    description: "大型科技园区配置储能系统，优化用电成本和电力质量",
    categoryId: "4",
    location: "深圳市南山科技园",
    caseTime: "2025",
    image: "https://readdy.ai/api/search-image?query=Modern%20technology%20park%20with%20large%20scale%20energy%20storage%20system%2C%20commercial%20complex%20with%20renewable%20energy%20infrastructure%2C%20business%20district%20with%20battery%20storage%20facility&width=600&height=800&seq=tech-park-storage-8&orientation=portrait",
    stats: "2MW/4MWh",
    size: "4MWh"
  },
  {
    id: 9,
    title: "制造工厂储能系统",
    description: "制造业工厂部署储能系统，实现削峰填谷和应急备电",
    categoryId: "5",
    location: "东莞市松山湖",
    caseTime: "2024",
    image: "https://readdy.ai/api/search-image?query=Manufacturing%20factory%20with%20industrial%20energy%20storage%20system%2C%20large%20industrial%20facility%20with%20battery%20storage%20and%20solar%20panels%2C%20commercial%20manufacturing%20energy%20solution&width=600&height=800&seq=factory-storage-9&orientation=portrait",
    stats: "削峰30%",
    size: "3MWh"
  },
  {
    id: 10,
    title: "购物中心储能项目",
    description: "大型购物中心配置储能系统，保障商业运营稳定性",
    categoryId: "5",
    location: "广州市天河区",
    caseTime: "2023",
    image: "https://readdy.ai/api/search-image?query=Large%20shopping%20mall%20with%20commercial%20energy%20storage%20system%2C%20retail%20complex%20with%20renewable%20energy%20infrastructure%2C%20commercial%20building%20with%20battery%20backup%20system&width=600&height=800&seq=mall-storage-10&orientation=portrait",
    stats: "不间断运营",
    size: "2.5MWh"
  },
  {
    id: 11,
    title: "数据中心储能解决方案",
    description: "数据中心关键负载储能系统，确保数据安全和业务连续性",
    categoryId: "1",
    location: "上海市张江高科",
    caseTime: "2022",
    image: "https://readdy.ai/api/search-image?query=Data%20center%20facility%20with%20critical%20load%20energy%20storage%20system%2C%20modern%20server%20facility%20with%20backup%20battery%20systems%2C%20commercial%20data%20center%20with%20renewable%20energy&width=600&height=800&seq=datacenter-storage-11&orientation=portrait",
    stats: "99.9%可用性",
    size: "5MWh"
  },
  {
    id: 12,
    title: "物流园区储能系统",
    description: "大型物流园区储能项目，支持电动车充电和仓储运营",
    categoryId: "1",
    location: "杭州市萧山区",
    caseTime: "2021",
    image: "https://readdy.ai/api/search-image?query=Logistics%20park%20with%20energy%20storage%20system%20and%20electric%20vehicle%20charging%2C%20warehouse%20complex%20with%20renewable%20energy%20infrastructure%2C%20commercial%20logistics%20facility&width=600&height=800&seq=logistics-storage-12&orientation=portrait",
    stats: "支持100台充电桩",
    size: "6MWh"
  },
  {
    id: 13,
    title: "酒店集团储能项目",
    description: "连锁酒店配置储能系统，降低运营成本提升服务质量",
    categoryId: "2",
    location: "三亚市海棠湾",
    caseTime: "2020",
    image: "https://readdy.ai/api/search-image?query=Luxury%20hotel%20resort%20with%20energy%20storage%20system%2C%20commercial%20hospitality%20building%20with%20solar%20energy%20and%20battery%20storage%2C%20hotel%20complex%20with%20renewable%20energy&width=600&height=800&seq=hotel-storage-13&orientation=portrait",
    stats: "运营成本降低25%",
    size: "1.5MWh"
  },
  {
    id: 14,
    title: "医院储能备电系统",
    description: "医疗机构关键储能系统，保障医疗设备正常运转",
    categoryId: "2",
    location: "北京市朝阳区",
    caseTime: "2019",
    image: "https://readdy.ai/api/search-image?query=Hospital%20medical%20facility%20with%20critical%20energy%20storage%20backup%20system%2C%20healthcare%20building%20with%20renewable%20energy%20infrastructure%2C%20medical%20center%20with%20battery%20storage&width=600&height=800&seq=hospital-storage-14&orientation=portrait",
    stats: "关键设备保障",
    size: "3.5MWh"
  }
];

export default function ProjectGrid({ scrollY, selectedCategory }: ProjectGridProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredProjects = selectedCategory === 'All' 
    ? allProjects 
    : allProjects.filter(project => project.categoryId === selectedCategory);

  return (
    <section ref={ref} className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group transition-all duration-1000 ${
                inView
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer h-full flex flex-col">
                <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className="bg-emerald-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full font-medium">
                      {project.categoryId}
                    </span>
                  </div>
                  
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <span className="bg-white/90 text-gray-800 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full font-medium">
                      {project.caseTime}
                    </span>
                  </div>

                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center text-xs sm:text-sm mb-1 sm:mb-2">
                      <i className="ri-map-pin-line mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center"></i>
                      {project.location}
                    </div>
                    <div className="flex items-center text-xs sm:text-sm">
                      <i className="ri-battery-line mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center"></i>
                      {project.size}
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-emerald-700 transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-center mt-auto">
                    <span className="bg-emerald-50 text-emerald-700 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full font-medium">
                      {project.stats}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 sm:py-20">
            <i className="ri-battery-line text-4xl sm:text-6xl text-gray-300 mb-4 sm:mb-6 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto"></i>
            <h3 className="text-xl sm:text-2xl font-light text-gray-500 mb-3 sm:mb-4">暂无相关案例</h3>
            <p className="text-sm sm:text-base text-gray-400">请选择其他分类查看更多应用案例</p>
          </div>
        )}
      </div>
    </section>
  );
}
