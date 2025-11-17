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
                <div className="rounded-xl bg-slate-800/70 border border-white/10 px-4 py-3">
                  <p className="text-sm text-slate-300">系统形态</p>
                  <p className="text-white font-semibold mt-1">2 小时液冷集装箱 + PCS 柔性扩展</p>
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
      </main>
      <Footer />
      <WhatAPP />
      <FloatingCountryFlags />
    </div>
  );
}
