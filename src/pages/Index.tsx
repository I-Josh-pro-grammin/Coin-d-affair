import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
<<<<<<< HEAD
import { ProductListingSection } from "@/components/home/ProductListingSection";
import { RecommendationsSection } from "@/components/home/RecommendationsSection";
=======
import { LatestAdsSection } from "@/components/home/LatestAdsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
>>>>>>> 585f3f395cee00a1c13f7bcbf0bffdc1b2d99803
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
<<<<<<< HEAD
        <ProductListingSection />
        <RecommendationsSection />
=======
        <LatestAdsSection />
        <NewsletterSection />
>>>>>>> 585f3f395cee00a1c13f7bcbf0bffdc1b2d99803
      </main>
      <Footer />
    </div>
  );
};

export default Index;
