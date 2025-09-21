import { Baby, Users2, Heart, Dog, GraduationCap, ShoppingCart } from 'lucide-react';
import { Service } from '@/types/service';

const services: Service[] = [
  {
    id: 'childcare',
    title: 'Child Care',
    label: 'CHILDCARE',
    description: 'Babysitting, after-school help.',
    icon: 'Baby',
    tags: ['Babysitting', 'After-school', 'Activities'],
    detailedDescription: 'Professional and caring child care services for families who need trusted supervision and engagement for their children.',
    commonTasks: [
      'Babysitting during evenings and weekends',
      'After-school pickup and homework help',
      'Organizing activities and playtime',
      'Meal preparation for children'
    ]
  },
  {
    id: 'seniorcare',
    title: 'Senior Care',
    label: 'SENIOR CARE',
    description: 'Companionship, daily support.',
    icon: 'Heart',
    tags: ['Companionship', 'Daily tasks', 'Medical assistance'],
    detailedDescription: 'Compassionate care and companionship for seniors, helping them maintain independence and quality of life.',
    commonTasks: [
      'Daily companionship and conversation',
      'Assistance with daily activities',
      'Medication reminders',
      'Light housekeeping and organization'
    ]
  },
  {
    id: 'adultsupport',
    title: 'Adult Support',
    label: 'ADULT SUPPORT',
    description: 'Assist differently-abled adults.',
    icon: 'Users2',
    tags: ['Daily assistance', 'Mobility help', 'Personal care'],
    detailedDescription: 'Specialized support services for differently-abled adults to help them live more independently and comfortably.',
    commonTasks: [
      'Personal care assistance',
      'Mobility and transportation support',
      'Daily living activities',
      'Accompaniment to appointments'
    ]
  },
  {
    id: 'petcare',
    title: 'Pet Care',
    label: 'PET CARE',
    description: 'Walks, feeding, vet visits.',
    icon: 'Dog',
    tags: ['Dog walking', 'Pet sitting', 'Vet visits'],
    detailedDescription: 'Reliable and loving pet care services to keep your furry friends happy and healthy when you can\'t be there.',
    commonTasks: [
      'Daily dog walks and exercise',
      'Pet feeding and medication',
      'Pet sitting in your home',
      'Vet visits and grooming transport'
    ]
  },
  {
    id: 'tutoring',
    title: 'Tutoring',
    label: 'TUTORING',
    description: 'School subjects & skills.',
    icon: 'GraduationCap',
    tags: ['Academic support', 'Test prep', 'Skills training'],
    detailedDescription: 'Personalized tutoring and educational support to help students excel in their studies and develop new skills.',
    commonTasks: [
      'Subject-specific tutoring',
      'Homework help and study sessions',
      'Test and exam preparation',
      'Skill development workshops'
    ]
  },
  {
    id: 'errands',
    title: 'Errand Support',
    label: 'ERRANDS',
    description: 'Groceries, medicine pickup, quick tasks.',
    icon: 'ShoppingCart',
    tags: ['Shopping', 'Deliveries', 'Quick tasks'],
    detailedDescription: 'Convenient errand services to handle your daily tasks and shopping needs when you\'re busy or unable to do them yourself.',
    commonTasks: [
      'Grocery shopping and delivery',
      'Prescription pickup',
      'Post office and banking errands',
      'Quick household tasks'
    ]
  }
];

const getIcon = (iconName: string) => {
  const icons = {
    Baby,
    Heart,
    Users2,
    Dog,
    GraduationCap,
    ShoppingCart
  };
  return icons[iconName as keyof typeof icons] || Heart;
};

interface ServicesGridProps {
  onServiceClick: (service: Service) => void;
}

const ServicesGrid = ({ onServiceClick }: ServicesGridProps) => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-4">
          How can we help you today?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose from our range of trusted services. All our helpers are verified and ready to assist you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((service) => {
          const IconComponent = getIcon(service.icon);
          
          return (
            <div
              key={service.id}
              onClick={() => onServiceClick(service)}
              className="card-service group"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-accent-coral bg-accent-coral/10 px-2 py-1 rounded-full inline-block mb-2">
                    {service.label}
                  </div>
                  
                  <h3 className="text-xl font-poppins font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {service.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-background border border-border px-2 py-1 rounded-full text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full bg-primary/5 text-primary font-medium py-2 px-4 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesGrid;