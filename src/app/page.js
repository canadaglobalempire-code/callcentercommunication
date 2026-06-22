import Hero from '@/components/sections/Hero';
import LogoCarousel from '@/components/sections/LogoCarousel';
import WhoWeAre from '@/components/sections/WhoWeAre';
import HowItWorks from '@/components/sections/HowItWorks';
import ServicesGrid from '@/components/sections/ServicesGrid';
import WhyOutsource from '@/components/sections/WhyOutsource';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import PopularLocations from '@/components/sections/PopularLocations';
import IndustriesGrid from '@/components/sections/IndustriesGrid';
import Testimonials from '@/components/sections/Testimonials';
import Resources from '@/components/sections/Resources';
import ContactForm from '@/components/sections/ContactForm';
import FAQ from '@/components/sections/FAQ';
import BlogPreview from '@/components/sections/BlogPreview';

export default function Home() {
  return (
    <>
      <Hero />
      <LogoCarousel />
      <WhoWeAre />
      <HowItWorks />
      <ServicesGrid />
      <WhyOutsource />
      <WhyChooseUs />
      <PopularLocations />
      <IndustriesGrid />
      <Testimonials />
      <Resources />
      <ContactForm />
      <FAQ />
      <BlogPreview />
    </>
  );
}
