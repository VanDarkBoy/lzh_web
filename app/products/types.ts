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

export interface ProductFeatureItem {
  id: number;
  productCategoryId: number;
  icon: string;
  title: string;
  description: string;
  dealBenefits: string[];
}

export interface PerformanceMetric {
  id: number;
  productCategoryId: number;
  metric: string;
  metricValue: string;
  description: string;
  icon: string;
}
