export interface DownloadPageContent {
  hero: {
    title: string;
    subtitle: string;
    highlights: string[];
  };
  messages: {
    fetchItemsError: string;
    fetchCategoriesError: string;
    genericError: string;
    missingApiBase: string;
    fetchDownloadLinkError: string;
    invalidDownloadLink: string;
    retryDownloadLinkError: string;
    loadingText: string;
    downloadButtonText: string;
    emptyStateText: string;
  };
}

export const fallbackDownloadPageContent: DownloadPageContent = {
  hero: {
    title: '下载中心',
    subtitle: '获取产品技术文档、规格说明书、安装指南等专业资料',
    highlights: ['产品规格书', '安装手册', '技术参数', '认证证书']
  },
  messages: {
    fetchItemsError: '获取资料列表失败',
    fetchCategoriesError: '获取资料分类失败',
    genericError: '加载资料失败，请稍后重试',
    missingApiBase: '未配置下载接口地址',
    fetchDownloadLinkError: '获取下载链接失败',
    invalidDownloadLink: '下载链接无效',
    retryDownloadLinkError: '获取下载链接失败，请稍后重试',
    loadingText: '正在加载资料...',
    downloadButtonText: '立即下载',
    emptyStateText: '当前分类下暂无可下载资料。'
  }
};

export function normalizeDownloadPageContent(input: unknown): DownloadPageContent {
  const normalized = { ...fallbackDownloadPageContent };

  if (!input || typeof input !== 'object') {
    return normalized;
  }

  const data = input as Partial<DownloadPageContent> & {
    hero?: Partial<DownloadPageContent['hero']>;
    messages?: Partial<DownloadPageContent['messages']>;
  };

  if (data.hero) {
    const { title, subtitle, highlights } = data.hero;
    normalized.hero = {
      title: typeof title === 'string' && title.trim() ? title : fallbackDownloadPageContent.hero.title,
      subtitle:
        typeof subtitle === 'string' && subtitle.trim() ? subtitle : fallbackDownloadPageContent.hero.subtitle,
      highlights:
        Array.isArray(highlights) && highlights.length > 0
          ? highlights.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
          : fallbackDownloadPageContent.hero.highlights
    };

    if (normalized.hero.highlights.length === 0) {
      normalized.hero.highlights = fallbackDownloadPageContent.hero.highlights;
    }
  }

  if (data.messages) {
    normalized.messages = { ...fallbackDownloadPageContent.messages, ...sanitizeMessages(data.messages) };
  }

  return normalized;
}

function sanitizeMessages(messages: Partial<DownloadPageContent['messages']>): Partial<DownloadPageContent['messages']> {
  const result: Partial<DownloadPageContent['messages']> = {};

  (Object.keys(fallbackDownloadPageContent.messages) as Array<keyof DownloadPageContent['messages']>).forEach(
    (key) => {
      const value = messages[key];
      if (typeof value === 'string' && value.trim()) {
        result[key] = value;
      }
    }
  );

  return result;
}
