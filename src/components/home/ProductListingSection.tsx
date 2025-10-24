import { useState } from "react";
import { Home, Music, Smartphone, HardDrive, ChevronDown, Star, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const products = [
  {
    id: 1,
    name: "Phone Holder Sakti",
    category: "Other",
    rating: 5.0,
    reviews: "1.2k",
    price: "$29.90",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    name: "Headsound",
    category: "Music",
    rating: 5.0,
    reviews: "1.2k",
    price: "$12.00",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    name: "Adudu Cleaner",
    category: "Other",
    rating: 4.4,
    reviews: "1k",
    price: "$29.90",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    name: "CCTV Maling",
    category: "Home",
    rating: 4.8,
    reviews: "120",
    price: "$50.00",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    name: "Stuffus Peker 32",
    category: "Other",
    rating: 5.0,
    reviews: "1.2k",
    price: "$9.90",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    name: "Stuffus R175",
    category: "Music",
    rating: 4.8,
    reviews: "2.4k",
    price: "$34.10",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  }
];

const categories = [
  { name: "Électronique", count: 245 },
  { name: "Maison & Jardin", count: 189 },
  { name: "Véhicules", count: 156 },
  { name: "Mode & Beauté", count: 312 },
  { name: "Sports & Loisirs", count: 178 },
  { name: "Livres & Médias", count: 203 },
  { name: "Jouets & Enfants", count: 167 },
  { name: "Services", count: 94 }
];

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />;
        } else if (i === fullStars && hasHalfStar) {
          return (
            <div key={i} className="relative">
              <Star className="h-4 w-4 text-gray-300" />
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          );
        } else {
          return <Star key={i} className="h-4 w-4 text-gray-300" />;
        }
      })}
    </div>
  );
};

export function ProductListingSection() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isAllProductsOpen, setIsAllProductsOpen] = useState(true);

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(cat => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Catégories</h3>
              
              {/* All Product Filter */}
              <div className="mb-6">
                <button 
                  onClick={() => setIsAllProductsOpen(!isAllProductsOpen)}
                  className="flex items-center gap-2 w-full p-3 hover:bg-gray-50 rounded-lg bg-gray-100 text-gray-900"
                >
                  <span className="text-sm">{isAllProductsOpen ? '▼' : '▶'}</span>
                  <span className="font-medium">Tous les produits</span>
                </button>
              </div>

              {/* Category Buttons */}
              {isAllProductsOpen && (
                <div className="space-y-3 mb-8">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => handleCategoryChange(category.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-full bg-white shadow-md hover:border-2 hover:border-[#1e293b] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${
                        selectedCategories.includes(category.name)
                          ? 'border-2 border-[#1e293b] bg-blue-50'
                          : ''
                      }`}
                    >
                      <span className="font-medium text-gray-800">{category.name}</span>
                      <span className="text-sm text-gray-500">({category.count})</span>
                    </button>
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      {renderStars(product.rating)}
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews} Reviews)
                      </span>
                    </div>
                    
                    <div className="text-lg font-bold text-gray-900 mb-4">{product.price}</div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 text-sm">
                        Add to Chart
                      </Button>
                      <Button className="flex-1 text-sm bg-gray-700 hover:bg-gray-800">
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2 mt-12">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <div className="flex space-x-1">
                <Button variant="outline" size="sm" className="bg-gray-100">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <span className="px-3 py-1 text-gray-500">...</span>
                <Button variant="outline" size="sm">8</Button>
                <Button variant="outline" size="sm">9</Button>
                <Button variant="outline" size="sm">10</Button>
              </div>
              
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
