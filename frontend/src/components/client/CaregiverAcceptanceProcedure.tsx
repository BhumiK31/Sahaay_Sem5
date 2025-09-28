import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { CheckCircle, Clock, AlertCircle, FileText, MessageSquare, Calendar, Shield, CreditCard, Users, Star, CheckSquare } from 'lucide-react';
import { HiringChecklist } from './HiringChecklist';

interface ProcedureStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending' | 'optional';
  icon: any;
  estimatedTime: string;
  actions: string[];
  requirements?: string[];
}

export function CaregiverAcceptanceProcedure() {
  const steps: ProcedureStep[] = [
    {
      id: 1,
      title: 'Application Review',
      description: 'Review the caregiver\'s application, resume, and initial information.',
      status: 'completed',
      icon: FileText,
      estimatedTime: '5-10 minutes',
      actions: [
        'Review application details',
        'Check experience and qualifications',
        'Verify service type match',
        'Review hourly rate expectations'
      ],
      requirements: [
        'Complete application submitted',
        'Resume attached',
        'Service preferences match your needs'
      ]
    },
    {
      id: 2,
      title: 'Background Check Verification',
      description: 'Verify the caregiver has completed required background checks and certifications.',
      status: 'completed',
      icon: Shield,
      estimatedTime: '2-3 minutes',
      actions: [
        'Verify background check status',
        'Check certification validity',
        'Review reference availability',
        'Confirm identity verification'
      ],
      requirements: [
        'Clean background check (if required)',
        'Valid certifications (CPR, First Aid)',
        'Government-issued ID verified'
      ]
    },
    {
      id: 3,
      title: 'Initial Communication',
      description: 'Send initial message to express interest and ask preliminary questions.',
      status: 'completed',
      icon: MessageSquare,
      estimatedTime: '10-15 minutes',
      actions: [
        'Send introductory message',
        'Ask specific questions about experience',
        'Discuss availability and schedule',
        'Share family preferences and needs'
      ]
    },
    {
      id: 4,
      title: 'Phone/Video Screening',
      description: 'Conduct a phone or video call for initial screening and assessment.',
      status: 'current',
      icon: Calendar,
      estimatedTime: '15-30 minutes',
      actions: [
        'Schedule screening call',
        'Prepare interview questions',
        'Assess communication skills',
        'Discuss experience in detail',
        'Explain job requirements'
      ],
      requirements: [
        'Caregiver availability for call',
        'Prepared list of questions',
        'Quiet environment for call'
      ]
    },
    {
      id: 5,
      title: 'In-Person Interview',
      description: 'Meet the caregiver in person to assess fit and compatibility.',
      status: 'pending',
      icon: Users,
      estimatedTime: '45-60 minutes',
      actions: [
        'Schedule in-person meeting',
        'Prepare comprehensive questions',
        'Tour your home/facility',
        'Meet family members/care recipient',
        'Observe interaction with children/elderly'
      ],
      requirements: [
        'Safe meeting location arranged',
        'All decision makers present',
        'Care recipient available to meet'
      ]
    },
    {
      id: 6,
      title: 'Reference Check',
      description: 'Contact provided references to verify experience and reliability.',
      status: 'pending',
      icon: Star,
      estimatedTime: '20-30 minutes',
      actions: [
        'Contact previous employers',
        'Verify employment dates',
        'Ask about performance and reliability',
        'Inquire about any concerns',
        'Document reference feedback'
      ],
      requirements: [
        'At least 2-3 professional references',
        'Recent references (within 2 years)',
        'Contactable reference information'
      ]
    },
    {
      id: 7,
      title: 'Trial Period Agreement',
      description: 'Arrange a paid trial period to assess working relationship.',
      status: 'pending',
      icon: Clock,
      estimatedTime: '1-2 weeks',
      actions: [
        'Agree on trial period length',
        'Set trial period expectations',
        'Establish communication protocols',
        'Create evaluation criteria',
        'Schedule check-in meetings'
      ],
      requirements: [
        'Written trial agreement',
        'Clear performance expectations',
        'Emergency contact procedures'
      ]
    },
    {
      id: 8,
      title: 'Contract & Payment Setup',
      description: 'Finalize employment terms, contracts, and payment arrangements.',
      status: 'pending',
      icon: CreditCard,
      estimatedTime: '30-45 minutes',
      actions: [
        'Review and sign employment contract',
        'Set up payment method',
        'Establish work schedule',
        'Define job responsibilities',
        'Set performance review schedule'
      ],
      requirements: [
        'Legal employment contract',
        'Tax documentation (W-4, I-9)',
        'Insurance coverage confirmed',
        'Payment method established'
      ]
    }
  ];

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'current':
        return 'text-blue-600 bg-blue-100';
      case 'pending':
        return 'text-gray-600 bg-gray-100';
      case 'optional':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'current':
        return Clock;
      case 'pending':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Caregiver Hiring Guide</CardTitle>
          <p className="text-sm text-gray-600">
            Follow our comprehensive guide to safely and thoroughly evaluate and hire the perfect caregiver for your family.
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="procedure" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="procedure" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Step-by-Step Process
              </TabsTrigger>
              <TabsTrigger value="checklist" className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4" />
                Progress Checklist
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="procedure" className="space-y-6 mt-6">
              <div className="space-y-6">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const StatusIcon = getStepIcon(step.status);
                  
                  return (
                    <div key={step.id} className="relative">
                      {/* Connector Line */}
                      {index < steps.length - 1 && (
                        <div className="absolute left-6 top-16 w-0.5 h-16 bg-gray-200"></div>
                      )}
                      
                      <div className="flex items-start space-x-4">
                        {/* Step Icon */}
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getStepColor(step.status)} relative z-10`}>
                          <StepIcon className="w-6 h-6" />
                          <div className="absolute -top-1 -right-1">
                            <StatusIcon className={`w-4 h-4 ${
                              step.status === 'completed' ? 'text-green-600' : 
                              step.status === 'current' ? 'text-blue-600' : 'text-gray-400'
                            }`} />
                          </div>
                        </div>
                        
                        {/* Step Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg">{step.title}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {step.estimatedTime}
                              </Badge>
                              <Badge className={getStepColor(step.status)}>
                                {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-4">{step.description}</p>
                          
                          {/* Actions */}
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm mb-2">Action Items:</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {step.actions.map((action, actionIndex) => (
                                  <li key={actionIndex} className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                    <span>{action}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Requirements */}
                            {step.requirements && (
                              <div>
                                <h4 className="text-sm mb-2">Requirements:</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {step.requirements.map((requirement, reqIndex) => (
                                    <li key={reqIndex} className="flex items-center space-x-2">
                                      <CheckCircle className="w-3 h-3 text-green-600" />
                                      <span>{requirement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-2">
                              {step.status === 'current' && (
                                <>
                                  <Button size="sm">
                                    Begin Step
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    Schedule
                                  </Button>
                                </>
                              )}
                              {step.status === 'pending' && (
                                <Button variant="outline" size="sm" disabled>
                                  Pending Previous Steps
                                </Button>
                              )}
                              {step.status === 'completed' && (
                                <Button variant="outline" size="sm">
                                  Review Completed
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {index < steps.length - 1 && <Separator className="mt-6" />}
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="checklist" className="mt-6">
              <HiringChecklist />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Important Safety Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="text-sm mb-2 text-yellow-800">Safety First</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Always verify identity and background checks before hiring</li>
              <li>• Meet in public places for initial interviews</li>
              <li>• Trust your instincts - if something feels wrong, investigate further</li>
              <li>• Keep detailed records of all communications and agreements</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="text-sm mb-2 text-blue-800">Legal Considerations</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Ensure proper tax documentation and employment laws are followed</li>
              <li>• Consider liability insurance for domestic employees</li>
              <li>• Understand worker classification (employee vs. contractor)</li>
              <li>• Keep records for tax and legal purposes</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="text-sm mb-2 text-green-800">Best Practices</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Establish clear expectations and boundaries from the start</li>
              <li>• Create written job descriptions and schedules</li>
              <li>• Plan regular check-ins and performance reviews</li>
              <li>• Maintain open communication throughout the relationship</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}