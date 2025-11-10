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
