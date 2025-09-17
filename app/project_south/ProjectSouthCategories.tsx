'use client';

interface ProjectSouthCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { name: 'All', icon: 'ri-apps-line' },
  { name: 'Resort', icon: 'ri-building-2-line' },
  { name: 'Coastal', icon: 'ri-ship-line' },
  { name: 'Tropical', icon: 'ri-leaf-line' },
  { name: 'Hurricane-Proof', icon: 'ri-shield-line' },
  { name: 'Solar-Powered', icon: 'ri-sun-line' }
];

export default function ProjectSouthCategories({ selectedCategory, onCategoryChange }: ProjectSouthCategoriesProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Specialized <span className="text-emerald-700">Categories</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our southern projects are designed to thrive in challenging climates while maintaining sustainability
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              className={`group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                selectedCategory === category.name
                  ? 'bg-emerald-600 text-white shadow-2xl scale-105'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 hover:scale-105 shadow-lg'
              }`}
            >
              <div className="text-center">
                <i className={`${category.icon} text-3xl mb-3 w-8 h-8 flex items-center justify-center mx-auto ${
                  selectedCategory === category.name ? 'text-white' : 'text-emerald-600 group-hover:text-emerald-700'
                }`}></i>
                <div className="font-semibold text-sm whitespace-nowrap">{category.name}</div>
              </div>
              
              {selectedCategory === category.name && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                  <i className="ri-check-line text-white text-sm w-4 h-4 flex items-center justify-center"></i>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}