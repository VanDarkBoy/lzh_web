export interface ProjectContentStat {
  value: string;
  label: string;
}

export interface Category {
  id: number;
  name: string;
  count: number;
  icon: string;
}

export interface ProjectContentTypes {
  hero: {
    title: string;
    highlight: string;
    description: string;
    backgroundImage: string;
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

export const defaultProjectContent: ProjectContentTypes = {
  hero: {
    title: '落地',
    highlight: '案例',
    description: '发现我们在满足现代生活需求的同时与自然协调的可持续建筑组合',
    backgroundImage: 'https://lithiumvalley.com/images/20251101_090739_c03529f698de.jpg',
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

export const fallbackCategories: Category[] = [
  {
    id: 1,
    name: '全部案例',
    count: 14,
    icon: 'ri-apps-line'
  },
  {
    id: 2,
    name: '家用储能',
    count: 7,
    icon: 'ri-home-line'
  },
  {
    id: 3,
    name: '工商业储能',
    count: 7,
    icon: 'ri-building-line'
  }
];
