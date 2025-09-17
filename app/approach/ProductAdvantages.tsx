
'use client';

import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

interface ProductAdvantagesProps {
  scrollY: number;
}

const advantages = [
  {
    icon: "ri-shield-check-line",
    title: "LiFePO₄ 高安全性",
    description: "采用磷酸铁锂技术，热稳定性优异，多重安全保护系统，24/7 智能监控"
  },
  {
    icon: "ri-stack-line",
    title: "模块化设计",
    description: "标准化模块设计，支持灵活扩容，安装简便，维护便捷，适应不同应用需求"
  },
  {
    icon: "ri-time-line",
    title: "超长使用寿命",
    description: "循环寿命超过 6000 次，日历寿命 15+ 年，年衰减率低于 2%，投资回报率高"
  },
  {
    icon: "ri-battery-charge-line",
    title: "高效能转换",
    description: "系统往返效率达 95% 以上，快速充放电能力，能量损耗minimal，性能稳定可靠"
  },
  {
    icon: "ri-brain-line",
    title: "智能管理系统",
    description: "先进 BMS 电池管理，云端监控平台，预测性维护，远程诊断和升级功能"
  },
  {
    icon: "ri-leaf-line",
    title: "绿色环保材料",
    description: "环保材料制造，可回收设计，符合 RoHS 标准，助力碳中和目标实现"
  }
];

const certifications = [
  {
    name: "CE 认证",
    description: "欧盟安全标准认证"
  },
  {
    name: "IEC 标准",
    description: "国际电工委员会标准"
  },
  {
    name: "UN38.3",
    description: "联合国运输安全标准"
  },
  {
    name: "ISO9001",
    description: "质量管理体系认证"
  },
  {
    name: "ISO14001",
    description: "环境管理体系认证"
  },
  {
    name: "ISO45001",
    description: "职业健康安全认证"
  }
];

export default function ProductAdvantages({ scrollY }: ProductAdvantagesProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section 
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-gray-50"
      style={{
        transform: `translateY(${Math.max(0, (scrollY - 3000) * 0.02)}px)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6">
            产品
            <br />
            <span className="text-blue-700">优势</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            领先的储能技术和严格的质量标准，为客户提供安全可靠的能源解决方案
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className={`bg-white p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${ 
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 flex items-center justify-center mb-4 sm:mb-6">
                <i className={`${advantage.icon} w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-blue-700 text-xl sm:text-2xl`}></i>
              </div>
              
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                {advantage.title}
              </h3>
              
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>

        {/* 认证展示区域 */}
        <div className="bg-white p-8 sm:p-12 shadow-lg rounded-lg mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              国际权威认证
            </h3>
            <p className="text-gray-600">
              严格遵循国际标准，获得多项权威机构认证，确保产品质量和安全性
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={`text-center p-4 bg-gray-50 hover:bg-blue-50 transition-all duration-300 ${
                  inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-12 h-12 bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">
                  <i className="ri-award-line w-6 h-6 flex items-center justify-center"></i>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {cert.name}
                </h4>
                <p className="text-xs text-gray-600">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link href="/get-started">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer rounded-full">
                获取产品报价
              </button>
            </Link>
            <Link href="/projects">
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full">
                查看应用案例
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
