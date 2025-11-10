export interface ProductListContent {
  title: string;
  description: string;
  backgroundImage: string;
  errors: {
    fetchProducts: string;
    fetchCategories: string;
    loadFailed: string;
  };
  states: {
    loading: string;
    viewDetails: string;
    productsCategories: string;
    empty: string;
  };
}

export const defaultProductListContent: ProductListContent = {
  title: '产品列表',
  description: '探索 Lithium Valley 完整的储能产品系列，从家用到工业级解决方案',
  backgroundImage:
    'https://readdy.ai/api/search-image?query=Clean%20modern%20energy%20storage%20facility%20with%20multiple%20battery%20systems%20arranged%20in%20professional%20display%2C%20industrial%20ESS%20product%20showcase%20with%20white%20background%2C%20professional%20product%20photography%20for%20lithium%20battery%20storage%20systems&width=1920&height=1080&seq=product-list-hero&orientation=landscape',
  errors: {
    fetchProducts: '获取产品列表失败',
    fetchCategories: '获取产品分类失败',
    loadFailed: '加载产品数据失败，请稍后重试'
  },
  states: {
    loading: '正在加载产品信息...',
    viewDetails: '查看详情',
    productsCategories: '产品分类',
    empty: '暂无符合条件的产品。'
  }
};
