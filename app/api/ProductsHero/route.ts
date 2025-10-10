import { NextResponse } from 'next/server';

type TitleBlock = {
  main: string;
  highlight: string;
};

type Stat = {
  value: string;
  label: string;
};

type Feature = {
  icon: string;
  label: string;
};

type ProductsHeroContent = {
  backgroundImage: string;
  title: TitleBlock;
  tagline: TitleBlock;
  subtitle: TitleBlock;
  stats: Stat[];
  features: Feature[];
  scrollIndicatorIcon: string;
};

const content: ProductsHeroContent = {
  backgroundImage:
    "https://readdy.ai/api/search-image?query=modern%20energy%20storage%20facility%20with%20rows%20of%20lithium%20battery%20systems%2C%20professional%20warehouse%20with%20LiFePO4%20battery%20modules%20and%20ESS%20units%20arranged%20systematically%2C%20clean%20industrial%20environment%20with%20blue%20and%20white%20corporate%20branding%2C%20advanced%20battery%20technology%20showcase%20with%20safety%20monitoring%20equipment%20and%20digital%20displays%2C%20bright%20professional%20lighting&width=1920&height=1080&seq=products-main-hero&orientation=landscape",
  title: {
    main: "储能电池",
    highlight: "与系统",
  },
  tagline: {
    main: "家用与商用 ESS 解决方案，",
    highlight: "采用 LiFePO₄ 技术，高安全性与长寿命",
  },
  subtitle: {
    main: "主推",
    highlight: "产品",
  },
  stats: [
    { value: "6000+", label: "循环寿命" },
    { value: "15+", label: "年使用寿命" },
    { value: "95%", label: "系统效率" },
    { value: "IP65", label: "防护等级" },
  ],
  features: [
    { icon: "ri-shield-check-line", label: "高安全性" },
    { icon: "ri-stack-line", label: "模块化设计" },
    { icon: "ri-leaf-line", label: "环保材料" },
    { icon: "ri-brain-line", label: "智能管理" },
  ],
  scrollIndicatorIcon: "ri-arrow-down-line",
};

export async function GET() {
  return NextResponse.json(content);
}
