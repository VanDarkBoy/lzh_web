'use client';

interface ProductCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'All', name: 'All Products', icon: 'ri-apps-line' },
  { id: 'Solar', name: 'Solar Systems', icon: 'ri-sun-line' },
  { id: 'Battery', name: 'Energy Storage', icon: 'ri-battery-line' },
  { id: 'HVAC', name: 'HVAC Systems', icon: 'ri-temp-cold-line' },
  { id: 'Insulation', name: 'Insulation', icon: 'ri-home-6-line' },
  { id: 'Windows', name: 'Smart Windows', icon: 'ri-window-line' },
  { id: 'Lighting', name: 'LED Lighting', icon: 'ri-lightbulb-line' }
];

export default function ProductCategories({ selectedCategory, onCategoryChange }: ProductCategoriesProps) {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">
            Product Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive range of sustainable building products and renewable energy solutions
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                selectedCategory === category.id
                  ? 'bg-emerald-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              <i className={`${category.icon} mr-2 w-4 h-4 flex items-center justify-center`}></i>
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}