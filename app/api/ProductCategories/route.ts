import { NextResponse } from 'next/server';

type ProductCategory = {
  id: string;
  name: string;
  description: string;
  details: string;
  dealFeatures: string[];
  applications: string;
  image: string;
  icon: string;
};

const categories: ProductCategory[] = [
  {
    id: '1',
    name: '户用储能解决方案',
    description: '适用于独栋住宅、公寓等家庭场景，满足日常用电与应急备电需求。',
    details:
      '基于高安全性的 LiFePO₄ 电芯和智能能源管理系统，实现光储充一体化，支持并离网无缝切换，保障家庭持续稳定用电。',
    dealFeatures: [
      '模组化容量可扩展至 30kWh',
      '支持 98% 转换效率的双向逆变',
      'UPS 级别毫秒级切换',
      'APP/小程序实时监测与远程运维',
    ],
    applications: '家庭光伏储能、别墅备用电源、偏远地区离网用电。',
    image:
      'https://readdy.ai/api/search-image?query=modern%20residential%20energy%20storage%20system%20installed%20in%20a%20living%20room%20with%20solar%20panels%20visible%20through%20the%20window%2C%20sleek%20white%20battery%20cabinet%20with%20smart%20display%2C%20bright%20natural%20lighting&width=1600&height=1200&orientation=landscape&seq=products-category-residential',
    icon: 'ri-home-8-line',
  },
  {
    id: '2',
    name: '工商业储能系统',
    description: '为工厂、园区、商业综合体提供削峰填谷与需求响应服务，降低用电成本。',
    details:
      '采用集装箱式 BESS 架构，支持 1C 快速充放电与多机并联，配备主动消防与温控系统，满足大型负载的能量调节需求。',
    dealFeatures: [
      '10-1000kWh 灵活配置',
      'PCS、BMS、EMS 三层协同控制',
      '支持 VPP 与需求侧响应',
      '整机通过 IEC/UL 多国认证',
    ],
    applications: '工业负载调峰、商业建筑削峰填谷、微网储能电站。',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20energy%20storage%20containers%20at%20a%20factory%20with%20blue%20branding%2C%20professional%20lighting%2C%20clean%20environment%2C%20energy%20management%20screens&width=1600&height=1200&orientation=landscape&seq=products-category-commercial',
    icon: 'ri-building-4-line',
  },
  {
    id: '3',
    name: '通信基站储能',
    description: '面向通信铁塔与数据中心，实现不停电运维与智能远程监测。',
    details:
      '全生命周期智能监控平台，搭配高倍率电芯与主动均衡技术，确保关键通信设备在极端环境下的持续供电能力。',
    dealFeatures: [
      '宽温运行 -20℃ 至 55℃',
      '智能远程告警与故障定位',
      '机柜式快速部署，1 小时完成安装',
      '支持柴油发电机与光伏多能互补',
    ],
    applications: '5G 通信基站、边缘数据中心、户外监控网络。',
    image:
      'https://readdy.ai/api/search-image?query=telecom%20tower%20energy%20storage%20cabinet%20with%20batteries%20and%20control%20systems%2C%20outdoor%20telecommunications%20site%20evening%20lighting&width=1600&height=1200&orientation=landscape&seq=products-category-telecom',
    icon: 'ri-base-station-line',
  },
  {
    id: '4',
    name: '便携式储能电源',
    description: '兼顾户外露营、应急救援等移动供电场景，轻量化设计，随时随地充电。',
    details:
      '集成逆变、充电、照明于一体，支持 220V 纯正弦波输出与多种 DC 接口，可接入太阳能折叠板，实现离网续航。',
    dealFeatures: [
      '1.5 小时快充至 80%',
      '支持 12 路输出接口',
      '航空铝合金散热外壳',
      '智能电量预测与低温保护',
    ],
    applications: '户外露营、自驾旅行、应急救援、移动办公。',
    image:
      'https://readdy.ai/api/search-image?query=portable%20power%20station%20on%20a%20camping%20table%20with%20solar%20panels%2C%20night%20scene%20warm%20lighting%2C%20modern%20design&width=1600&height=1200&orientation=landscape&seq=products-category-portable',
    icon: 'ri-charging-pile-2-line',
  },
  {
    id: '5',
    name: '电网侧储能',
    description: '适用于新型电力系统调频、黑启动及可再生能源并网消纳。',
    details:
      '采用分布式簇级架构与 EMS 云平台，实现毫秒级调频响应、动态功率分配和全生命周期健康管理。',
    dealFeatures: [
      '毫秒级 AGC/AVC 响应',
      '支持并网/离网黑启动',
      '模块级消防与热失控防护',
      '云端大数据健康诊断',
    ],
    applications: '风光储充一体化、电网调频调峰、区域综合能源站。',
    image:
      'https://readdy.ai/api/search-image?query=utility%20scale%20battery%20energy%20storage%20facility%20with%20power%20grid%20infrastructure%2C%20sunset%20lighting%2C%20rows%20of%20white%20containers&width=1600&height=1200&orientation=landscape&seq=products-category-grid',
    icon: 'ri-global-line',
  },
];

export async function GET() {
  return NextResponse.json(categories);
}
