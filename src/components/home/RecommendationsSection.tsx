import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const recommendations = [
  {
    id: 1,
    name: "TWS Bujug",
    category: "Other",
    rating: 5.0,
    reviews: "1.2k",
    price: "$29.90",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    name: "Headsound Baptis",
    category: "Music",
    rating: 5.0,
    reviews: "1.2k",
    price: "$12.00",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    name: "Adudu Cleaner",
    category: "Music",
    rating: 4.4,
    reviews: "1k",
    price: "$29.90",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  }
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

export function RecommendationsSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Explore our recommendations</h2>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="w-8 h-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((product) => (
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
      </div>
    </section>
  );
}
