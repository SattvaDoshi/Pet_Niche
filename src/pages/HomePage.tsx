import { Header } from "@/components/Header/Header";
import { HeroSection } from "@/components/Hero/HeroSection";
import { FeaturedProducts } from "@/components/Products/FeaturedProducts";
import { TrendingProducts } from "@/components/Products/TrendingProducts";
import { Footer } from "@/components/Footer/Footer";
import { NewsletterSignup } from "@/components/Footer/NewsletterSignup";

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <TrendingProducts />
      </main>
      <div className="border-b border-white/10">
        <NewsletterSignup />
      </div>
      <Footer />
    </div>
  );
};