export interface DownloadPageContent {
  hero: {
    title: string;
    subtitle: string;
    highlights: string[];
    backgroundImage: string;
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
    highlights: ['产品规格书', '安装手册', '技术参数', '认证证书'],
    backgroundImage: 'https://lithiumvalley.com/images/20251030_092655_f9a0fc4ce4b1.jpg',
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
