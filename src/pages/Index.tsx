import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductListingSection } from "@/components/home/ProductListingSection";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <ProductListingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
