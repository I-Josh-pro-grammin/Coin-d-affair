import { Navbar } from "@/components/layout/Navbar";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestAdsSection } from "@/components/home/LatestAdsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CategoryNav />
      <main>
        <HeroSection />
        <LatestAdsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
