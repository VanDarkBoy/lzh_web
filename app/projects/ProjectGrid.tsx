
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

import type { ProjectContent } from './projectContent';

interface ProjectGridProps {
  scrollY: number;
  selectedCategory: number | 'All';
  content: ProjectContent['grid'];
}

interface ProjectItem {
  id: number | string;
  title: string;
  description: string;
  categoryId: number;
  categoryName: string;
  location: string;
  caseTime: string;
  image: string;
  stats: string;
  size: string;
}

export default function ProjectGrid({ scrollY, selectedCategory, content }: ProjectGridProps) {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const loadErrorMessageRef = useRef(content.loadError);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    loadErrorMessageRef.current = content.loadError;
    setError((current) => (current ? content.loadError : current));
  }, [content.loadError]);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchProjects = async () => {
      try {
        if (isMounted) {
          setLoading(true);
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/getAllProductCase`, {
          signal: controller.signal,
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch project cases: ${response.status}`);
        }

        const payload = await response.json();
        const rawProjects: any[] = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : [];

        const normalizedProjects: ProjectItem[] = rawProjects.map((project, index) => {
          const resolvedId =
            project.id ?? project.caseId ?? project.projectId ?? `project-${index}`;
          const resolvedCategoryId = project.categoryId ?? project.caseCategoryId ?? project.typeId;

          const categoryIdNumber = typeof resolvedCategoryId === 'number'
            ? resolvedCategoryId
            : Number(resolvedCategoryId) || -1;

          return {
            id: resolvedId,
            title: project.title ?? project.caseTitle ?? project.name ?? '未命名案例',
            description: project.description ?? project.summary ?? '敬请期待更多案例详情。',
            categoryId: categoryIdNumber,
            categoryName: String(project.categoryName ?? project.caseCategoryName ?? project.typeName ?? '未知'),
            location: project.location ?? project.city ?? project.region ?? '未知地点',
            caseTime: project.caseTime ?? project.year ?? project.date ?? '未知时间',
            image: project.image ?? project.cover ?? project.thumbnail ?? '',
            stats: project.stats ?? project.highlight ?? project.result ?? '查看更多',
            size: project.size ?? project.capacity ?? project.scale ?? '--',
          };
        });

        if (!isMounted) {
          return;
        }

        setProjects(normalizedProjects);
        setError(null);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        if (!isMounted) {
          return;
        }
        console.error('Failed to load project cases', err);
        setError(loadErrorMessageRef.current);
        setProjects([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return projects;
    }
    return projects.filter((project) => project.categoryId === selectedCategory);
  }, [projects, selectedCategory]);

  const showSkeleton = loading && projects.length === 0;

  return (
    <section ref={ref} className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {showSkeleton &&
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="bg-white rounded-lg shadow-lg h-full animate-pulse"
              >
                <div className="h-48 sm:h-56 lg:h-64 bg-gray-200" />
                <div className="p-4 sm:p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-3 bg-gray-100 rounded" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}

          {!showSkeleton && filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group transition-all duration-1000 ${
                inView
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Link
                href={`/projects-detail/${project.id}`}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer h-full flex flex-col"
              >
                <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                  <img
                    src={project.image || 'https://placehold.co/600x800?text=Project'}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className="bg-emerald-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full font-medium">
                      {project.categoryName}
                    </span>
                  </div>

                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <span className="bg-white/90 text-gray-800 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full font-medium">
                      {project.caseTime}
                    </span>
                  </div>

                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center text-xs sm:text-sm mb-1 sm:mb-2">
                      <i className="ri-map-pin-line mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center"></i>
                      {project.location}
                    </div>
                    <div className="flex items-center text-xs sm:text-sm">
                      <i className="ri-battery-line mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center"></i>
                      {project.size}
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-emerald-700 transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-center mt-auto">
                    <span className="bg-emerald-50 text-emerald-700 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full font-medium">
                      {project.stats}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-12 sm:py-20">
            <i className="ri-battery-line text-4xl sm:text-6xl text-gray-300 mb-4 sm:mb-6 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto"></i>
            <h3 className="text-xl sm:text-2xl font-light text-gray-500 mb-3 sm:mb-4">{content.emptyTitle}</h3>
            <p className="text-sm sm:text-base text-gray-400">{content.emptyDescription}</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-12 sm:py-20">
            <i className="ri-error-warning-line text-4xl sm:text-5xl text-red-400 mb-4 sm:mb-6 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mx-auto"></i>
            <h3 className="text-xl sm:text-2xl font-light text-red-500 mb-3 sm:mb-4">{error}</h3>
            <p className="text-sm sm:text-base text-gray-400">{content.retrySuggestion}</p>
          </div>
        )}
      </div>
    </section>
  );
}
