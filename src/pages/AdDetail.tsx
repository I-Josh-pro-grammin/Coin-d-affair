import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Flag, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Calendar,
  Eye,
  ChevronLeft,
  ChevronRight,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AdDetail = () => {
  const { adId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock ad data
  const ad = {
    id: adId,
    title: "BMW Série 3 320d - Excellent état",
    price: "18 500€",
    description: `Vends ma BMW Série 3 320d de 2018 en excellent état. 
    
Véhicule très bien entretenu, révisions à jour, aucun accident. Intérieur cuir beige impeccable, toutes options (GPS, climatisation automatique, sièges chauffants, etc.).

Contrôle technique OK, carte grise à jour. Véhicule visible sur rendez-vous.

N'hésitez pas à me contacter pour plus d'informations ou pour organiser un essai.`,
    images: [
      "/api/placeholder/800/600?car=1",
      "/api/placeholder/800/600?car=2", 
      "/api/placeholder/800/600?car=3",
      "/api/placeholder/800/600?car=4",
      "/api/placeholder/800/600?car=5"
    ],
    category: "Véhicules",
    subcategory: "Voitures",
    location: "Paris 15ème (75015)",
    publishedDate: "Il y a 3 jours",
    views: 247,
    seller: {
      name: "Jean M.",
      rating: 4.8,
      reviewsCount: 23,
      memberSince: "2020",
      isVerified: true
    },
    specifications: {
      "Marque": "BMW",
      "Modèle": "Série 3",
      "Année": "2018",
      "Kilométrage": "85 000 km",
      "Carburant": "Diesel",
      "Boîte de vitesses": "Manuelle",
      "Puissance": "190 ch",
      "Couleur": "Gris métallisé",
      "Première main": "Non"
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % ad.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + ad.images.length) % ad.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Accueil</Link>
            <span className="text-gray-400">/</span>
            <Link to={`/categorie/${ad.category.toLowerCase()}`} className="text-gray-600 hover:text-blue-600">
              {ad.category}
            </Link>
            <span className="text-gray-400">/</span>
            <Link to={`/categorie/${ad.category.toLowerCase()}/${ad.subcategory.toLowerCase()}`} className="text-gray-600 hover:text-blue-600">
              {ad.subcategory}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-600">{ad.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="relative">
                <img
                  src={ad.images[currentImageIndex]}
                  alt={ad.title}
                  className="w-full h-96 object-cover"
                />
                
                {/* Image Navigation */}
                {ad.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {ad.images.length}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full transition-all ${
                      isFavorite 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white text-gray-600 hover:bg-red-50'
                    }`}
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-white text-gray-600 rounded-full hover:bg-gray-50 transition-all">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-white text-gray-600 rounded-full hover:bg-red-50 transition-all">
                    <Flag className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {ad.images.length > 1 && (
                <div className="p-4 border-t">
                  <div className="flex space-x-2 overflow-x-auto">
                    {ad.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index 
                            ? 'border-blue-500' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${ad.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Ad Details */}
            <div className="bg-white rounded-lg shadow-soft p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{ad.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {ad.publishedDate}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {ad.views} vues
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {ad.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{ad.price}</div>
                  <Badge variant="secondary">{ad.category}</Badge>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                  {ad.description}
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-lg shadow-soft p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Caractéristiques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(ad.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="font-medium text-gray-600">{key}</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacter le vendeur</h3>
              
              {/* Seller Info */}
              <div className="flex items-center mb-4 pb-4 border-b">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  {ad.seller.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">{ad.seller.name}</span>
                    {ad.seller.isVerified && (
                      <Badge variant="secondary" className="ml-2 text-xs">Vérifié</Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    {ad.seller.rating} ({ad.seller.reviewsCount} avis)
                  </div>
                  <div className="text-xs text-gray-500">
                    Membre depuis {ad.seller.memberSince}
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <Button className="w-full btn-primary">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Envoyer un message
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Afficher le numéro
                </Button>
              </div>

              {/* Safety Tips */}
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Conseils de sécurité</h4>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>• Rencontrez le vendeur en personne</li>
                  <li>• Vérifiez l'article avant l'achat</li>
                  <li>• Ne payez jamais à l'avance</li>
                </ul>
              </div>
            </div>

            {/* Similar Ads */}
            <div className="bg-white rounded-lg shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Annonces similaires</h3>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Link key={i} to={`/annonce/${i + 100}`} className="block group">
                    <div className="flex space-x-3">
                      <img
                        src={`/api/placeholder/60/60?similar=${i}`}
                        alt="Annonce similaire"
                        className="w-15 h-15 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                          BMW Série 5 - Bon état général
                        </h4>
                        <p className="text-sm font-bold text-blue-600">
                          {(15000 + i * 2000).toLocaleString()}€
                        </p>
                        <p className="text-xs text-gray-500">Paris {i + 16}ème</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdDetail;