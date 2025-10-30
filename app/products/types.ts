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
