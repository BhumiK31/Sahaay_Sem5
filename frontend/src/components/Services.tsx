import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ServiceModal from './ServiceModal';
import {
  Baby,
  Heart,
  HandHeart,
  PawPrint,
  GraduationCap,
  ShoppingBag,
} from 'lucide-react';

const Services = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    {
      category: 'Child Care',
      title: 'Babysitting & After-School Help',
      description:
        'Safe, nurturing care for your little ones when you need it most.',
      tags: ['Background Checked', 'Flexible Hours', 'Activity Planning'],
      lucideIcon: Baby,
      fullDescription:
        'Professional child care services with verified caregivers who love working with children.',
      tasks: [
        'Babysitting for date nights',
        'After-school pickup & care',
        'Homework assistance',
        'Meal preparation',
        'Creative activities & games',
        'Light housekeeping',
        'Emergency backup care',
        'Weekend childcare',
      ],
    },
    {
      category: 'Senior Care',
      title: 'Companionship & Daily Support',
      description:
        'Compassionate care and companionship for elderly family members.',
      tags: ['Trained Caregivers', 'Medical Awareness', 'Social Activities'],
      lucideIcon: Heart,
      fullDescription:
        'Dedicated support for seniors, focusing on companionship, daily assistance, and maintaining independence.',
      tasks: [
        'Daily companionship',
        'Medication reminders',
        'Light meal preparation',
        'Transportation to appointments',
        'Help with daily activities',
        'Social engagement',
        'Safety monitoring',
        'Family updates',
      ],
    },
    {
      category: 'Adult Support',
      title: 'Assistance for Differently-Abled Adults',
      description:
        'Respectful, personalized support for adults with special needs.',
      tags: ['Specialized Training', 'Person-Centered', 'Flexible Support'],
      lucideIcon: HandHeart,
      fullDescription:
        'Professional support services tailored to individual needs, promoting independence and dignity.',
      tasks: [
        'Personal care assistance',
        'Daily living support',
        'Community integration',
        'Transportation services',
        'Skill development support',
        'Social activities',
        'Respite care for families',
        'Goal-oriented assistance',
      ],
    },
    {
      category: 'Pet Care',
      title: 'Walking, Feeding & Vet Visits',
      description:
        "Loving care for your furry family members while you're away.",
      tags: ['Pet Lovers', 'Reliable Schedule', 'Emergency Available'],
      lucideIcon: PawPrint,
      fullDescription:
        'Comprehensive pet care services from animal lovers who treat your pets like family.',
      tasks: [
        'Daily dog walks',
        'Pet feeding & care',
        'Vet appointment transport',
        'Pet sitting at home',
        'Overnight pet care',
        'Exercise & playtime',
        'Basic grooming',
        'Emergency pet care',
      ],
    },
    {
      category: 'Tutoring',
      title: 'Academic Support & Skills',
      description:
        'Expert tutoring in school subjects and life skills development.',
      tags: ['Qualified Tutors', 'All Subjects', 'Exam Prep'],
      lucideIcon: GraduationCap,
      fullDescription:
        'Educational support from qualified tutors and skilled professionals for all ages and subjects.',
      tasks: [
        'Math & science tutoring',
        'Language arts support',
        'Exam preparation',
        'Homework assistance',
        'Computer skills training',
        'Music lessons',
        'Art & creative skills',
        'Study skills development',
      ],
    },
    {
      category: 'Errand Support',
      title: 'Groceries, Medicine & Quick Tasks',
      description: 'Reliable help with daily errands and essential tasks.',
      tags: ['Same Day', 'Trusted Delivery', 'Multiple Tasks'],
      lucideIcon: ShoppingBag,
      fullDescription:
        'Convenient errand services to help you manage your busy life with reliable, trustworthy assistance.',
      tasks: [
        'Grocery shopping',
        'Prescription pickup',
        'Post office visits',
        'Banking errands',
        'Dry cleaning pickup',
        'Home maintenance calls',
        'Document delivery',
        'Quick household tasks',
      ],
    },
  ];

  const openModal = (service: any) => {
    setSelectedService({
      title: service.title,
      description: service.fullDescription,
      tasks: service.tasks,
      lucideIcon: service.lucideIcon,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      <section id="services" className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-poppins font-semibold text-foreground mb-3">
              How can we help you today?
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Choose from our range of trusted services. All our helpers are verified and ready to assist you.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col justify-between h-full rounded-2xl border border-[#4e96df]/40 bg-white p-5 
                hover:border-[#4e96df] hover:shadow-[0_0_25px_rgba(78,150,223,0.45)] hover:scale-[1.04]
                transition-all duration-300 ease-out"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl border border-[#4e96df]/20 bg-[#f3f8ff]">
                      <service.lucideIcon className="w-4 h-4 text-[#4e96df]" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] text-[#4e96df] bg-[#f3f8ff] border-[#4e96df]/30"
                    >
                      {service.category}
                    </Badge>
                  </div>

                  <h3 className="text-base font-poppins font-semibold text-foreground mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="text-[10px] text-[#4e96df] border-[#4e96df]/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    onClick={() => openModal(service)}
                    className="w-full text-white bg-[#4e96df] hover:bg-[#3b7ec2] transition-all duration-300 text-xs py-1.5"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default Services;
