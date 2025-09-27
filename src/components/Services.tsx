import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ServiceModal from './ServiceModal';
import { Baby, Heart, HandHeart, PawPrint, GraduationCap, ShoppingBag } from 'lucide-react';
const Services = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const services = [{
    category: 'Child Care',
    title: 'Babysitting & After-School Help',
    description: 'Safe, nurturing care for your little ones when you need it most.',
    tags: ['Background Checked', 'Flexible Hours', 'Activity Planning'],
    lucideIcon: Baby,
    fullDescription: 'Professional child care services with verified caregivers who love working with children.',
    tasks: ['Babysitting for date nights', 'After-school pickup & care', 'Homework assistance', 'Meal preparation', 'Creative activities & games', 'Light housekeeping', 'Emergency backup care', 'Weekend childcare']
  }, {
    category: 'Senior Care',
    title: 'Companionship & Daily Support',
    description: 'Compassionate care and companionship for elderly family members.',
    tags: ['Trained Caregivers', 'Medical Awareness', 'Social Activities'],
    lucideIcon: Heart,
    fullDescription: 'Dedicated support for seniors, focusing on companionship, daily assistance, and maintaining independence.',
    tasks: ['Daily companionship', 'Medication reminders', 'Light meal preparation', 'Transportation to appointments', 'Help with daily activities', 'Social engagement', 'Safety monitoring', 'Family updates']
  }, {
    category: 'Adult Support',
    title: 'Assistance for Differently-Abled Adults',
    description: 'Respectful, personalized support for adults with special needs.',
    tags: ['Specialized Training', 'Person-Centered', 'Flexible Support'],
    lucideIcon: HandHeart,
    fullDescription: 'Professional support services tailored to individual needs, promoting independence and dignity.',
    tasks: ['Personal care assistance', 'Daily living support', 'Community integration', 'Transportation services', 'Skill development support', 'Social activities', 'Respite care for families', 'Goal-oriented assistance']
  }, {
    category: 'Pet Care',
    title: 'Walking, Feeding & Vet Visits',
    description: 'Loving care for your furry family members while you\'re away.',
    tags: ['Pet Lovers', 'Reliable Schedule', 'Emergency Available'],
    lucideIcon: PawPrint,
    fullDescription: 'Comprehensive pet care services from animal lovers who treat your pets like family.',
    tasks: ['Daily dog walks', 'Pet feeding & care', 'Vet appointment transport', 'Pet sitting at home', 'Overnight pet care', 'Exercise & playtime', 'Basic grooming', 'Emergency pet care']
  }, {
    category: 'Tutoring',
    title: 'Academic Support & Skills',
    description: 'Expert tutoring in school subjects and life skills development.',
    tags: ['Qualified Tutors', 'All Subjects', 'Exam Prep'],
    lucideIcon: GraduationCap,
    fullDescription: 'Educational support from qualified tutors and skilled professionals for all ages and subjects.',
    tasks: ['Math & science tutoring', 'Language arts support', 'Exam preparation', 'Homework assistance', 'Computer skills training', 'Music lessons', 'Art & creative skills', 'Study skills development']
  }, {
    category: 'Errand Support',
    title: 'Groceries, Medicine & Quick Tasks',
    description: 'Reliable help with daily errands and essential tasks.',
    tags: ['Same Day', 'Trusted Delivery', 'Multiple Tasks'],
    lucideIcon: ShoppingBag,
    fullDescription: 'Convenient errand services to help you manage your busy life with reliable, trustworthy assistance.',
    tasks: ['Grocery shopping', 'Prescription pickup', 'Post office visits', 'Banking errands', 'Dry cleaning pickup', 'Home maintenance calls', 'Document delivery', 'Quick household tasks']
  }];
  const openModal = (service: any) => {
    setSelectedService({
      title: service.title,
      description: service.fullDescription,
      tasks: service.tasks,
      lucideIcon: service.lucideIcon
    });
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };
  return <>
      <section id="services" className="section-padding bg-background">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-foreground mb-6">How can we help you today?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Choose from our range of trusted services. All our helpers are verified and ready to assist you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => <div key={index} className="service-card group">
                <div className="flex flex-col h-full">
                  {/* Icon & Category */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-[hsl(var(--service-category-bg))] border border-[hsl(var(--service-category))]/20">
                      <service.lucideIcon className="w-6 h-6 text-[hsl(var(--service-category))]" />
                    </div>
                    <Badge variant="outline" className="text-xs text-[hsl(var(--service-category))] bg-[hsl(var(--service-category-bg))] border-[hsl(var(--service-category))]/30 hover:bg-[hsl(var(--service-category-bg))] bg-[#fff0ef]">
                      {service.category}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-poppins font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, tagIndex) => <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>)}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6">
                    <Button onClick={() => openModal(service)} className="w-full btn-secondary group-hover:btn-hero transition-all duration-300">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      <ServiceModal service={selectedService} isOpen={isModalOpen} onClose={closeModal} />
    </>;
};
export default Services;