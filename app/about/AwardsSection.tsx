
'use client';

import { useInView } from 'react-intersection-observer';

export default function AwardsSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const certifications = [
    {
      code: 'CE',
      name: 'CE认证',
      description: '欧盟安全认证标志',
      icon: 'ri-checkbox-circle-line',
      color: 'blue'
    },
    {
      code: 'IEC',
      name: 'IEC国际标准',
      description: '国际电工委员会标准',
      icon: 'ri-global-line',
      color: 'green'
    },
    {
      code: 'UN38.3',
      name: 'UN38.3运输认证',
      description: '锂电池运输安全标准',
      icon: 'ri-truck-line',
      color: 'orange'
    },
    {
      code: 'ISO9001',
      name: 'ISO9001质量管理',
      description: '质量管理体系认证',
      icon: 'ri-award-line',
      color: 'purple'
    },
    {
      code: 'ISO14001',
      name: 'ISO14001环境管理',
      description: '环境管理体系认证',
      icon: 'ri-leaf-line',
      color: 'emerald'
    },
    {
      code: 'ISO45001',
      name: 'ISO45001职业健康',
      description: '职业健康安全管理体系',
      icon: 'ri-shield-check-line',
      color: 'red'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      emerald: 'bg-emerald-100 text-emerald-600 border-emerald-200',
      red: 'bg-red-100 text-red-600 border-red-200'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题部分 */}
        <div className="text-center mb-16">
          <div className={`inline-block transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              权威认证
            </span>
          </div>
          <h2 className={`text-4xl sm:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            国际标准认证
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              品质保障
            </span>
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            锂谷严格遵循国际标准，持有多项权威认证，确保产品质量与安全性达到全球最高标准
          </p>
        </div>

        {/* 认证展示墙 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {certifications.map((cert, index) => (
            <div
              key={cert.code}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-blue-200 transform hover:-translate-y-2 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                {/* 认证图标 */}
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${getColorClasses(cert.color)}`}>
                  <i className={`${cert.icon} text-3xl w-8 h-8 flex items-center justify-center`}></i>
                </div>
                
                {/* 认证代码 */}
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {cert.code}
                </div>
                
                {/* 认证名称 */}
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {cert.name}
                </h3>
                
                {/* 认证描述 */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 认证统计数据 */}
        <div className={`bg-white rounded-3xl p-12 shadow-xl border transition-all duration-1000 delay-800 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              认证实力展示
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              严格的质量控制体系，确保每一个产品都符合国际最高标准
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">6+</div>
              <div className="text-gray-700 font-medium">国际认证</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-700 font-medium">产品合规率</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-700 font-medium">质量监控</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-700 font-medium">国家销售</div>
            </div>
          </div>

          {/* 质量保证说明 */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="ri-shield-check-line text-blue-600 text-xl w-6 h-6 flex items-center justify-center"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">安全保障</h4>
                <p className="text-gray-600 text-sm">严格遵循国际安全标准，确保产品使用安全</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="ri-test-tube-line text-green-600 text-xl w-6 h-6 flex items-center justify-center"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">质量检测</h4>
                <p className="text-gray-600 text-sm">全流程质量检测，每个环节都精益求精</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="ri-customer-service-line text-orange-600 text-xl w-6 h-6 flex items-center justify-center"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">服务支持</h4>
                <p className="text-gray-600 text-sm">全球化服务网络，提供专业技术支持</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
