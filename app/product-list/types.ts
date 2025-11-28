export interface Category {
  id: bigint;
  name: string;
  count: number;
  image?: string | null;
  description?: string | null;
  icon?: string | null;
  applications?: string | null;
  features?: string | null;
  details?: string | null;
  language?: string | null;
  home?: string | null;
  createTime?: string | null;
  dealFeatures?: string | null;
}

export interface Product {
  id: bigint;
  name: string;
  category: bigint;
  image: string;
  description: string;
  specs: string;
  dealFeatures: string[];
}

export interface Types {
  title: string;
  description: string;
  backgroundImage: string;
  errors: {
    fetchProducts: string;
    fetchCategories: string;
    loadFailed: string;
  };
  states: {
    loading: string;
    viewDetails: string;
    productsCategories: string;
    empty: string;
  };
}

export const CategoryDefault: Category[] = [
  {
    id: BigInt(1),
    name: '住宅储能系统',
    count: 3,
    icon: 'ri-home-line'
  },
  {
    id: BigInt(2),
    name: '商用储能系统',
    count: 3,
    icon: 'ri-building-line'
  },
  {
    id: BigInt(3),
    name: '房车系统',
    count: 3,
    icon: 'ri-truck-line'
  },
  {
    id: BigInt(4),
    name: '铅酸替代系统',
    count: 3,
    icon: 'ri-recycle-line'
  },
  {
    id: BigInt(5),
    name: '动力电池',
    count: 2,
    icon: 'ri-battery-charge-line'
  }
];

export const ProductDefault: Product[] = [
  {
    id: BigInt(1),
    name: 'LV2500W HB 堆叠式一体化ESS',
    category: BigInt(1),
    image:
        'https://readdy.ai/api/search-image?query=Modern%20white%20stackable%20home%20energy%20storage%20system%20with%20integrated%20inverter%20and%20UPS%20functions%2C%20sleek%20modular%20design%20ESS%20unit%20with%20digital%20display%2C%20professional%20product%20photography%20on%20white%20background&width=400&height=400&seq=lv2500w-hb&orientation=squarish',
    description: '集成逆变器、UPS和充电系统，模块化设计，IP65防护等级',
    specs: '2.56kWh | 5.12kWh可扩展',
    dealFeatures: ['一体化设计', 'IP65防护', '安装效率提升50%']
  },
  {
    id: BigInt(2),
    name: 'LV-BAT-W2.56Ac 壁挂式电池',
    category: BigInt(1),
    image:
        'https://readdy.ai/api/search-image?query=Compact%20wall-mounted%20lithium%20battery%20unit%20with%20sleek%20white%20housing%20and%20digital%20display%2C%20residential%20energy%20storage%20battery%20pack%20for%20home%20installation%2C%20clean%20modern%20design%20on%20white%20background&width=400&height=400&seq=lv-bat-w256&orientation=squarish',
    description: '紧凑型壁挂式设计，适合家庭储能应用',
    specs: '2.56kWh | LiFePO₄电池',
    dealFeatures: ['壁挂安装', '安全可靠', '长寿命设计']
  },
  {
    id: BigInt(3),
    name: 'LV-BAT-W5.12Ac 大容量壁挂电池',
    category: BigInt(1),
    image:
        'https://readdy.ai/api/search-image?query=Large%20capacity%20wall-mounted%20battery%20system%20with%20modern%20white%20design%20and%20integrated%20control%20panel%2C%20high-capacity%20residential%20ESS%20unit%2C%20professional%20energy%20storage%20product%20photography&width=400&height=400&seq=lv-bat-w512&orientation=squarish',
    description: '大容量壁挂式储能系统，满足更大功率需求',
    specs: '5.12kWh | 高容量配置',
    dealFeatures: ['大容量', '智能管理', '高效充放电']
  },
  {
    id: BigInt(4),
    name: 'LV-HOME-10K 家用堆叠系统',
    category: BigInt(2),
    image:
        'https://readdy.ai/api/search-image?query=Residential%20stackable%20energy%20storage%20system%20with%2010kWh%20capacity%2C%20modern%20home%20battery%20solution%20with%20white%20and%20gray%20design%2C%20family-friendly%20ESS%20with%20safety%20features&width=400&height=400&seq=home-stack-10k&orientation=squarish',
    description: '10kWh大容量家用堆叠系统，支持全屋用电',
    specs: '10kWh | 堆叠扩展',
    dealFeatures: ['大容量配置', '全屋供电', '安全防护']
  },
  {
    id: BigInt(5),
    name: 'LV-SMART-7K 智能家用系统',
    category: BigInt(2),
    image:
        'https://readdy.ai/api/search-image?query=Smart%20home%20energy%20storage%20system%20with%207kWh%20capacity%20and%20intelligent%20control%20features%2C%20residential%20ESS%20with%20app%20connectivity%20and%20modern%20white%20design&width=400&height=400&seq=home-smart-7k&orientation=squarish',
    description: '7kWh智能家用储能，支持APP远程控制',
    specs: '7kWh | 智能控制',
    dealFeatures: ['APP控制', '智能优化', '远程监控']
  },
  {
    id: BigInt(6),
    name: 'LV-BST-H5.12Aa 高压堆叠系统',
    category: BigInt(2),
    image:
        'https://readdy.ai/api/search-image?query=High%20voltage%20stackable%20battery%20system%20with%20multiple%20units%20arranged%20vertically%2C%20commercial%20grade%20ESS%20with%20professional%20gray%20and%20white%20design%2C%20industrial%20energy%20storage%20solution&width=400&height=400&seq=lv-bst-h512&orientation=squarish',
    description: '高压堆叠设计，适用于商业和工业应用',
    specs: '5.12kWh | 高压系统',
    dealFeatures: ['高压设计', '模块堆叠', '工业级质量']
  },
  {
    id: BigInt(7),
    name: 'W15-5A 大功率储能系统',
    category: BigInt(3),
    image:
        'https://readdy.ai/api/search-image?query=Large%20commercial%20energy%20storage%20cabinet%20system%20with%20high%20power%20capacity%2C%20industrial%20ESS%20unit%20with%20ventilation%20and%20monitoring%20systems%2C%20professional%20gray%20cabinet%20design%20for%20business%20applications&width=400&height=400&seq=w15-5a&orientation=squarish',
    description: '大功率商用储能解决方案，适合中大型企业',
    specs: '15kWh | 5A输出',
    dealFeatures: ['大功率输出', '企业级应用', '智能监控']
  },
  {
    id: BigInt(8),
    name: 'W30-E5 企业级储能系统',
    category: BigInt(3),
    image:
        'https://readdy.ai/api/search-image?query=Enterprise%20grade%20energy%20storage%20system%20with%20large%20capacity%20cabinet%20design%2C%20commercial%20ESS%20with%20advanced%20cooling%20and%20management%20systems%2C%20industrial%20white%20and%20gray%20housing%20with%20digital%20controls&width=400&height=400&seq=w30-e5&orientation=squarish',
    description: '企业级大容量储能系统，支持大规模应用',
    specs: '30kWh | E5系列',
    dealFeatures: ['企业级设计', '大容量配置', '高可靠性']
  },
  {
    id: BigInt(9),
    name: 'W32-E5 超大容量系统',
    category: BigInt(3),
    image:
        'https://readdy.ai/api/search-image?query=Ultra%20high%20capacity%20commercial%20energy%20storage%20system%20with%20robust%20cabinet%20design%2C%20large%20scale%20ESS%20for%20industrial%20applications%2C%20professional%20industrial%20design%20with%20advanced%20thermal%20management&width=400&height=400&seq=w32-e5&orientation=squarish',
    description: '超大容量配置，满足工业级储能需求',
    specs: '32kWh | 超大容量',
    dealFeatures: ['超大容量', '工业级应用', '高效管理']
  },
  {
    id: BigInt(10),
    name: 'LV-GRID-50K 电网级储能',
    category: BigInt(4),
    image:
        'https://readdy.ai/api/search-image?query=Grid-scale%20commercial%20energy%20storage%20system%20with%2050kWh%20capacity%2C%20large%20industrial%20ESS%20container%20with%20professional%20monitoring%20and%20control%20systems%2C%20utility-grade%20energy%20storage%20solution&width=400&height=400&seq=grid-50k&orientation=squarish',
    description: '50kWh电网级储能系统，支持电网调频调峰',
    specs: '50kWh | 电网级',
    dealFeatures: ['电网级应用', '调频调峰', '大规模储能']
  },
  {
    id: BigInt(11),
    name: 'RV-CTRL-12V 房车控制系统',
    category: BigInt(4),
    image:
        'https://readdy.ai/api/search-image?query=RV%20control%20system%20with%2012V%20configuration%20and%20integrated%20display%20panel%2C%20recreational%20vehicle%20battery%20management%20system%20with%20digital%20controls%2C%20compact%20design%20for%20mobile%20applications&width=400&height=400&seq=rv-ctrl-12v&orientation=squarish',
    description: '12V房车专用控制系统，集成显示与保护功能',
    specs: '12V系统 | 集成控制',
    dealFeatures: ['12V专用', '集成显示', '保护功能']
  },
  {
    id: BigInt(12),
    name: 'RV-CTRL-24V 房车控制系统',
    category: BigInt(4),
    image:
        'https://readdy.ai/api/search-image?query=RV%20control%20system%20with%2024V%20configuration%20and%20advanced%20monitoring%20features%2C%20recreational%20vehicle%20battery%20control%20unit%20with%20digital%20interface%2C%20professional%20mobile%20power%20management%20system&width=400&height=400&seq=rv-ctrl-24v&orientation=squarish',
    description: '24V房车控制系统，适合大功率房车应用',
    specs: '24V系统 | 高功率',
    dealFeatures: ['24V系统', '大功率控制', '智能监控']
  },
  {
    id: BigInt(13),
    name: '蓝牙监控动力电池',
    category: BigInt(5),
    image:
        'https://readdy.ai/api/search-image?query=Power%20battery%20pack%20with%20Bluetooth%20monitoring%20system%20and%20digital%20display%2C%20advanced%20lithium%20battery%20for%20electric%20vehicles%20with%20wireless%20connectivity%2C%20high%20performance%20battery%20with%20smart%20monitoring&width=400&height=400&seq=power-bt&orientation=squarish',
    description: '配备蓝牙监控功能的高性能动力电池',
    specs: '10kWh | 蓝牙监控',
    dealFeatures: ['蓝牙监控', '高性能', '长循环寿命']
  },
  {
    id: BigInt(14),
    name: '工业级动力电池',
    category: BigInt(5),
    image:
        'https://readdy.ai/api/search-image?query=Industrial%20grade%20power%20battery%20system%20with%20heavy%20duty%20design%20and%20advanced%20BMS%2C%20professional%20lithium%20battery%20for%20industrial%20equipment%20and%20electric%20vehicles%2C%20robust%20construction%20with%20safety%20features&width=400&height=400&seq=power-industrial&orientation=squarish',
    description: '工业级动力电池，适用于重型设备和电动车辆',
    specs: '20kWh | 工业级',
    dealFeatures: ['工业级设计', '重型应用', '高安全性']
  }
];

export const defaultProductListContent: Types = {
  title: '产品列表',
  description: '探索 Lithium Valley 完整的储能产品系列，从家用到工业级解决方案',
  backgroundImage:
    'https://readdy.ai/api/search-image?query=Clean%20modern%20energy%20storage%20facility%20with%20multiple%20battery%20systems%20arranged%20in%20professional%20display%2C%20industrial%20ESS%20product%20showcase%20with%20white%20background%2C%20professional%20product%20photography%20for%20lithium%20battery%20storage%20systems&width=1920&height=1080&seq=product-list-hero&orientation=landscape',
  errors: {
    fetchProducts: '获取产品列表失败',
    fetchCategories: '获取产品分类失败',
    loadFailed: '加载产品数据失败，请稍后重试'
  },
  states: {
    loading: '正在加载产品信息...',
    viewDetails: '查看详情',
    productsCategories: '产品分类',
    empty: '暂无符合条件的产品。'
  }
};
