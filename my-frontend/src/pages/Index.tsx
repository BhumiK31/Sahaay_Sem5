import { useState } from 'react';
import { Heart, Users, Shield, Star, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesGrid from '@/components/ServicesGrid';
import HowItWorks from '@/components/HowItWorks';
import TrustSafety from '@/components/TrustSafety';
import WhySahaay from '@/components/WhySahaay';
import Testimonials from '@/components/Testimonials';
import CTABanner from '@/components/CTABanner';
import FAQs from '@/components/FAQs';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ServiceModal from '@/components/ServiceModal';
import { Service } from '@/types/service';

const Index = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        
        <section id="services" className="py-20">
          <ServicesGrid onServiceClick={handleServiceClick} />
        </section>
        
        <HowItWorks />
        <TrustSafety />
        <WhySahaay />
        <Testimonials />
        <CTABanner />
        
        <section id="faqs" className="py-20">
          <FAQs />
        </section>
        
        <section id="contact" className="py-20">
          <Contact />
        </section>
      </main>
      
      <Footer />
      
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Index;