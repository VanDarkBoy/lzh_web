'use client';

import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatAPP from '../components/WhatAPP';
import FloatingCountryFlags from '../components/FloatingCountryFlags';

type Slide = {
  image: string;
  title: string;
  description: string;
};

const slides: Slide[] = [
  {
    image:
      'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1600&q=80',
    title: '智慧园区储能项目',
    description:
      '2.5MWh 一体化户外柜，支持柔性接入，保障园区峰谷调节与关键信号站点 24 小时不断电。',
  },
  {
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80',
    title: '光储充一体化电站',
    description:
      '结合屋顶光伏与直流快充桩，实现“自发自用+多场景调度”，全年平均综合效率提升 18%。',
  },
  {
    image:
      'https://images.unsplash.com/photo-1502307947040-17b3c3b359b6?auto=format&fit=crop&w=1600&q=80',
    title: '数据中心备用储能',
    description:
      '模块化液冷集装箱方案，为高算力数据中心提供 10 分钟内全功率响应能力与远程可视化运维。',
  },
];

const highlights = [
  {
    label: '投运容量',
    value: '150+ MWh',
    detail: '多场景商业化项目稳定运行',
  },
  {
    label: '平均能效',
    value: '≥ 92%',
    detail: '高效双向变流与智能策略协同',
  },
  {
    label: '安全记录',
    value: '0 事故',
    detail: '全栈 BMS 监控与多级消防冗余',
  },
  {
    label: '覆盖区域',
    value: '11 个国家',
    detail: '工商业、数据中心、微电网等典型场景',
  },
];

const valueItems = [
  {
    title: '商业价值',
    points: [
      '峰谷套利 + 需求侧响应，单站年化收益提升可达 12%-18%。',
      '灵活的功率调度，支持 VPP（虚拟电厂）聚合接入。',
    ],
  },
  {
    title: '安全可靠',
    points: [
      'PACK-Cluster-Station 全链路安全防护，实时温控与烟雾预警。',
      '集成级联熔断与气溶胶主动灭火，满足 UL9540A、GB/T 34131 要求。',
    ],
  },
  {
    title: '运维智能',
    points: [
      '云边协同的数字孪生，定位异常时间缩短 60%。',
      'SaaS 平台支持 OTA 升级与多维报表，开放 API 便于对接第三方系统。',
    ],
  },
];

const milestones = [
  {
    year: '2021',
    title: '首个工商业储能上线',
    summary: '完成 5MWh 工厂削峰填谷试点，验证高倍率电芯稳定性。',
  },
  {
    year: '2022',
    title: '光储充示范站投运',
    summary: '与头部车企合作搭建充电示范站，实现“源网荷储”协同调度。',
  },
  {
    year: '2023',
    title: '海外微电网落地',
    summary: '东南亚岛屿微电网项目上线，全年替代柴油发电 1800+ 小时。',
  },
  {
    year: '2024',
    title: '数据中心备电升级',
    summary: '推出液冷集装箱方案，满足 Tier III 数据中心高可用需求。',
  },
];

export default function ProjectsDetailPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = slides.length;
  const currentSlide = useMemo(() => slides[activeIndex], [activeIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, 5200);

    return () => clearInterval(timer);
  }, [slideCount]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slideCount);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.4),transparent_30%)]" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_10%,rgba(249,115,22,0.4),transparent_25%)]" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
            <p className="text-sm sm:text-base uppercase tracking-[0.3em] text-sky-300 mb-4">
              经典案例详情
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-6 text-white">
              储能成功案例 · 赋能零碳业务连续性
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 max-w-3xl leading-relaxed">
              我们通过高安全、高能效的储能系统，为工商业园区、交通枢纽、数据中心及海外微电网
              提供稳定电力支撑，实现削峰填谷、需求响应和应急备电的全场景覆盖。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['源网荷储协同', '即插即用集装箱', '全栈 BMS 安全防护', '云端可视化运维'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm text-white"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        <section className="relative -mt-16 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-slate-800/80 border border-white/10 px-5 py-6 shadow-lg backdrop-blur"
              >
                <p className="text-sm uppercase tracking-wide text-slate-300">{item.label}</p>
                <p className="text-2xl font-semibold text-white mt-2">{item.value}</p>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-4">
              <p className="text-sky-300 text-sm font-medium">项目背景</p>
              <h2 className="text-3xl font-semibold text-white">工商业储能标杆案例</h2>
              <p className="text-slate-200 leading-relaxed">
                面对能源成本上涨与用电可靠性要求，客户选择部署 30MWh 工商业储能系统。我们提供的
                液冷集装箱方案具备高度集成、占地紧凑以及可扩展的功率接口，帮助客户实现“削峰填谷 +
                应急备电 + 需求响应”三位一体的收益闭环。
              </p>
              <p className="text-slate-200 leading-relaxed">
                项目上线后，峰谷套利与调峰辅助服务收益并行，全年综合能耗下降 12%，碳排放减少
                8,300+ 吨。系统支持毫秒级切换，保障生产线和关键 IT 设备在电网波动时持续运行。
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-800/70 border border-white/10 px-4 py-3">
                  <p className="text-sm text-slate-300">收益模式</p>
                  <p className="text-white font-semibold mt-1">削峰填谷 / 辅助调峰 / 备用容量</p>
                </div>
                <div className="rounded-xl bg-slate-800/70 border border-white/10 px-4 py-3">
                  <p className="text-sm text-slate-300">系统形态</p>
                  <p className="text-white font-semibold mt-1">2 小时液冷集装箱 + PCS 柔性扩展</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-slate-900">
                <div className="relative h-[420px] sm:h-[460px]">
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-sky-200 text-sm font-medium">实景照片</p>
                    <h3 className="text-2xl font-semibold text-white mt-1">{currentSlide.title}</h3>
                    <p className="text-slate-200 mt-2 max-w-2xl">{currentSlide.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="p-2 rounded-full bg-white/15 hover:bg-white/25 transition"
                      aria-label="上一张"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="p-2 rounded-full bg-white/15 hover:bg-white/25 transition"
                      aria-label="下一张"
                    >
                      →
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-slate-900/80 backdrop-blur">
                  <div className="flex items-center gap-2">
                    {slides.map((slide, index) => (
                      <button
                        key={slide.title}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          index === activeIndex ? 'bg-sky-400 w-8' : 'bg-white/30 w-2'
                        }`}
                        aria-label={`跳转到 ${slide.title}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-300">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <p className="text-sky-300 text-sm font-medium">价值亮点</p>
              <h2 className="text-3xl font-semibold text-white mt-2">全生命周期价值闭环</h2>
              <p className="text-slate-200 mt-3 leading-relaxed">
                从方案设计、产品交付到运维升级，我们提供端到端的工程交付能力，确保系统稳定运行
                与投资回报可测可控。
              </p>
            </div>
            <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
              {valueItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-slate-800/80 border border-white/10 p-5 shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <ul className="space-y-2 text-slate-200 text-sm leading-relaxed list-disc list-inside">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-sky-300 text-sm font-medium">交付里程碑</p>
                <h2 className="text-3xl font-semibold text-white mt-2">持续迭代的工程能力</h2>
                <p className="text-slate-200 mt-2 max-w-3xl">
                  每一个里程碑都对应着系统工程、软件算法和安全策略的升级，确保在不同市场的合规与性能
                  要求下持续创造价值。
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white">
                  UL9540A / IEC 62619 / GB 标准验证
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white">
                  EMS & BMS 深度自研
                </span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {milestones.map((item) => (
                <div
                  key={item.year}
                  className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 h-full"
                >
                  <p className="text-sky-300 text-sm font-semibold">{item.year}</p>
                  <h3 className="text-xl font-semibold text-white mt-2">{item.title}</h3>
                  <p className="text-slate-200 mt-2 text-sm leading-relaxed">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatAPP />
      <FloatingCountryFlags />
    </div>
  );
}
