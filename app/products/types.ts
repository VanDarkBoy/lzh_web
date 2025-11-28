export interface TitleBlock {
    main: string;
    highlight: string;
}

export interface Stat {
    value: string;
    label: string;
}

export interface Feature {
    icon: string;
    label: string;
}

export interface ProductsHeroContent {
    backgroundImage: string;
    title: TitleBlock;
    tagline: TitleBlock;
    subtitle: TitleBlock;
    stats: Stat[];
    features: Feature[];
    scrollIndicatorIcon: string;
}

export interface Category {
    id: bigint;
    name: string;
    description: string;
    details: string;
    dealFeatures: string[];
    applications: string;
    image: string;
    icon: string;
}

export interface ProductCategoriesContent {
    sectionHeader: {
        badge: string;
        title: {
            main: string;
            highlight: string;
        };
        description: string;
    };
    ctaButtons: {
        primary: string;
        secondary: string;
    };
    emptyStates: {
        categories: string;
        details: string;
    };
    categoriyDetail: {
        productFeatures: string;
        applicationScenarios: string;
    }
}

export interface ProductFeatureItem {
    id: bigint;
    productCategoryId: bigint;
    icon: string;
    title: string;
    description: string;
    dealBenefits: string[];
}

export interface PerformanceMetric {
    id: bigint;
    productCategoryId: bigint;
    metric: string;
    metricValue: string;
    description: string;
    icon: string;
}

export interface ProductFeaturesContent {
    sectionHeader: {
        title: {
            main: string;
            highlight: string;
        };
        description: string;
        generalPrompt: string;
    };
    featureSection: {
        loading: string;
        empty: string;
        selectCategory: string;
    };
    performanceSection: {
        title: string;
        description: string;
        loading: string;
        empty: string;
        selectCategory: string;
    };
    summarySection: {
        title: string;
        stats: Array<{
            value: string;
            label: string;
        }>;
        descriptionLines: string[];
    };
}

export interface PurchaseChannel {
    title: string;
    description: string;
    icon: string;
    action: string;
    features: string[];
}

export interface SupportService {
    title: string;
    description: string;
    icon: string;
    availability: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface ContactItem {
    icon: string;
    label: string;
    value: string;
}

export interface PurchaseSupportContentText {
    heading: {
        titlePrefix: string;
        titleHighlight: string;
        description: string;
    };
    tabs: {
        purchase: string;
        support: string;
        faq: string;
    };
    contact: {
        title: string;
        items: ContactItem[];
        button: string;
    };
    faqFooter: {
        prompt: string;
        button: string;
    };
}

export interface ProductPurchaseSupportContent {
    purchaseChannels: PurchaseChannel[];
    supportServices: SupportService[];
    faqData: FAQItem[];
    contentTxt: PurchaseSupportContentText;
}

export interface ProductCenterContent {
    productsHeroContent: ProductsHeroContent;
    productCategoriesContent: ProductCategoriesContent;
    productFeaturesContent: ProductFeaturesContent;
    productPurchaseSupportContent: ProductPurchaseSupportContent;
}

export const productsHeroContent: ProductsHeroContent = {
    backgroundImage:
        'https://readdy.ai/api/search-image?query=modern%20energy%20storage%20facility%20with%20rows%20of%20lithium%20battery%20systems%2C%20professional%20warehouse%20with%20LiFePO4%20battery%20modules%20and%20ESS%20units%20arranged%20systematically%2C%20clean%20industrial%20environment%20with%20blue%20and%20white%20corporate%20branding%2C%20advanced%20battery%20technology%20showcase%20with%20safety%20monitoring%20equipment%20and%20digital%20displays%2C%20bright%20professional%20lighting&width=1920&height=1080&seq=products-main-hero&orientation=landscape',
    title: {
        main: '储能电池',
        highlight: '与系统',
    },
    tagline: {
        main: '家用与商用 ESS 解决方案，',
        highlight: '采用 LiFePO₄ 技术，高安全性与长寿命',
    },
    subtitle: {
        main: '主推',
        highlight: '产品',
    },
    stats: [
        { value: '6000+', label: '循环寿命' },
        { value: '15+', label: '年使用寿命' },
        { value: '95%', label: '系统效率' },
        { value: 'IP65', label: '防护等级' },
    ],
    features: [
        { icon: 'ri-shield-check-line', label: '高安全性' },
        { icon: 'ri-stack-line', label: '模块化设计' },
        { icon: 'ri-leaf-line', label: '环保材料' },
        { icon: 'ri-brain-line', label: '智能管理' },
    ],
    scrollIndicatorIcon: 'ri-arrow-down-line',
};

export const productCategoriesContent: ProductCategoriesContent = {
    sectionHeader: {
        badge: '产品系列',
        title: {
            main: '产品',
            highlight: '分类',
        },
        description: '覆盖家用、工商业、动力等全场景应用，提供高效可靠的储能解决方案',
    },
    ctaButtons: {
        primary: '获取报价',
        secondary: '查看详情',
    },
    emptyStates: {
        categories: '暂无产品分类数据。',
        details: '暂无产品分类数据。',
    },
    categoriyDetail: {
        productFeatures: '产品特色',
        applicationScenarios: '应用场景',
    },
};

export const productFeaturesContent: ProductFeaturesContent = {
    sectionHeader: {
        title: {
            main: '产品功能',
            highlight: '与优势',
        },
        description: '领先的储能技术与严格的质量标准相结合，为客户提供安全可靠、高效智能的能源解决方案',
        generalPrompt: '请选择一个产品分类以查看对应的功能与性能数据。',
    },
    featureSection: {
        loading: '正在加载产品功能...',
        empty: '暂无该分类的产品功能数据。',
        selectCategory: '请选择产品分类以查看功能数据。',
    },
    performanceSection: {
        title: '核心性能指标',
        description: '业界领先的技术参数，确保卓越的产品性能',
        loading: '正在加载性能指标...',
        empty: '暂无该分类的性能指标数据。',
        selectCategory: '请选择产品分类以查看性能指标。',
    },
    summarySection: {
        title: '为什么选择 Lithium Valley 储能系统？',
        stats: [
            { value: '12+', label: '年行业经验' },
            { value: '50+', label: '国家和地区' },
            { value: '100k+', label: '用户信赖' },
        ],
        descriptionLines: [
            '从家庭到企业，从固定到移动，我们提供全场景的储能解决方案。',
            '先进的LiFePO₄技术、严格的质量控制、完善的售后服务，',
            '让您的能源投资更安全、更可靠、更高效。',
        ],
    },
};

export const productPurchaseSupportContent: ProductPurchaseSupportContent = {
    purchaseChannels: [
        {
            title: '在线咨询提交询盘',
            description: '提交产品询盘获取详细方案',
            icon: 'ri-customer-service-line',
            action: '提交询盘',
            features: ['在线客服', '技术咨询', '方案定制', '实时报价'],
        },
        {
            title: '成为经销商',
            description: '加入我们的经销商网络，共享市场机遇',
            icon: 'ri-group-line',
            action: '申请成为经销商',
            features: ['区域代理', '销售支持', '培训服务', '市场推广'],
        },
        {
            title: '项目合作',
            description: '大型项目直接合作，提供端到端解决方案',
            icon: 'ri-building-line',
            action: '项目咨询',
            features: ['项目定制', '工程服务', '技术支持', '长期合作'],
        },
    ],
    supportServices: [
        {
            title: '24小时在线客服',
            description: '全天候在线客服支持，快速响应客户需求',
            icon: 'ri-service-line',
            availability: '7×24小时',
        },
        {
            title: '技术支持热线',
            description: '专业技术团队提供安装、调试和维护指导',
            icon: 'ri-phone-line',
            availability: '工作日 9:00-18:00',
        },
        {
            title: '远程诊断服务',
            description: '通过智能监控系统提供远程故障诊断',
            icon: 'ri-computer-line',
            availability: '实时监控',
        },
        {
            title: '现场服务支持',
            description: '必要时派遣工程师提供现场技术服务',
            icon: 'ri-tools-line',
            availability: '预约服务',
        },
    ],
    faqData: [
        {
            question: '如何选择合适的储能系统容量？',
            answer:
                '容量选择需要考虑用电负荷、使用时长、预算等因素。我们的技术团队会根据您的具体需求提供专业的系统设计建议。',
        },
        {
            question: '产品质保期是多长？',
            answer: '我们的储能系统提供10年产品质保，电池核心组件质保期可达15年，让您的投资更有保障。',
        },
        {
            question: '系统安装需要多长时间？',
            answer:
                '根据系统规模不同，家用系统通常1-2天完成安装，商用系统3-7天，我们的模块化设计大大缩短了安装时间。',
        },
        {
            question: '是否支持系统扩容？',
            answer: '是的，我们的模块化设计支持后期扩容，您可以根据需求增长逐步扩展系统容量。',
        },
    ],
    contentTxt: {
        heading: {
            titlePrefix: '购买渠道',
            titleHighlight: '与支持',
            description: '多渠道购买选择，全方位技术支持，让您的储能之旅更加轻松便捷',
        },
        tabs: {
            purchase: '售前咨询',
            support: '技术支持',
            faq: '常见问题',
        },
        contact: {
            title: '联系我们获取支持',
            items: [
                {
                    icon: 'ri-phone-line',
                    label: '客服热线',
                    value: '400-888-8888',
                },
                {
                    icon: 'ri-mail-line',
                    label: '技术邮箱',
                    value: 'support@lithiumvalley.com',
                },
                {
                    icon: 'ri-wechat-line',
                    label: '微信客服',
                    value: 'LithiumValley2024',
                },
            ],
            button: '立即获取技术支持',
        },
        faqFooter: {
            prompt: '没有找到您需要的答案？我们的技术团队随时为您解答',
            button: '联系技术专家',
        },
    },
};

export const productCenterContent: ProductCenterContent = {
    productsHeroContent: productsHeroContent,
    productCategoriesContent: productCategoriesContent,
    productFeaturesContent: productFeaturesContent,
    productPurchaseSupportContent: productPurchaseSupportContent,
};
