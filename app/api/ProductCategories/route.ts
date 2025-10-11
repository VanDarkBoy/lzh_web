import { NextResponse } from 'next/server';

const productCategoriesCopy = {
  badgeLabel: '产品系列',
  title: '产品',
  titleHighlight: '分类',
  description: '覆盖家用、工商业、动力等全场景应用，提供高效可靠的储能解决方案',
  loadingCategoriesText: '正在加载产品分类...',
  emptyCategoriesText: '暂无产品分类数据。',
  loadingDetailsText: '正在加载产品信息...',
  featuresTitle: '产品特色',
  applicationsTitle: '应用场景',
  primaryCtaLabel: '获取报价',
  secondaryCtaLabel: '查看详情',
};

export async function GET() {
  return NextResponse.json(productCategoriesCopy);
}
