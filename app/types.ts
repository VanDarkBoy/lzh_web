export type Category = {
    id: number;
    name: string;
    description: string;
    image: string
};

export interface ProjectItem {
    id: number;
    title: string;
    description: string;
    location: string;
    caseTime: string;
    image: string;
    categoryName: string;
    stats: string;
    size: string;
}

export type ButtonLink = {
    text: string;
};

export type FeatureItem = {
    title: string;
    description: string;
    icon?: string;
    containerClass?: string;
    iconClass?: string;
};

export type HomeContent = {
    heroTitle: string;
    heroHighlight: string;
    backgroundImage: string;
    heroDescription: string;
    heroButtons: {
        primary: ButtonLink;
        secondary: ButtonLink;
    };
    features: FeatureItem[];
    categoriesTitle: string;
    categoriesDescription: string;
    categoryCtaText: string;
    projectsTitle: string;
    projectsDescription: string;
    projectsButtonText: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtons: {
        primary: ButtonLink;
        secondary: ButtonLink;
    };
};

export const DEFAULT_HOME_CONTENT: HomeContent = {
    heroTitle: '不仅是电池',
    heroHighlight: '而是智慧能源',
    backgroundImage: 'https://lithiumvalley.com/images/20251105_021624_98c8a942164a.jpg',
    heroDescription:
        '锂智慧提供高安全、模块化的锂电池储能系统，涵盖住宅与商业应用，助力绿色能源与可持续发展',
    heroButtons: {
        primary: {text: '探索产品'},
        secondary: {text: '立即联系'},
    },
    features: [
        {
            title: '可靠',
            description: '99.9%系统可靠性',
            icon: 'ri-shield-check-line',
            containerClass: 'bg-green-500/20',
            iconClass: 'text-green-400',
        },
        {
            title: '安全',
            description: '多重安全防护',
            icon: 'ri-lock-line',
            containerClass: 'bg-blue-500/20',
            iconClass: 'text-blue-400',
        },
        {
            title: '模块化',
            description: '灵活扩展配置',
            icon: 'ri-stack-line',
            containerClass: 'bg-purple-500/20',
            iconClass: 'text-purple-400',
        },
        {
            title: '绿色',
            description: '环保可持续',
            icon: 'ri-leaf-line',
            containerClass: 'bg-green-500/20',
            iconClass: 'text-green-400',
        },
    ],
    categoriesTitle: '产品分类',
    categoriesDescription: '为不同应用场景提供专业的储能解决方案，满足从家庭到工业的全方位需求',
    categoryCtaText: '了解更多',
    projectsTitle: '成功案例',
    projectsDescription: '全球范围内的成功项目，见证我们的专业实力与卓越品质',
    projectsButtonText: '查看更多案例',
    ctaTitle: '准备开始您的储能之旅？',
    ctaDescription: '我们的专业团队将为您提供一对一咨询服务，制定最适合您需求的储能解决方案',
    ctaButtons: {
        primary: {text: '立即联系'},
        secondary: {text: '下载资料'},
    },
};
