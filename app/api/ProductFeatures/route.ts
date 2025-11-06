import { NextResponse } from 'next/server';
import type { ProductFeaturesContent } from '@/app/products/types';

const content: ProductFeaturesContent = {
  sectionHeader: {
    title: {
      main: '产品功能',
      highlight: '与优势',
    },
    description:
      '领先的储能技术与严格的质量标准相结合，为客户提供安全可靠、高效智能的能源解决方案',
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

export async function GET() {
  return NextResponse.json(content);
}
