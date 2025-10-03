import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import HowItWorks from '@/components/HowItWorks';
import TrustSafety from '@/components/TrustSafety';
import WhySahaay from '@/components/WhySahaay';
import Testimonials from '@/components/Testimonials';
import CTABanner from '@/components/CTABanner';
import FAQs from '@/components/FAQs';
import Contact from '@/components/Contact';
import HelperSignup from '@/components/HelperSignup';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <TrustSafety />
        <WhySahaay />
        <Testimonials />
        <CTABanner />
        <FAQs />
        <Contact />
        <HelperSignup />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
