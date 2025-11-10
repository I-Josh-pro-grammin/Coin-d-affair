import { useState, useEffect } from "react";
import { Home, Music, Smartphone, HardDrive, ChevronDown, Star, Tag, ChevronLeft, ChevronRight, Heart } from "lucide-react";
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAllProductsOpen, setIsAllProductsOpen] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Category mapping between French display names and product category values
  const categoryMapping: { [key: string]: string } = {
    'Électronique': 'Other',
    'Maison & Jardin': 'Home',
    'Véhicules': 'Other',
    'Mode & Beauté': 'Other',
    'Sports & Loisirs': 'Other',
    'Livres & Médias': 'Other',
    'Jouets & Enfants': 'Other',
    'Services': 'Other'
  };

  // Filter products when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      const mappedCategory = categoryMapping[selectedCategory] || selectedCategory;
      setFilteredProducts(products.filter(product => 
        product.category.toLowerCase() === mappedCategory.toLowerCase()
      ));
    }
  }, [selectedCategory]);


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
                  onClick={() => {
                    setIsAllProductsOpen(!isAllProductsOpen);
                    setSelectedCategory('all');
                  }}
                  className="flex items-center gap-2 w-full p-3 hover:bg-gray-50 rounded-lg bg-gray-100 text-gray-900 transition-all duration-300"
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
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-full bg-white shadow-md transition-all duration-300 ${
                        selectedCategory === category.name
                          ? 'border-2 border-[#000435] bg-blue-50'
                          : 'hover:border-2 hover:border-[#000435] hover:shadow-lg hover:-translate-y-0.5'
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
{filteredProducts.map((product) => (
<div key={product.id} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#000435]">
                  
                  {/* Image Container */}
<div className="relative aspect-square overflow-hidden rounded-t-2xl">
                    {/* Product Image */}
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Category Badge - Top Right */}
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                      {product.category}
                    </span>
                    
                    {/* Wishlist Heart Icon - Top Left */}
                    <button className="absolute top-3 left-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                      <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    
                    {/* Product Title */}
<h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#000435] transition-colors">
                      {product.name}
                    </h3>
                    
                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                    
                    {/* Price */}
                    <div className="mb-4">
<p className="text-2xl font-bold text-[#000435]">{product.price}</p>
                    </div>
                    
                    {/* Buttons */}
                    <div className="flex flex-col gap-2">
                      {/* Add to Cart - Ghost/Outline Button */}
<Button className="w-full py-2.5 px-4 border-2 border-[#000435] text-[#000435] font-medium rounded-full hover:bg-[#000435]/5 transition-all duration-300 bg-transparent">
                        Ajouter au panier
                      </Button>
                      
                      {/* Buy Now - Solid Button */}
<Button className="w-full py-2.5 px-4 bg-[#000435] text-white font-medium rounded-full hover:bg-[#000435]/90 transition-all duration-300">
                        Acheter maintenant
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Show message if no products found */}
              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">Aucun produit trouvé dans cette catégorie.</p>
                </div>
              )}
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
