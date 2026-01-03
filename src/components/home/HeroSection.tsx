import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useGetBusinessesQuery, useGetCustomersQuery, useGetListingsQuery } from '@/redux/api/apiSlice'
import { resolveImageSource, currencyFmt } from "@/lib/utils";
import card1 from "@/assets/card1.jpg";
import card2 from "@/assets/card2.jpg";
import card3 from "@/assets/card3.jpg";
import card5 from "@/assets/card5.jpg";
import card6 from "@/assets/card6.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface HeroCard {
  id: number;
  image?: string;
  title: string;
  subtitle?: string;
  position: 'bottom' | 'center';
  bgColor?: string;
  textColor?: string;
  link?: string;
}

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const { data: businesses } = useGetBusinessesQuery();
  const { data: customers } = useGetCustomersQuery();
  const navigate = useNavigate();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch results when debounced query changes
  const { data: searchResults, isFetching: isSearching } = useGetListingsQuery(
    // We fetch a decent number to ensure we have matches if the API doesn't filter perfectly, 
    // but ideally the API handles 'search' or 'q' param. 
    // We'll pass 'search' as it's common.
    { search: debouncedQuery, limit: 8 },
    { skip: !debouncedQuery || debouncedQuery.length < 1 }
  );

  // Filter client-side as a fallback if needed, or just use results
  const products = searchResults?.listings || [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowDropdown(false);
      navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleProductClick = (id: string | number) => {
    navigate(`/produit/${id}`);
    setShowDropdown(false);
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
      title: businesses != undefined ? `${businesses?.businesses} +` : '100+',
      subtitle: "Vendeurs de confiance",
      position: 'bottom',
    },
    {
      id: 3,
      image: card3,
      title: `Rejoignez ${customers != undefined ? customers?.customers : '1000'}+`,
      subtitle: "acheteurs satisfaits",
      position: 'center',
      link: '/auth/signup/seller',
    },
    {
      id: 4,
      title: "95%",
      subtitle: "de satisfaction client depuis 2020",
      position: 'center',
      bgColor: 'bg-[#000435]',
      textColor: 'text-white',
      link: '/auth/signup/customer',
    },
    {
      id: 5,
      image: card5,
      title: "Inspirez-vous",
      subtitle: "de nos collections",
      position: 'bottom',
      link: '/boutique',
    },
    {
      id: 6,
      image: card6,
      title: "Offrez le plaisir",
      subtitle: "du shopping",
      position: 'bottom',
      link: '/boutique',
    },
  ];

  return (
    <section className="relative bg-gray-50 md:w-full -mt-24 pt-32 pb-8 md:pb-12 overflow-hidden">
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
          <div ref={searchContainerRef} className="max-w-lg md:max-w-xl mx-auto mb-6 md:mb-8 relative z-50">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Rechercher des produits, catégories..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.trim().length > 0) setShowDropdown(true);
                  }}
                  onFocus={() => {
                    if (searchQuery.trim().length > 0) setShowDropdown(true);
                  }}
                  className="pl-11 pr-12 h-12 md:h-14 text-sm md:text-base rounded-full border-gray-300 focus:ring-2 focus:ring-[#000435] focus:border-transparent shadow-sm bg-white/90 backdrop-blur-sm"
                  aria-label="Rechercher sur Akaguriro"
                />

                {isSearching ? (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#000435] rounded-full p-2">
                    <Loader2 className="h-4 w-4 text-white animate-spin" />
                  </div>
                ) : (
                  <Button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-4 md:px-6 text-sm"
                  >
                    Rechercher
                  </Button>
                )}
              </div>
            </form>

            {/* Instant Search Dropdown */}
            {showDropdown && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-[#000435]" />
                    <p className="text-sm">Recherche en cours...</p>
                  </div>
                ) : products.length > 0 ? (
                  <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <div className="p-2 space-y-1">
                      {products.map((product: any) => (
                        <div
                          key={product.listings_id || product.id}
                          onClick={() => handleProductClick(product.listings_id || product.id)}
                          className="flex items-center gap-4 p-3 hover:bg-blue-50/80 rounded-xl cursor-pointer transition-all duration-200 group"
                        >
                          <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-100">
                            <img
                              src={resolveImageSource(product)}
                              alt={product.title}
                              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder.svg';
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-[#000435]">
                              {product.title || product.name}
                            </h4>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-xs text-gray-500 truncate">
                                {product.category_name || product.category || 'Catégorie'}
                              </p>
                              <span className="text-xs font-bold text-[#000435] bg-blue-100 px-2 py-0.5 rounded-full">
                                {currencyFmt(product.price)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-gray-50/50 border-t border-gray-100 text-center">
                      <button
                        onClick={(e) => handleSearch(e)}
                        className="text-sm text-[#000435] font-medium hover:underline"
                      >
                        Voir tous les résultats
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <p>Aucun résultat trouvé pour "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile View: Carousel Layout */}
        <div className="block md:hidden w-full">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {heroCards.map((card) => (
                <CarouselItem key={card.id} className="pl-4">
                  {card.link ? (
                    <Link to={card.link} className="block w-full h-full">
                      <div className={`rounded-xl overflow-hidden relative group cursor-pointer h-64 w-full ${card.bgColor || 'bg-gray-200'} flex items-center justify-center`}>
                        {card.image && (
                          <>
                            <img
                              src={card.image}
                              alt={card.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                          </>
                        )}

                        <div className={`absolute ${card.position === 'center' ? 'inset-0 flex items-center justify-center text-center' : 'bottom-0 left-0 right-0'} p-4 ${card.textColor || 'text-white'}`}>
                          <div>
                            <h3 className={`font-bold ${card.position === 'center' ? 'text-2xl' : 'text-lg'}`}>
                              {card.title}
                            </h3>
                            {card.subtitle && (
                              <p className={`mt-1 ${card.position === 'center' ? 'text-sm' : 'text-xs'}`}>
                                {card.subtitle}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className={`rounded-xl overflow-hidden relative group cursor-pointer h-64 w-full ${card.bgColor || 'bg-gray-200'} flex items-center justify-center`}>
                      {card.image && (
                        <>
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        </>
                      )}

                      <div className={`absolute ${card.position === 'center' ? 'inset-0 flex items-center justify-center text-center' : 'bottom-0 left-0 right-0'} p-4 ${card.textColor || 'text-white'}`}>
                        <div>
                          <h3 className={`font-bold ${card.position === 'center' ? 'text-2xl' : 'text-lg'}`}>
                            {card.title}
                          </h3>
                          {card.subtitle && (
                            <p className={`mt-1 ${card.position === 'center' ? 'text-sm' : 'text-xs'}`}>
                              {card.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Desktop View: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 md:grid-rows-2 gap-4 h-[350px] lg:h-[420px] xl:h-[480px]">
          {/* Column 1 - Left Side (2 stacked cards) */}
          <div className="col-start-1 row-start-1 row-span-1">
            {/* Card 1 */}
            <div className="rounded-2xl overflow-hidden relative group cursor-pointer h-full">
              <img
                src={heroCards[0].image}
                alt={heroCards[0].title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-bold text-lg">{heroCards[0].title}</h3>
                <p className="text-sm">{heroCards[0].subtitle}</p>
              </div>
            </div>
          </div>

          <div className="col-start-1 row-start-2 row-span-1">
            {/* Card 4 - Stats Card */}
            {heroCards[3].link ? (
              <Link to={heroCards[3].link} className="block w-full h-full">
                <div className={`rounded-2xl overflow-hidden relative group cursor-pointer h-full ${heroCards[3].bgColor} flex items-center justify-center p-6`}>
                  <div className="text-center text-white">
                    <h3 className="font-bold text-4xl lg:text-5xl mb-2">{heroCards[3].title}</h3>
                    <p className="text-sm">{heroCards[3].subtitle}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className={`rounded-2xl overflow-hidden relative group cursor-pointer h-full ${heroCards[3].bgColor} flex items-center justify-center p-6`}>
                <div className="text-center text-white">
                  <h3 className="font-bold text-4xl lg:text-5xl mb-2">{heroCards[3].title}</h3>
                  <p className="text-sm">{heroCards[3].subtitle}</p>
                </div>
              </div>
            )}

          </div>

          {/* Column 2 - Center Tall Card (spans 2 rows) */}
          <div className="col-start-2 row-start-1 row-span-2">
            {heroCards[1].link ? (
              <Link to={heroCards[1].link} className="block w-full h-full">
                <div className="rounded-2xl overflow-hidden relative group cursor-pointer h-full">
                  <img
                    src={heroCards[1].image}
                    alt={heroCards[1].title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 text-white">
                    <h3 className="font-bold text-2xl lg:text-3xl">{heroCards[1].title}</h3>
                    <p className="text-base">{heroCards[1].subtitle}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="rounded-2xl overflow-hidden relative group cursor-pointer h-full">
                <img
                  src={heroCards[1].image}
                  alt={heroCards[1].title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 text-white">
                  <h3 className="font-bold text-2xl lg:text-3xl">{heroCards[1].title}</h3>
                  <p className="text-base">{heroCards[1].subtitle}</p>
                </div>
              </div>
            )}

          </div>

          {/* Column 3 - Right Side (3 stacked cards using flex) */}
          <div className="col-start-3 row-start-1 row-span-2 flex flex-col gap-4 min-h-0">
            {/* Card 3 */}
            {heroCards[2].link ? (
              <Link to={heroCards[2].link} className="block flex-1 w-full min-h-0">
                <div className="rounded-2xl overflow-hidden relative group cursor-pointer h-full">
                  <img
                    src={heroCards[2].image}
                    alt={heroCards[2].title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
                    <div>
                      <h3 className="font-bold text-lg">{heroCards[2].title}</h3>
                      <p className="text-sm mt-1">{heroCards[2].subtitle}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="rounded-2xl overflow-hidden relative group cursor-pointer flex-1 min-h-0">
                <img
                  src={heroCards[2].image}
                  alt={heroCards[2].title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
                  <div>
                    <h3 className="font-bold text-lg">{heroCards[2].title}</h3>
                    <p className="text-sm mt-1">{heroCards[2].subtitle}</p>
                  </div>
                </div>
              </div>
            )}


            {/* Card 5 */}
            {heroCards[4].link ? (
              <Link to={heroCards[4].link} className="block flex-1 w-full min-h-0">
                <div className="rounded-2xl overflow-hidden relative group cursor-pointer h-full">
                  <img
                    src={heroCards[4].image}
                    alt={heroCards[4].title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-base">{heroCards[4].title}</h3>
                    <p className="text-xs">{heroCards[4].subtitle}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="rounded-2xl overflow-hidden relative group cursor-pointer flex-1 min-h-0">
                <img
                  src={heroCards[4].image}
                  alt={heroCards[4].title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-base">{heroCards[4].title}</h3>
                  <p className="text-xs">{heroCards[4].subtitle}</p>
                </div>
              </div>
            )}


            {/* Card 6 */}
            {heroCards[5].link ? (
              <Link to={heroCards[5].link} className="block flex-1 w-full min-h-0">
                <div className="rounded-2xl overflow-hidden relative group cursor-pointer h-full">
                  <img
                    src={heroCards[5].image}
                    alt={heroCards[5].title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-base">{heroCards[5].title}</h3>
                    <p className="text-xs">{heroCards[5].subtitle}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="rounded-2xl overflow-hidden relative group cursor-pointer flex-1 min-h-0">
                <img
                  src={heroCards[5].image}
                  alt={heroCards[5].title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-base">{heroCards[5].title}</h3>
                  <p className="text-xs">{heroCards[5].subtitle}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
