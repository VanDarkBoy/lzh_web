export type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  product: string;
  inquiry: string;
};

export type Types = {
  successMessage: string;
  failureMessage: string;
  networkErrorMessage: string;
  heroTitle: string;
  heroDescription: string;
  serviceTitle: string;
  serviceDescription: string;
  solutionTitle: string;
  solutionDescription: string;
  supportTitle: string;
  supportDescription: string;
  successHeading: string;
  continueButton: string;
  nameLabel: string;
  namePlaceholder: string;
  companyLabel: string;
  emailLabel: string;
  phoneLabel: string;
  phonePlaceholder: string;
  productLabel: string;
  productPlaceholder: string;
  inquiryLabel: string;
  inquiryPlaceholder: string;
  contactFollowUp: string;
  submittingText: string;
  submitText: string;
};

export const initialFormState: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  product: '',
  inquiry: ''
};

export const defaultContent: Types = {
  successMessage: '提交成功！我们的团队将在 24 小时内与您取得联系。',
  failureMessage: '提交失败，请稍后重试。',
  networkErrorMessage: '网络请求出现问题，请稍后重试。',
  heroTitle: '告诉我们您的能源需求',
  heroDescription:
    '提交表单即可获得专属顾问服务。我们将根据您的场景提供定制化的储能解决方案，帮助您快速推进项目落地。',
  serviceTitle: '全程顾问服务',
  serviceDescription:
    '从方案设计到交付运营，顾问团队将与您保持紧密沟通，确保每个阶段顺利推进。',
  solutionTitle: '定制化储能方案',
  solutionDescription:
    '针对家用、商用或工业场景，为您评估容量、并网、能效等关键指标，输出最优解决方案。',
  supportTitle: '持续运营支持',
  supportDescription:
    '提供远程监控、运维培训与售后响应，确保储能系统长期稳定、安全运行。',
  successHeading: '提交成功',
  continueButton: '继续填写新的需求',
  nameLabel: '联系人姓名 *',
  namePlaceholder: '请输入姓名',
  companyLabel: '公司 / 组织',
  emailLabel: '邮箱 *',
  phoneLabel: '联系电话',
  phonePlaceholder: '方便联系的电话',
  productLabel: '感兴趣的产品或方案',
  productPlaceholder: '如：工商业储能系统',
  inquiryLabel: '咨询内容 *',
  inquiryPlaceholder: '请描述您的项目背景、储能容量需求、应用场景或其他关键信息',
  contactFollowUp: '我们将在 24 小时内与您联系，提供初步方案与报价建议。',
  submittingText: '正在提交...',
  submitText: '提交咨询'
};
