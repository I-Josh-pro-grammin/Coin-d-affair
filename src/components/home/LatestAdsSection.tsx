import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Star, ShoppingCart, Heart } from "lucide-react";
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentAds.map((ad) => (
<div key={ad.id} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#000435]">
              
              {/* Image Container */}
<div className="relative aspect-square overflow-hidden rounded-t-2xl">
                {/* Product Image */}
                <Link to={`/annonce/${ad.id}`}>
                  <img 
                    src={ad.image} 
                    alt={ad.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge - Top Right */}
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                  {ad.category}
                </span>
                
                {/* Wishlist Heart Icon - Top Left */}
                <button className="absolute top-3 left-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              {/* Card Content */}
              <div className="p-5">
                
                {/* Product Title */}
                <Link to={`/annonce/${ad.id}`}>
<h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#000435] transition-colors">
                    {ad.title}
                  </h3>
                </Link>
                
                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{ad.rating}</span>
                  <span className="text-sm text-gray-500">({ad.reviews})</span>
                </div>
                
                {/* Price */}
                <div className="mb-4">
<p className="text-2xl font-bold text-[#000435]">
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
                className={currentPage === i ? "bg-[#000435] hover:bg-[#000435]/90" : ""}
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