import { Navbar } from "@/components/layout/Navbar";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { HeroSection } from "@/components/home/HeroSection";
import { PromotionsSection } from "@/components/home/PromotionsSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { LatestAdsSection } from "@/components/home/LatestAdsSection";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CategoryNav />
      <main>
        <HeroSection />
        <PromotionsSection />
        <CategoriesSection />
        <LatestAdsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
