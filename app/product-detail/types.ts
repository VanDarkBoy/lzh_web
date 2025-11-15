export interface ProductDetailData {
  id: bigint;
  name: string;
  category: bigint;
  categoryName: string;
  description: string;
  fullDescription: string;
  image: string;
  dealGallery: string[];

  // -------
  capacity: string;
  voltage: string;
  current: string;
  cycles: string;
  efficiency: string;
  warranty: string;
  operating: string;
  protection: string;

  // -------
  dealFeatures: string[];
  dealApplications: string[];
}

export interface PageContent {
  invalidProductId: string;
  productDetailRequestError: string;
  productNotFoundMessage: string;
  loadFailedMessage: string;
  loadingLabel: string;
  detailFailedTitle: string;
  goHomeLabel: string;
  productNotFoundTitle: string;
  contactSalesLabel: string;
  downloadSpecsLabel: string;
  technicalSpecificationsTitle: string;
  technicalSpecificationsDescription: string;
  keySpecificationsTitle: string;
  keyFeaturesTitle: string;
  applicationsTitle: string;
  ctaTitle: string;
  ctaDescription: string;
  scheduleConsultationLabel: string;
  downloadFullManualLabel: string;
  whyChooseUsTitle: string;
  trustedByDescription: string;
  endToEndSolutions: string;
  monitoringSupport: string;
  provenTrackRecord: string;
  scalableSystems: string;

  capacity: string;
  voltage: string;
  current: string;
  cycles: string;
  efficiency: string;
  warranty: string;
  operating: string;
  protection: string;
}

export const defaultPageContent: PageContent = {
  invalidProductId: '未提供有效的产品ID',
  productDetailRequestError: '获取产品详情失败',
  productNotFoundMessage: '未找到对应的产品信息',
  loadFailedMessage: '加载产品详情失败，请稍后重试',
  loadingLabel: '正在加载产品详情...',
  detailFailedTitle: '产品详情加载失败',
  goHomeLabel: '回到主页',
  productNotFoundTitle: '未找到产品',
  contactSalesLabel: '联系销售',
  downloadSpecsLabel: '下载规格',
  technicalSpecificationsTitle: '技术规格',
  technicalSpecificationsDescription: '详细的技术规格和性能参数',
  keySpecificationsTitle: '关键规格',
  keyFeaturesTitle: '关键功能',
  applicationsTitle: '应用方案',
  ctaTitle: '准备部署世界一流的储能解决方案了吗？',
  ctaDescription: '我们的专家将帮助您设计和实施从咨询到部署的完美系统。',
  scheduleConsultationLabel: '安排咨询',
  downloadFullManualLabel: '下载完整的手册',
  whyChooseUsTitle: '为什么选择我们？',
  trustedByDescription: '受到全球行业领导者的信任',
  endToEndSolutions: '端到端储能解决方案',
  monitoringSupport: '全天候监控和支持服务',
  provenTrackRecord: '跨行业良好的业绩记录',
  scalableSystems: '根据您的需求量身定制的可扩展系统',

  capacity: '容量',
  voltage: '电压',
  current: '电流',
  cycles: '循环次数',
  efficiency: '电耗',
  warranty: '质保',
  operating: '环境温度',
  protection: '防水级别',
};
