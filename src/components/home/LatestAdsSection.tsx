import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Mock data for latest ads
const mockAds = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: [
    "Phone Holder Sakti",
    "Headsound",
    "Adudu Cleaner",
    "CCTV Maling",
    "Stuffus Peker 32",
    "Stuffus RT75",
    "iPhone 14 Pro Max",
    "MacBook Pro M2",
    "Vélo électrique"
  ][i % 9],
  price: (Math.floor(Math.random() * 500) + 9).toFixed(2),
  category: ["Other", "Music", "Home", "Other"][Math.floor(Math.random() * 4)],
  rating: (4.0 + Math.random()).toFixed(1),
  reviews: Math.floor(Math.random() * 50) + 10,
  image: `https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop&q=80&id=${i}`
}));

export function LatestAdsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9; // 3 columns × 3 rows
  const totalPages = Math.ceil(mockAds.length / itemsPerPage);

  const currentAds = mockAds.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Category
            </h2>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {currentAds.map((ad) => (
            <Card key={ad.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-gray-50">
              <div className="p-6">
                {/* Category Badge */}
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary" className="rounded-md">
                    {ad.category}
                  </Badge>
                </div>

                {/* Product Image */}
                <Link to={`/annonce/${ad.id}`}>
                  <div className="aspect-square overflow-hidden bg-white rounded-lg mb-4 flex items-center justify-center">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-3/4 h-3/4 object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <Link to={`/annonce/${ad.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {ad.title}
                  </h3>
                </Link>

                <div className="flex items-center gap-1 text-yellow-500 mb-3">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium text-gray-900">
                    {ad.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({ad.reviews} Reviews)
                  </span>
                </div>

                <p className="text-2xl font-bold text-gray-900 mb-4">
                  ${ad.price}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 rounded-full border-gray-300 hover:bg-gray-100"
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    className="flex-1 rounded-full bg-gray-900 hover:bg-gray-800"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevious}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <Button
                key={i}
                variant={currentPage === i ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage(i)}
                className={currentPage === i ? "bg-gray-900 hover:bg-gray-800" : ""}
              >
                {pageNum}
              </Button>
            );
          })}
          
          {totalPages > 5 && <span className="text-gray-400">...</span>}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}