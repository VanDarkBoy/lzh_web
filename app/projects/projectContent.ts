export interface ProjectContentStat {
  value: string;
  label: string;
}

export interface ProjectContent {
  hero: {
    title: string;
    highlight: string;
    description: string;
    stats: ProjectContentStat[];
  };
  categories: {
    title: string;
    highlight: string;
    description: string;
    fetchError: string;
    loadError: string;
  };
  grid: {
    loadError: string;
    emptyTitle: string;
    emptyDescription: string;
    retrySuggestion: string;
  };
}

export const defaultProjectContent: ProjectContent = {
  hero: {
    title: '落地',
    highlight: '案例',
    description: '发现我们在满足现代生活需求的同时与自然协调的可持续建筑组合',
    stats: [
      { value: '50+', label: '项目' },
      { value: '15', label: '国家' },
      { value: '85%', label: '节能' },
    ],
  },
  categories: {
    title: '应用',
    highlight: '案例',
    description: '从家用储能到工商业储能，我们的解决方案在各个领域都有成功应用',
    fetchError: '获取项目分类失败',
    loadError: '加载项目分类失败',
  },
  grid: {
    loadError: '案例数据加载失败，请稍后重试。',
    emptyTitle: '暂无相关案例',
    emptyDescription: '请选择其他分类查看更多应用案例',
    retrySuggestion: '请检查网络连接或稍后再试。',
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
}

function getStats(value: unknown, fallback: ProjectContentStat[]): ProjectContentStat[] {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const stats = value
    .map((item) => {
      if (!isRecord(item)) {
        return null;
      }

      const statValue = getString(item.value, '');
      const statLabel = getString(item.label, '');

      if (!statValue || !statLabel) {
        return null;
      }

      return { value: statValue, label: statLabel };
    })
    .filter((item): item is ProjectContentStat => item !== null);

  return stats.length > 0 ? stats : fallback;
}

export function normalizeProjectContent(payload: unknown): ProjectContent {
  if (!isRecord(payload)) {
    return defaultProjectContent;
  }

  const hero = isRecord(payload.hero) ? payload.hero : {};
  const categories = isRecord(payload.categories) ? payload.categories : {};
  const grid = isRecord(payload.grid) ? payload.grid : {};

  return {
    hero: {
      title: getString(hero.title, defaultProjectContent.hero.title),
      highlight: getString(hero.highlight, defaultProjectContent.hero.highlight),
      description: getString(hero.description, defaultProjectContent.hero.description),
      stats: getStats(hero.stats, defaultProjectContent.hero.stats),
    },
    categories: {
      title: getString(categories.title, defaultProjectContent.categories.title),
      highlight: getString(categories.highlight, defaultProjectContent.categories.highlight),
      description: getString(categories.description, defaultProjectContent.categories.description),
      fetchError: getString(categories.fetchError, defaultProjectContent.categories.fetchError),
      loadError: getString(categories.loadError, defaultProjectContent.categories.loadError),
    },
    grid: {
      loadError: getString(grid.loadError, defaultProjectContent.grid.loadError),
      emptyTitle: getString(grid.emptyTitle, defaultProjectContent.grid.emptyTitle),
      emptyDescription: getString(grid.emptyDescription, defaultProjectContent.grid.emptyDescription),
      retrySuggestion: getString(grid.retrySuggestion, defaultProjectContent.grid.retrySuggestion),
    },
  };
}
