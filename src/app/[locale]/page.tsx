import { Hero } from "@/components/home/Hero";
import { ProductCategories } from "@/components/home/ProductCategories";
import { FactoryStrength } from "@/components/home/FactoryStrength";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { GlobalExport } from "@/components/home/GlobalExport";
import { FactoryVideo } from "@/components/home/FactoryVideo";
import { CompanyIntroSection } from "@/components/CompanyIntroSection";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductCategories />
      <CompanyIntroSection />
      <FactoryStrength />
      <WhyChooseUs />
      <GlobalExport />
      <FactoryVideo />
      <ContactCTA />
    </>
  );
}
