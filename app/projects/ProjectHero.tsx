'use client';

import type { ProjectContentTypes } from './types';

interface ProjectHeroProps {
    scrollY: number;
    content: ProjectContentTypes['hero'];
}

export default function ProjectHero({scrollY, content}: ProjectHeroProps) {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${content.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    transform: `translateY(${scrollY * 0.5}px)`,
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10"></div>

            <div className="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-white mb-6 sm:mb-8 leading-tight">
                    {content.title}
                    <br/>
                    <span className="text-emerald-400">{content.highlight}</span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
                    {content.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-4xl mx-auto">
                    {content.stats.map((stat) => (
                        <div key={`${stat.label}-${stat.value}`} className="text-center">
                            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-400 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-white/80 text-sm sm:text-base lg:text-lg font-light tracking-wide">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="animate-bounce">
                    <i className="ri-arrow-down-line text-white text-2xl w-6 h-6 flex items-center justify-center"></i>
                </div>
            </div>
        </section>
    );
}
