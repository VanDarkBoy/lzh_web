'use client';

interface CertificationItem {
  code: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface PatentItem {
  number: string;
  label: string;
}

export interface CertificatesContent {
  sectionTitle: string;
  description: string;
  certificationsTitle: string;
  certifications: CertificationItem[];
  patentsTitle: string;
  patents: PatentItem[];
  achievementsTitle: string;
  achievements: string[];
}

interface CertificatesSectionProps {
  content: CertificatesContent;
}

export default function CertificatesSection({ content }: CertificatesSectionProps) {
  const {
    sectionTitle,
    description,
    certificationsTitle,
    certifications,
    patentsTitle,
    patents,
    achievementsTitle,
    achievements
  } = content;

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
          <h2 className="text-4xl font-bold text-gray-900 mb-6">{sectionTitle}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 认证展示 */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">{certificationsTitle}</h3>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{patentsTitle}</h3>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{achievementsTitle}</h3>
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
