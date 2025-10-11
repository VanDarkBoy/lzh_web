import { NextResponse } from 'next/server';

type PurchaseChannel = {
  title: string;
  description: string;
  icon: string;
  action: string;
  features: string[];
};

type SupportService = {
  title: string;
  description: string;
  icon: string;
  availability: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type ContactItem = {
  icon: string;
  label: string;
  value: string;
};

type ContentText = {
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
};

type ProductPurchaseSupportContent = {
  purchaseChannels: PurchaseChannel[];
  supportServices: SupportService[];
  faqData: FAQItem[];
  contentTxt: ContentText;
};

const content: ProductPurchaseSupportContent = {
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
      answer:
        '我们的储能系统提供10年产品质保，电池核心组件质保期可达15年，让您的投资更有保障。',
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

export async function GET() {
  return NextResponse.json(content);
}
