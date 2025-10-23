import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  return (
    <section className="relative h-96 bg-cover bg-center bg-no-repeat -mt-24 pt-24" 
             style={{ 
               backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
               backgroundSize: "cover"
             }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Large "Shop" text overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-8xl font-bold text-white opacity-20 select-none">
          Shop
        </h1>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Give All You Need
          </h2>
          
          {/* Search Bar */}
          <div className="bg-white rounded-lg p-4 max-w-2xl mx-auto shadow-lg">
            <div className="flex items-center">
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <Input
                type="text"
                placeholder="Search on CoinD'Affaires"
                className="border-0 focus:ring-0 text-lg"
              />
              <Button className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}