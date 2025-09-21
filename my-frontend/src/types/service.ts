export interface Service {
  id: string;
  title: string;
  label: string;
  description: string;
  icon: string;
  tags: string[];
  detailedDescription: string;
  commonTasks: string[];
}

export interface FormData {
  location: string;
  datetime: string;
  duration: string;
  notes: string;
  contactName: string;
  contactPhone: string;
  agreeToTerms: boolean;
}

export interface HelperFormData {
  name: string;
  phone: string;
  email: string;
  location: string;
  services: string[];
  availability: string;
  agreeToVerification: boolean;
}