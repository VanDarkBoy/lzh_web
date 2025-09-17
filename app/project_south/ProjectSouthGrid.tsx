'use client';

import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

interface ProjectSouthGridProps {
  scrollY: number;
  selectedCategory: string;
}

const allProjects = [
  {
    id: 1,
    title: "Miami Beach Resort Complex",
    description: "Luxury beachfront resort with hurricane-resistant design and natural ventilation systems",
    category: "Resort",
    location: "Miami, Florida",
    year: "2023",
    image: "https://readdy.ai/api/search-image?query=Luxury%20tropical%20resort%20with%20hurricane-resistant%20architecture%2C%20modern%20beachfront%20hotel%20with%20natural%20ventilation%2C%20palm%20trees%2C%20ocean%20view%2C%20sustainable%20coastal%20building%20design%2C%20white%20and%20natural%20wood%20materials%2C%20professional%20resort%20photography&width=400&height=500&seq=south-1&orientation=portrait",
    stats: "Category 5 Resistant",
    size: "300 Rooms",
    climate: "Tropical"
  },
  {
    id: 2,
    title: "Gulf Coast Research Center",
    description: "Marine research facility with storm surge protection and solar-powered laboratories",
    category: "Coastal",
    location: "Galveston, Texas",
    year: "2023",
    image: "https://readdy.ai/api/search-image?query=Modern%20coastal%20research%20facility%20with%20storm%20protection%2C%20sustainable%20marine%20laboratory%20building%2C%20solar%20panels%2C%20elevated%20design%2C%20ocean%20view%2C%20scientific%20architecture%20with%20natural%20materials%2C%20professional%20architectural%20photography&width=400&height=500&seq=south-2&orientation=portrait",
    stats: "100% Solar Powered",
    size: "75,000 sq ft",
    climate: "Subtropical"
  },
  {
    id: 3,
    title: "New Orleans Eco District",
    description: "Flood-resilient mixed-use development with elevated structures and rain gardens",
    category: "Hurricane-Proof",
    location: "New Orleans, Louisiana",
    year: "2022",
    image: "https://readdy.ai/api/search-image?query=Flood-resilient%20elevated%20buildings%20in%20New%20Orleans%20style%2C%20mixed-use%20sustainable%20development%20with%20rain%20gardens%2C%20hurricane-proof%20architecture%2C%20raised%20foundations%2C%20green%20infrastructure%2C%20Louisiana%20climate%20design&width=400&height=500&seq=south-3&orientation=portrait",
    stats: "15ft Elevation",
    size: "200 Units",
    climate: "Humid Subtropical"
  },
  {
    id: 4,
    title: "Key West Solar Village",
    description: "Off-grid residential community powered entirely by renewable energy systems",
    category: "Solar-Powered",
    location: "Key West, Florida",
    year: "2023",
    image: "https://readdy.ai/api/search-image?query=Solar-powered%20tropical%20village%20in%20Key%20West%2C%20off-grid%20sustainable%20homes%20with%20solar%20panels%2C%20Caribbean-style%20architecture%2C%20palm%20trees%2C%20bright%20colors%2C%20renewable%20energy%20community%2C%20island%20living%20design&width=400&height=500&seq=south-4&orientation=portrait",
    stats: "100% Off-Grid",
    size: "125 Homes",
    climate: "Tropical"
  },
  {
    id: 5,
    title: "Savannah Green Campus",
    description: "University expansion with passive cooling and native landscaping for humid climates",
    category: "Tropical",
    location: "Savannah, Georgia",
    year: "2022",
    image: "https://readdy.ai/api/search-image?query=Sustainable%20university%20campus%20in%20Savannah%20with%20passive%20cooling%2C%20native%20landscaping%2C%20Georgian%20colonial%20architecture%20influence%2C%20green%20buildings%2C%20students%20outdoors%2C%20humid%20climate%20design%2C%20educational%20facility&width=400&height=500&seq=south-5&orientation=portrait",
    stats: "40% Cooling Reduction",
    size: "150,000 sq ft",
    climate: "Humid Subtropical"
  },
  {
    id: 6,
    title: "Charleston Historic Retrofit",
    description: "Historic district renovation combining preservation with modern sustainable technologies",
    category: "Coastal",
    location: "Charleston, South Carolina",
    year: "2023",
    image: "https://readdy.ai/api/search-image?query=Historic%20Charleston%20architecture%20retrofit%20with%20sustainable%20technology%2C%20preserved%20colonial%20buildings%20with%20modern%20green%20upgrades%2C%20historic%20district%20renovation%2C%20traditional%20and%20modern%20design%20blend%2C%20coastal%20architecture&width=400&height=500&seq=south-6&orientation=portrait",
    stats: "Historic Preservation",
    size: "45 Buildings",
    climate: "Subtropical"
  },
  {
    id: 7,
    title: "Everglades Research Station",
    description: "Minimally invasive research facility designed to coexist with sensitive wetland ecosystems",
    category: "Tropical",
    location: "Everglades, Florida",
    year: "2022",
    image: "https://readdy.ai/api/search-image?query=Sustainable%20research%20station%20in%20Everglades%20wetlands%2C%20minimal%20environmental%20impact%20building%2C%20elevated%20walkways%2C%20natural%20materials%2C%20wildlife%20observation%20facility%2C%20ecosystem-friendly%20architecture%2C%20swamp%20environment&width=400&height=500&seq=south-7&orientation=portrait",
    stats: "Zero Impact Design",
    size: "25,000 sq ft",
    climate: "Tropical Wetland"
  },
  {
    id: 8,
    title: "Austin Solar Community",
    description: "Net-positive energy neighborhood with shared battery storage and smart grid integration",
    category: "Solar-Powered",
    location: "Austin, Texas",
    year: "2023",
    image: "https://readdy.ai/api/search-image?query=Modern%20solar-powered%20community%20in%20Austin%20Texas%2C%20net-positive%20energy%20homes%2C%20shared%20battery%20storage%2C%20smart%20grid%20technology%2C%20contemporary%20southwestern%20architecture%2C%20solar%20panels%2C%20sustainable%20neighborhood&width=400&height=500&seq=south-8&orientation=portrait",
    stats: "150% Energy Positive",
    size: "280 Homes",
    climate: "Hot Semi-Arid"
  }
];

export default function ProjectSouthGrid({ scrollY, selectedCategory }: ProjectSouthGridProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredProjects = selectedCategory === 'All' 
    ? allProjects 
    : allProjects.filter(project => project.category === selectedCategory);

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group transition-all duration-1000 ${
                inView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer h-full">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-emerald-600/90 backdrop-blur-sm text-white px-3 py-1 text-xs rounded-full font-medium">
                      {project.category}
                    </span>
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 text-xs rounded-full font-medium">
                      {project.year}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center text-sm mb-2">
                      <i className="ri-map-pin-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                      {project.location}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <i className="ri-building-line mr-1 w-3 h-3 flex items-center justify-center"></i>
                        {project.size}
                      </div>
                      <div className="bg-emerald-500/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        {project.climate}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 text-xs rounded-full font-medium">
                      {project.stats}
                    </span>
                    <button className="text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer">
                      <i className="ri-arrow-right-line text-lg w-5 h-5 flex items-center justify-center"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <i className="ri-building-line text-6xl text-gray-300 mb-6 w-16 h-16 flex items-center justify-center mx-auto"></i>
            <h3 className="text-2xl font-light text-gray-500 mb-4">No projects found</h3>
            <p className="text-base text-gray-400">Try selecting a different category to explore more projects.</p>
          </div>
        )}
      </div>
    </section>
  );
}