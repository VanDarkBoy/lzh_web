
'use client';

import { useInView } from 'react-intersection-observer';

interface CompanyCapabilitiesProps {
  scrollY: number;
}

export default function CompanyCapabilities({ scrollY }: CompanyCapabilitiesProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section 
      ref={ref}
      className="py-20 bg-white"
      style={{
        transform: `translateY(${Math.max(0, (scrollY - 2000) * 0.02)}px)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-6">
            核心能力
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            强大的技术实力
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            从研发设计到制造测试，我们具备完整的产业链能力，为客户提供一站式解决方案
          </p>
        </div>

        <div className="space-y-20">
          {/* 能源解决方案 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                12年来致力于新能源解决方案
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                自2013年成立以来，专注于锂电池储能技术创新，涵盖家庭、工商业、动力等全场景应用。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">家用住宅储能系统</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">工商业储能系统</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">动力电池</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">房车控制系统</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">铅酸替代电池</span>
                </div>
              </div>
            </div>
            <div className={`transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <div className="relative">
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20energy%20storage%20solutions%20with%20various%20applications%20including%20residential%20solar%20systems%2C%20industrial%20batteries%2C%20electric%20vehicles%2C%20professional%20photography%20with%20clean%20blue%20and%20green%20technology%20colors&width=600&height=400&seq=energy-solutions&orientation=landscape"
                  alt="12年来致力于新能源解决方案"
                  className="w-full h-80 object-cover object-top rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>

          {/* 研发能力 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:grid-flow-col-dense">
            <div className={`lg:col-start-2 transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                综合研发能力
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                核心领域和关键零部件自主研发能力突出。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">设计能力</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">设计</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">BMS设计</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">EMS设计</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">PACK设计</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">系统设计</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">工业设计</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">逆变器设计</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">软件设计</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">研发能力</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">BMS研发</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">EMS研发</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">仿真</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">自动化</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">电化学</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">电子电路</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">热管理</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed">
                  <strong>专业研发中心及团队</strong>
                  <br /><br />
                  我们专注于家用与工商业储能系统、电池管理、动力电池及铅酸电池替代方案，并提供房车控制系统的设计与开发。通过创新技术，我们致力于提供高效、可靠的储能解决方案，满足各类市场需求。
                </p>
              </div>
            </div>
            <div className={`lg:col-start-1 transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <div className="relative">
                <img
                  src="https://readdy.ai/api/search-image?query=Professional R&D laboratory for battery technology development, engineers working with advanced testing equipment, modern research facility with clean technology environment&width=600&height=400&seq=rd-capabilities&orientation=landscape"
                  alt="综合研发能力"
                  className="w-full h-80 object-cover object-top rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>

          {/* 制造实力 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                制造实力
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                凭借这一切，锂谷具备了"端到端"的集成交付能力，使我们的产品超越了行业规范。
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-800 font-medium">先进的MES系统</span>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-800 font-medium">全自动生产线</span>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-800 font-medium">IATF16949体系</span>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-800 font-medium">品质管理系统</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={`transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <div className="relative">
                <img
                  src="https://readdy.ai/api/search-image?query=Advanced%20manufacturing%20facility%20for%20lithium%20battery%20production%2C%20automated%20production%20lines%20with%20modern%20equipment%2C%20professional%20industrial%20environment%20with%20quality%20control%20systems&width=600&height=400&seq=manufacturing-strength&orientation=landscape"
                  alt="制造实力"
                  className="w-full h-80 object-cover object-top rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>

          {/* 测试能力 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:grid-flow-col-dense">
            <div className={`lg:col-start-2 transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                全面的测试能力
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                配备先进的检测仪器和测试设备，多达200台/套。产品通过国际及北美主要测试标准如IEC、ISO、UL，可通过严苛的性能、可靠性、安全性测试等。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">电芯测试</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">电池系统测试</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">电池管理系统测试</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">材料测试</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">充电器测试</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">储能测试</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">DC-DC测试</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">交流发电机测试</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">混合逆变器测试</span>
                </div>
              </div>
            </div>
            <div className={`lg:col-start-1 transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <div className="relative">
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%20battery%20testing%20laboratory%20with%20advanced%20testing%20equipment%2C%20quality%20assurance%20facility%20with%20precise%20measurement%20instruments%2C%20clean%20technology%20testing%20environment&width=600&height=400&seq=testing-capabilities&orientation=landscape"
                  alt="全面的测试能力"
                  className="w-full h-80 object-cover object-top rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
