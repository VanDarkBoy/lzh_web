'use client';

import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutHero, { HeroContent } from './AboutHero';
import CompanyVision, { VisionContent } from './CompanyVision';
import GlobalPresence, { GlobalPresenceContent } from './GlobalPresence';
import CompanyHistory, { CompanyHistoryContent } from './CompanyHistory';
import CertificatesSection, { CertificatesContent } from './CertificatesSection';
import CompanyCapabilities, { TechnicalSection } from './CompanyCapabilities';

interface AboutContent {
  hero: HeroContent;
  vision: VisionContent;
  globalPresence: GlobalPresenceContent;
  certificates: CertificatesContent;
  history: CompanyHistoryContent;
}

const defaultTechnicalSection: TechnicalSection = {
  title: '强大的技术实力',
  description: '从研发设计到制造测试，我们具备完整的产业链能力，为客户提供一站式解决方案',
  historyTitle: '12年来致力于新能源解决方案',
  historyDescription: '自2013年成立以来，专注于锂电池储能技术创新，涵盖家庭、工商业、动力等全场景应用。',
  solutionsTitle: '全场景解决方案',
  solutions: ['家用住宅储能系统', '工商业储能系统', '动力电池', '房车控制系统', '铅酸替代电池'],
  capabilitiesTitle: '综合研发能力',
  capabilities: [
    {
      title: '设计能力',
      items: ['设计', 'BMS设计', 'EMS设计', 'PACK设计', '系统设计', '工业设计', '逆变器设计', '软件设计']
    },
    {
      title: '研发能力',
      items: ['BMS研发', 'EMS研发', '仿真', '自动化', '电化学', '电子电路', '热管理']
    },
    {
      title: '专业研发中心及团队',
      items: [
        '我们专注于家用与工商业储能系统、电池管理、动力电池及铅酸电池替代方案，并提供房车控制系统的设计与开发。通过创新技术，我们致力于提供高效、可靠的储能解决方案，满足各类市场需求。'
      ]
    }
  ],
  manufacturingTitle: '制造实力',
  manufacturingDescription: '凭借这一切，锂谷具备了"端到端"的集成交付能力，使我们的产品超越了行业规范。',
  manufacturingHighlights: ['先进的MES系统', '全自动生产线', 'IATF16949体系', '品质管理系统'],
  testingTitle: '全面的测试能力',
  testingDescription:
    '配备先进的检测仪器和测试设备，多达200台/套。产品通过国际及北美主要测试标准如IEC、ISO、UL，可通过严苛的性能、可靠性、安全性测试等。',
  testingItems: ['电芯测试', '电池系统测试', '电池管理系统测试', '材料测试', '充电器测试', '储能测试', 'DC-DC测试', '交流发电机测试', '混合逆变器测试']
};

const defaultContent: AboutContent = {
  hero: {
    title: '锂谷科技',
    description: '致力于动力系统及储能系统一站式解决方案的研发、制造和销售。',
    stats: [
      { value: '12+', label: '年行业经验' },
      { value: '8万', label: '平方工厂面积' },
      { value: '6200万', label: '注册实缴资本金' },
      { value: '10GWh+', label: '年度交付量' }
    ],
    affiliation: { title: '隶属宗申动力', subtitle: '(001696.SZ)' },
    cta: { primary: '了解更多', secondary: '联系我们' }
  },
  vision: {
    sectionTitle: '愿景与使命',
    visionTitle: '愿景',
    visionDescription: '致力于成为客户信任的能源系统集成商\n全球化的新能源生活方式赋能者，为人类的可持续发展作出贡献',
    missionTitle: '使命',
    missionDescription: '为世界绿色能源贡献锂谷智慧',
    valuesTitle: '价值观',
    valuesDescription: '大胆想，立刻做，做难的事必有所得',
    customerPolicyTitle: '客户方针',
    customerPolicyDescription: '客户至上、质量为本、开拓创新、助力双碳'
  },
  globalPresence: {
    overviewTitle: '全球领先品牌',
    overviewDescription:
      '锂谷科技已建立全球化业务网络，在中国设有总部及多个分公司，越南、尼日利亚设有制造工厂，在德国、英国、意大利、南非、肯尼亚、澳大利亚、巴西、北美、墨西哥等地设有海外办公室，匈牙利、波兰设有海外仓库，基本覆盖全球大部分国家和地区。',
    stats: [
      { value: '3', label: '制造工厂', description: '中国东莞、越南、尼日利亚', icon: 'ri-building-line', color: 'green' },
      { value: '3', label: '国内办公室', description: '深圳、武汉、南京', icon: 'ri-home-office-line', color: 'purple' },
      { value: '9', label: '海外分部', description: '覆盖五大洲主要市场', icon: 'ri-global-line', color: 'blue' },
      { value: '2', label: '海外仓库', description: '匈牙利、波兰', icon: 'ri-store-line', color: 'orange' }
    ],
    technical: defaultTechnicalSection
  },
  certificates: {
    sectionTitle: '专利与奖项',
    description: '建立完善的知识产权及保护体系，持有多项国际权威认证，确保产品质量与安全性达到全球最高标准',
    certificationsTitle: '国际认证',
    certifications: [
      { code: 'CE', name: 'CE认证', description: '欧盟安全认证标志', icon: 'ri-checkbox-circle-line', color: 'blue' },
      { code: 'IEC', name: 'IEC国际标准', description: '国际电工委员会标准', icon: 'ri-global-line', color: 'green' },
      { code: 'UN38.3', name: 'UN38.3运输认证', description: '锂电池运输安全标准', icon: 'ri-truck-line', color: 'orange' },
      { code: 'ISO9001', name: 'ISO9001质量管理', description: '质量管理体系认证', icon: 'ri-award-line', color: 'purple' },
      { code: 'IATF16949', name: 'IATF16949汽车标准', description: '汽车行业质量管理体系', icon: 'ri-car-line', color: 'indigo' },
      { code: 'ISO14001', name: 'ISO14001环境管理', description: '环境管理体系认证', icon: 'ri-leaf-line', color: 'emerald' },
      { code: 'ISO45001', name: 'ISO45001职业健康', description: '职业健康安全管理体系', icon: 'ri-shield-check-line', color: 'red' },
      { code: 'BSCI', name: 'BSCI社会责任', description: '商业社会标准倡议认证', icon: 'ri-team-line', color: 'teal' },
      { code: 'CCS', name: 'CCS船级社认证', description: '中国船级社产品认证', icon: 'ri-ship-line', color: 'cyan' },
      { code: 'RoHS', name: 'RoHS环保认证', description: '限制有害物质指令认证', icon: 'ri-recycle-line', color: 'lime' }
    ],
    patentsTitle: '专利成果',
    patents: [
      { number: '245+', label: '专利数量' },
      { number: '50+', label: '发明专利' }
    ],
    achievementsTitle: '资质荣誉',
    achievements: [
      '国家高新技术企业',
      '质量管理体系证书：ISO9001、IATF16949',
      '环境管理证书：ISO14001',
      '社会责任报告：BSCI',
      '产品认证证书：CE、UN38.3、CCS、RoHS等'
    ]
  },
  history: {
    sectionTitle: '发展历程',
    description: '从初创企业到全球化公司，见证我们在新能源领域的每一个重要时刻',
    milestones: [
      {
        year: '2025',
        title: '全球化布局加速',
        description: '着眼全球市场，全力加速海外布局进程，快速在尼日利亚、越南建设工厂，深度推进本地化，打磨差异化产品。',
        image:
          'https://readdy.ai/api/search-image?query=Global%20manufacturing%20expansion%20with%20new%20factories%20in%20Nigeria%20and%20Vietnam%2C%20international%20production%20facilities%20with%20modern%20equipment%2C%20global%20business%20acceleration%20strategy&width=400&height=300&seq=2025-milestone&orientation=landscape'
      },
      {
        year: '2023',
        title: '海外布局与战略重组',
        description:
          '公司扩大生产规模，加快海外布局，建立了全球化的生产分销战略体系，陆续在德国、匈牙利、美国和南非等地设立办事处和海外仓库。上市公司宗申动力与我司签订并购协议，收购我司60%股权。',
        image:
          'https://readdy.ai/api/search-image?query=Global%20business%20expansion%20with%20international%20offices%20and%20warehouses%2C%20strategic%20partnership%20with%20listed%20company%2C%20professional%20corporate%20merger%20and%20acquisition%20celebration&width=400&height=300&seq=2023-milestone&orientation=landscape'
      },
      {
        year: '2022',
        title: '市场拓展新动力',
        description:
          '为了拓展市场份额，公司在武汉设立了营销中心，以便更好地服务当地客户和开拓新市场。营销中心的成立为公司的发展注入了新的动力。',
        image:
          'https://readdy.ai/api/search-image?query=New%20marketing%20center%20establishment%20in%20Wuhan%2C%20professional%20business%20facility%20with%20marketing%20team%2C%20customer%20service%20expansion%20and%20market%20development&width=400&height=300&seq=2022-milestone&orientation=landscape'
      },
      {
        year: '2020',
        title: '储能业务突破',
        description:
          '公司开始进军储能业务，并在南京新增了研发中心。通过不断创新和优化产品，公司成功地将储能设备应用于多个领域，为客户提供更加可靠和高效的解决方案。',
        image:
          'https://readdy.ai/api/search-image?query=Energy%20storage%20business%20development%20with%20R%26D%20center%20in%20Nanjing%2C%20advanced%20battery%20technology%20research%20facility%2C%20innovative%20storage%20equipment%20development&width=400&height=300&seq=2020-milestone&orientation=landscape'
      },
      {
        year: '2018',
        title: '集团化运营升级',
        description:
          '随着业务的快速发展，东莞市锂智慧能源有限公司作为集团公司成立，旨在协调和管理其子工厂，提高整体运营效率和管理水平。',
        image:
          'https://readdy.ai/api/search-image?query=Corporate%20group%20establishment%20in%20Dongguan%2C%20professional%20business%20headquarters%20building%2C%20company%20management%20upgrade%20and%20operational%20efficiency%20improvement&width=400&height=300&seq=2018-milestone&orientation=landscape'
      },
      {
        year: '2013',
        title: '公司创立起航',
        description: '深圳市锂谷科技有限公司成立，专注于自主研发和生产AGV(自动导引车)和太阳能电池等智能设备和系统。',
        image:
          'https://readdy.ai/api/search-image?query=Company%20founding%20in%20Shenzhen%20with%20AGV%20automatic%20guided%20vehicles%20and%20solar%20battery%20systems%2C%20startup%20technology%20company%20with%20intelligent%20equipment%20development&width=400&height=300&seq=2013-milestone&orientation=landscape'
      }
    ]
  }
};

const buildContent = (incoming?: Partial<AboutContent>): AboutContent => ({
  hero: incoming?.hero ?? defaultContent.hero,
  vision: incoming?.vision ?? defaultContent.vision,
  globalPresence: incoming?.globalPresence ?? defaultContent.globalPresence,
  certificates: incoming?.certificates ?? defaultContent.certificates,
  history: incoming?.history ?? defaultContent.history
});

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [content, setContent] = useState<AboutContent>(() => buildContent());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 设置页面标题和描述
    document.title = "关于锂谷 | 全球储能解决方案与认证实力";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '锂谷（Lithium Valley）持有多项国际权威认证，在中国、越南、尼日利亚设有工厂，并在西班牙、匈牙利、波兰、南非、肯尼亚、澳大利亚、巴西、巴基斯坦、印度、坦桑尼亚设有分部或海外仓，提供高安全、模块化的储能解决方案。');
    }

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/aboutContent`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('无法获取关于页面内容');
        }

        const data = (await response.json()) as Partial<AboutContent>;
        setContent(buildContent(data));
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        console.error('获取关于页面内容失败:', err);
        setError('内容加载失败，已显示默认信息。');
        setContent(buildContent());
      } finally {
        setLoading(false);
      }
    };

    fetchContent();

    return () => {
      controller.abort();
    };
  }, []);

  const heroContent = useMemo(() => content.hero, [content]);
  const visionContent = useMemo(() => content.vision, [content]);
  const globalPresenceContent = useMemo(() => content.globalPresence, [content]);
  const certificatesContent = useMemo(() => content.certificates, [content]);
  const historyContent = useMemo(() => content.history, [content]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <AboutHero scrollY={scrollY} content={heroContent} />
        <CompanyVision content={visionContent} />
        <GlobalPresence content={globalPresenceContent} />
        <CompanyCapabilities scrollY={0} content={globalPresenceContent.technical} />
        <CertificatesSection content={certificatesContent} />
        <CompanyHistory content={historyContent} />
        {loading && (
          <div className="text-center text-sm text-gray-500 py-6">内容加载中...</div>
        )}
        {error && (
          <div className="text-center text-sm text-red-500 pb-6">{error}</div>
        )}
      </main>
      <Footer />
    </div>
  );
}
