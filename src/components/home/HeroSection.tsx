import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useGetBusinessesQuery } from '@/redux/api/apiSlice'
import card1 from "@/assets/card1.jpg";
import card2 from "@/assets/card2.jpg";
import card3 from "@/assets/card3.jpg";
import card5 from "@/assets/card5.jpg";
import card6 from "@/assets/card6.jpg";

interface HeroCard {
  id: number;
  image?: string;
  title: string;
  subtitle?: string;
  position: 'bottom' | 'center';
  bgColor?: string;
  textColor?: string;
}

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  // const {cusotomerNumber}=useGetUsers();

  const {data: businesses} = useGetBusinessesQuery();

  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };


  const heroCards: HeroCard[] = [
    {
      id: 1,
      image: card1,
      title: "Découvrez nos",
      subtitle: "meilleures offres",
      position: 'bottom',
    },
    {
      id: 2,
      image: card2,
      title: `${businesses?.businesses} +`,
      subtitle: "Vendeurs de confiance",
      position: 'bottom',
    },
    {
      id: 3,
      image: card3,
      title: "Rejoignez 1000+",
      subtitle: "acheteurs satisfaits",
      position: 'center',
    },
    {
      id: 4,
      title: "85%",
      subtitle: "de satisfaction client depuis 2020",
      position: 'center',
      bgColor: 'bg-[#000435]',
      textColor: 'text-white',
    },
    {
      id: 5,
      image: card5,
      title: "Inspirez-vous",
      subtitle: "de nos collections",
      position: 'bottom',
    },
    {
      id: 6,
      image: card6,
      title: "Offrez le plaisir",
      subtitle: "du shopping",
      position: 'bottom',
    },
  ];



  return (
    <section className="relative bg-gray-50 -mt-24 pt-32 pb-8 md:pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 font-poppins">
            Trouvez les meilleures affaires - Achetez malin
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-6">
            Votre plateforme vous offre des produits de qualité à prix imbattables. 
            Ensemble, nous rendons le shopping accessible à tous.
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-lg md:max-w-xl mx-auto mb-6 md:mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Rechercher des produits, catégories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-4 h-12 md:h-14 text-sm md:text-base rounded-full border-gray-300 focus:ring-2 focus:ring-[#000435] focus:border-transparent"
                aria-label="Rechercher sur Coin D'Affaires"
              />
              <Button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-4 md:px-6 text-sm"
              >
                Rechercher
              </Button>
            </div>
          </form>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-3 md:gap-4 h-auto md:h-[350px] lg:h-[420px] xl:h-[480px]">
          {/* Column 1 - Left Side (2 stacked cards) */}
          <div className="md:col-start-1 md:row-start-1 md:row-span-1">
            {/* Card 1 */}
            <div className="rounded-xl md:rounded-2xl overflow-hidden relative group cursor-pointer h-48 md:h-full">
              <img
                src={heroCards[0].image}
                alt={heroCards[0].title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                <h3 className="font-bold text-base md:text-lg">{heroCards[0].title}</h3>
                <p className="text-xs md:text-sm">{heroCards[0].subtitle}</p>
              </div>
            </div>
          </div>

          <div className="md:col-start-1 md:row-start-2 md:row-span-1">
            {/* Card 4 - Stats Card */}
            <div className={`rounded-xl md:rounded-2xl overflow-hidden relative group cursor-pointer h-48 md:h-full ${heroCards[3].bgColor} flex items-center justify-center p-4 md:p-6`}>
              <div className="text-center text-white">
                <h3 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-1 md:mb-2">{heroCards[3].title}</h3>
                <p className="text-xs md:text-sm">{heroCards[3].subtitle}</p>
              </div>
            </div>
          </div>

          {/* Column 2 - Center Tall Card (spans 2 rows) */}
          <div className="md:col-start-2 md:row-start-1 md:row-span-2">
            <div className="rounded-xl md:rounded-2xl overflow-hidden relative group cursor-pointer h-64 md:h-full">
              <img
                src={heroCards[1].image}
                alt={heroCards[1].title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 lg:p-6 text-white">
                <h3 className="font-bold text-xl md:text-2xl lg:text-3xl">{heroCards[1].title}</h3>
                <p className="text-sm md:text-base">{heroCards[1].subtitle}</p>
              </div>
            </div>
          </div>

          {/* Column 3 - Right Side (3 stacked cards using flex) */}
          <div className="md:col-start-3 md:row-start-1 md:row-span-2 flex flex-col gap-3 md:gap-4">
            {/* Card 3 */}
            <div className="rounded-xl md:rounded-2xl overflow-hidden relative group cursor-pointer h-48 md:flex-1">
              <img
                src={heroCards[2].image}
                alt={heroCards[2].title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white text-center p-3 md:p-4">
                <div>
                  <h3 className="font-bold text-base md:text-lg">{heroCards[2].title}</h3>
                  <p className="text-xs md:text-sm mt-1">{heroCards[2].subtitle}</p>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="rounded-xl md:rounded-2xl overflow-hidden relative group cursor-pointer h-48 md:flex-1">
              <img
                src={heroCards[4].image}
                alt={heroCards[4].title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                <h3 className="font-bold text-sm md:text-base">{heroCards[4].title}</h3>
                <p className="text-xs">{heroCards[4].subtitle}</p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="rounded-xl md:rounded-2xl overflow-hidden relative group cursor-pointer h-48 md:flex-1">
              <img
                src={heroCards[5].image}
                alt={heroCards[5].title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                <h3 className="font-bold text-sm md:text-base">{heroCards[5].title}</h3>
                <p className="text-xs">{heroCards[5].subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
