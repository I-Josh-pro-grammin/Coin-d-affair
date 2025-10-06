import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductListingSection } from "@/components/home/ProductListingSection";
import { RecommendationsSection } from "@/components/home/RecommendationsSection";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <ProductListingSection />
        <RecommendationsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
