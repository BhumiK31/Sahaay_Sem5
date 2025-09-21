import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Baby, Users2, Heart, Dog, GraduationCap, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Service } from '@/types/service';

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

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

const ServiceModal = ({ service, onClose }: ServiceModalProps) => {
  const navigate = useNavigate();

  const IconComponent = getIcon(service.icon);

  const handleNeedCare = () => {
    onClose();
    navigate('/login?type=family');
  };

  const handleWantToHelp = () => {
    onClose();
    navigate('/login?type=student');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);


  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-poppins font-bold text-foreground">
                {service.title}
              </h2>
              <div className="text-xs font-medium text-accent-coral bg-accent-coral/10 px-2 py-1 rounded-full inline-block">
                {service.label}
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <p className="text-lg text-muted-foreground mb-4">
                {service.detailedDescription}
              </p>
            </div>

            <div>
              <h4 className="font-poppins font-semibold text-foreground mb-3">
                Common tasks include:
              </h4>
              <ul className="space-y-2">
                {service.commonTasks.map((task, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={handleNeedCare}
                className="flex-1 btn-hero rounded-2xl"
              >
                I need care
              </Button>
              <Button 
                onClick={handleWantToHelp}
                variant="outline"
                className="flex-1 rounded-2xl border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                I want to help
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;