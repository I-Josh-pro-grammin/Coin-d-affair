import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  return (
    <section className="relative h-[500px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Large "shop" Text */}
        <h1 className="text-[120px] md:text-[200px] font-bold text-white/90 leading-none mb-4">
          shop
        </h1>

        {/* Tagline */}
        <p className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 bg-white px-6 py-2 rounded-lg">
          Trouvez Tout Ce Dont Vous Avez Besoin
        </p>

        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg max-w-md w-full">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher sur CoinD'affaires"
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
          />
          <Button size="sm" className="rounded-full bg-gray-900 hover:bg-gray-800">
            Search
          </Button>
        </div>
      </div>
    </section>
  );
}