
'use client';

import { useState } from 'react';

export default function DownloadCenter() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    purpose: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const downloadItems = [
    // 产品规格书
    {
      id: 'spec-lv2500w',
      name: 'LV2500W HB 堆叠式ESS规格书',
      category: 'specs',
      type: 'PDF',
      size: '2.5MB',
      description: '详细技术参数、电气特性、安装尺寸',
      icon: 'ri-file-text-line'
    },
    {
      id: 'spec-commercial',
      name: '工商业储能系统规格书合集',
      category: 'specs',
      type: 'ZIP',
      size: '15.8MB',
      description: '包含W15-5A、W30-E5、W32-E5等产品规格',
      icon: 'ri-archive-line'
    },
    {
      id: 'spec-residential',
      name: '家用储能系统技术规格',
      category: 'specs',
      type: 'PDF',
      size: '4.2MB',
      description: '壁挂式、堆叠式家用储能完整规格',
      icon: 'ri-file-text-line'
    },
    // 安装手册
    {
      id: 'install-guide-home',
      name: '家用储能系统安装指南',
      category: 'manuals',
      type: 'PDF',
      size: '8.5MB',
      description: '详细安装步骤、接线图、调试说明',
      icon: 'ri-book-line'
    },
    {
      id: 'install-guide-commercial',
      name: '工商业ESS安装手册',
      category: 'manuals',
      type: 'PDF',
      size: '12.3MB',
      description: '大型储能系统安装、配置、调试手册',
      icon: 'ri-book-line'
    },
    {
      id: 'maintenance-guide',
      name: '系统维护保养手册',
      category: 'manuals',
      type: 'PDF',
      size: '5.7MB',
      description: '定期维护、故障排查、保养要求',
      icon: 'ri-tools-line'
    },
    // 认证证书
    {
      id: 'cert-ce',
      name: 'CE认证证书',
      category: 'certificates',
      type: 'PDF',
      size: '1.2MB',
      description: '欧盟CE认证证书及测试报告',
      icon: 'ri-award-line'
    },
    {
      id: 'cert-ul',
      name: 'UL认证证书',
      category: 'certificates',
      type: 'PDF',
      size: '1.8MB',
      description: 'UL9540储能系统安全认证',
      icon: 'ri-award-line'
    },
    {
      id: 'cert-cqc',
      name: 'CQC认证证书',
      category: 'certificates',
      type: 'PDF',
      size: '1.5MB',
      description: '中国质量认证中心CQC认证',
      icon: 'ri-award-line'
    },
    // 技术白皮书
    {
      id: 'whitepaper-lifepo4',
      name: 'LiFePO₄电池技术白皮书',
      category: 'whitepapers',
      type: 'PDF',
      size: '6.8MB',
      description: '磷酸铁锂电池技术原理、安全特性分析',
      icon: 'ri-file-paper-line'
    },
    {
      id: 'whitepaper-bms',
      name: 'BMS电池管理系统白皮书',
      category: 'whitepapers',
      type: 'PDF',
      size: '4.9MB',
      description: 'BMS系统架构、保护功能、通信协议',
      icon: 'ri-file-paper-line'
    },
    {
      id: 'whitepaper-grid',
      name: '电网级储能应用白皮书',
      category: 'whitepapers',
      type: 'PDF',
      size: '8.2MB',
      description: '电网储能应用场景、技术要求、解决方案',
      icon: 'ri-file-paper-line'
    }
  ];

  const categories = [
    { id: 'all', name: '全部资料', count: downloadItems.length },
    { id: 'specs', name: '产品规格书', count: downloadItems.filter(item => item.category === 'specs').length },
    { id: 'manuals', name: '安装手册', count: downloadItems.filter(item => item.category === 'manuals').length },
    { id: 'certificates', name: '认证证书', count: downloadItems.filter(item => item.category === 'certificates').length },
    { id: 'whitepapers', name: '技术白皮书', count: downloadItems.filter(item => item.category === 'whitepapers').length }
  ];

  const filteredItems = activeCategory === 'all' 
    ? downloadItems 
    : downloadItems.filter(item => item.category === activeCategory);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch('https://readdy.ai/api/form/d34fgoqr9t98gmi323hg', {
        method: 'POST',
        body: new URLSearchParams(formDataToSend as any),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        setSubmitMessage('注册成功！您现在可以下载所有技术资料。');
        setIsRegistered(true);
        setShowRegistrationForm(false);
        setTimeout(() => setSubmitMessage(''), 5000);
      } else {
        setSubmitMessage('提交失败，请稍后重试。');
      }
    } catch (error) {
      setSubmitMessage('网络错误，请稍后重试。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = (item: typeof downloadItems[0]) => {
    if (!isRegistered) {
      setShowRegistrationForm(true);
      return;
    }
    // 模拟下载
    alert(`正在下载: ${item.name}`);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 注册提示 */}
        {!isRegistered && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center justify-center mr-4">
                <i className="ri-information-line text-blue-600 text-lg"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">需要注册后下载</h3>
                <p className="text-blue-700 text-sm">
                  所有技术资料需要注册后才能下载，我们将为您提供最新的产品信息和技术支持。
                </p>
              </div>
              <button
                onClick={() => setShowRegistrationForm(true)}
                className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                立即注册
              </button>
            </div>
          </div>
        )}

        {/* 成功消息 */}
        {submitMessage && (
          <div className={`mb-6 p-4 rounded-lg ${
            submitMessage.includes('成功') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {submitMessage}
          </div>
        )}

        {/* 分类筛选 */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-600 shadow-md'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* 下载列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg">
                  <i className={`${item.icon} text-green-600 text-xl`}></i>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mb-1">
                    {item.type}
                  </span>
                  <div className="text-gray-500 text-sm">{item.size}</div>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.description}</p>
              
              <button
                onClick={() => handleDownload(item)}
                className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  isRegistered
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {isRegistered ? '立即下载' : '注册后下载'}
              </button>
            </div>
          ))}
        </div>

        {/* 注册表单弹窗 */}
        {showRegistrationForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">注册下载权限</h3>
                  <button
                    onClick={() => setShowRegistrationForm(false)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>

                <form onSubmit={handleSubmit} data-readdy-form>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        公司名称 *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        placeholder="请输入公司名称"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        联系人姓名 *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        placeholder="请输入您的姓名"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        邮箱地址 *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        placeholder="请输入邮箱地址"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        联系电话 *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        placeholder="请输入联系电话"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        职位
                      </label>
                      <select
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      >
                        <option value="">请选择职位</option>
                        <option value="engineer">工程师</option>
                        <option value="manager">项目经理</option>
                        <option value="director">技术总监</option>
                        <option value="procurement">采购经理</option>
                        <option value="other">其他</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        下载用途
                      </label>
                      <textarea
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleInputChange}
                        maxLength={500}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none"
                        placeholder="请简要说明资料用途（选填）"
                      />
                      <div className="text-right text-xs text-gray-500 mt-1">
                        {formData.purpose.length}/500
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowRegistrationForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {isSubmitting ? '提交中...' : '立即注册'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
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
