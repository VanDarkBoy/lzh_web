import { NextResponse } from 'next/server';
import type { ProductCategoriesContent } from '@/app/products/types';

const content: ProductCategoriesContent = {
  sectionHeader: {
    badge: '产品系列',
    title: {
      main: '产品',
      highlight: '分类',
    },
    description:
      '覆盖家用、工商业、动力等全场景应用，提供高效可靠的储能解决方案',
  },
  ctaButtons: {
    primary: '获取报价',
    secondary: '查看详情',
  },
  emptyStates: {
    categories: '暂无产品分类数据。',
    details: '暂无产品分类数据。',
  },
};

export async function GET() {
  return NextResponse.json(content);
}
