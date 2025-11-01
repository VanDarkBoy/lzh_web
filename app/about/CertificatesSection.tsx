'use client';

export default function CertificatesSection() {
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
      code: 'IATF16949',
      name: 'IATF16949汽车标准',
      description: '汽车行业质量管理体系',
      icon: 'ri-car-line',
      color: 'indigo'
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
    },
    {
      code: 'BSCI',
      name: 'BSCI社会责任',
      description: '商业社会标准倡议认证',
      icon: 'ri-team-line',
      color: 'teal'
    },
    {
      code: 'CCS',
      name: 'CCS船级社认证',
      description: '中国船级社产品认证',
      icon: 'ri-ship-line',
      color: 'cyan'
    },
    {
      code: 'RoHS',
      name: 'RoHS环保认证',
      description: '限制有害物质指令认证',
      icon: 'ri-recycle-line',
      color: 'lime'
    }
  ];

  const patents = [
    { number: '245+', label: '专利数量' },
    { number: '50+', label: '发明专利' }
  ];

  const achievements = [
    '国家高新技术企业',
    '质量管理体系证书：ISO9001、IATF16949',
    '环境管理证书：ISO14001',
    '社会责任报告：BSCI',
    '产品认证证书：CE、UN38.3、CCS、RoHS等'
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200',
      emerald: 'bg-emerald-100 text-emerald-600 border-emerald-200',
      red: 'bg-red-100 text-red-600 border-red-200',
      teal: 'bg-teal-100 text-teal-600 border-teal-200',
      cyan: 'bg-cyan-100 text-cyan-600 border-cyan-200',
      lime: 'bg-lime-100 text-lime-600 border-lime-200'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题部分 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            专利与奖项
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            建立完善的知识产权及保护体系，持有多项国际权威认证，确保产品质量与安全性达到全球最高标准
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 认证展示 */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">国际认证</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={cert.code}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-blue-200 transform hover:-translate-y-2"
                >
                  <div className="text-center">
                    {/* 认证图标 */}
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${getColorClasses(cert.color)}`}>
                      <i className={`${cert.icon} text-2xl w-6 h-6 flex items-center justify-center`}></i>
                    </div>
                    
                    {/* 认证代码 */}
                    <div className="text-lg font-bold text-gray-900 mb-2">
                      {cert.code}
                    </div>
                    
                    {/* 认证名称 */}
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">
                      {cert.name}
                    </h4>
                    
                    {/* 认证描述 */}
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 专利和成就 */}
          <div className="space-y-8">
            {/* 专利数量 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">专利成果</h3>
              <div className="space-y-6">
                {patents.map((patent, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {patent.number}
                    </div>
                    <div className="text-gray-700 font-medium">
                      {patent.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 资质荣誉 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">资质荣誉</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm leading-relaxed">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}