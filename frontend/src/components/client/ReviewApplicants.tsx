import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Star, MapPin, Calendar, MessageSquare, Check, X, Clock, FileText } from 'lucide-react';

export function ReviewApplicants() {
  const applicants = [
    {
      id: 1,
      name: 'Sarah Anderson',
      jobTitle: 'Part-time Babysitter for 2 Kids',
      appliedDate: '2024-01-20',
      status: 'new',
      rating: 4.9,
      reviews: 27,
      experience: '5+ years',
      location: 'Brooklyn, NY',
      hourlyRate: '$20-22',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b372?w=60&h=60&fit=crop&crop=face',
      coverLetter: 'I would love to help care for your children. I have extensive experience with school-age kids and can help with homework and activities.',
      availability: 'Available Mon, Wed, Fri',
      specialties: ['Childcare', 'CPR Certified', 'Homework Help'],
      backgroundCheck: true,
      references: 3,
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      jobTitle: 'Part-time Babysitter for 2 Kids',
      appliedDate: '2024-01-19',
      status: 'interviewing',
      rating: 5.0,
      reviews: 43,
      experience: '8+ years',
      location: 'Manhattan, NY',
      hourlyRate: '$22-25',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
      coverLetter: 'As a bilingual childcare professional, I can provide excellent care for your family. I\'m patient, reliable, and love working with children.',
      availability: 'Flexible schedule',
      specialties: ['Bilingual', 'Special Needs', 'Art Activities'],
      backgroundCheck: true,
      references: 5,
      interviewDate: '2024-01-25',
    },
    {
      id: 3,
      name: 'Jennifer Kim',
      jobTitle: 'Weekend Elderly Care Assistant',
      appliedDate: '2024-01-18',
      status: 'under_review',
      rating: 4.8,
      reviews: 19,
      experience: '6+ years',
      location: 'Queens, NY',
      hourlyRate: '$18-20',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
      coverLetter: 'I have extensive experience in elderly care and would be honored to help care for your family member. I understand the importance of dignity and respect.',
      availability: 'Weekends only',
      specialties: ['Elderly Care', 'Meal Prep', 'Medication Reminders'],
      backgroundCheck: true,
      references: 4,
    },
    {
      id: 4,
      name: 'David Thompson',
      jobTitle: 'Part-time Babysitter for 2 Kids',
      appliedDate: '2024-01-17',
      status: 'rejected',
      rating: 4.7,
      reviews: 31,
      experience: '3+ years',
      location: 'Staten Island, NY',
      hourlyRate: '$16-18',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
      coverLetter: 'I\'m a former teacher who loves working with kids. I can help with homework and provide a fun, safe environment.',
      availability: 'After school hours',
      specialties: ['Teaching Background', 'Sports', 'Transportation'],
      backgroundCheck: false,
      references: 2,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-700';
      case 'interviewing':
        return 'bg-purple-100 text-purple-700';
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new':
        return 'New Application';
      case 'under_review':
        return 'Under Review';
      case 'interviewing':
        return 'Interview Scheduled';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Not Selected';
      default:
        return 'Unknown';
    }
  };

  const filterApplicants = (status: string) => {
    if (status === 'all') return applicants;
    return applicants.filter(applicant => applicant.status === status);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Applicants</CardTitle>
        <p className="text-sm text-gray-600">
          Review and manage applications for your job postings.
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All ({applicants.length})</TabsTrigger>
            <TabsTrigger value="new">New ({filterApplicants('new').length})</TabsTrigger>
            <TabsTrigger value="under_review">Review ({filterApplicants('under_review').length})</TabsTrigger>
            <TabsTrigger value="interviewing">Interview ({filterApplicants('interviewing').length})</TabsTrigger>
            <TabsTrigger value="accepted">Accepted ({filterApplicants('accepted').length})</TabsTrigger>
            <TabsTrigger value="rejected">Declined ({filterApplicants('rejected').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {applicants.map((applicant) => (
              <ApplicantCard key={applicant.id} applicant={applicant} getStatusColor={getStatusColor} getStatusText={getStatusText} />
            ))}
          </TabsContent>

          <TabsContent value="new" className="space-y-4 mt-6">
            {filterApplicants('new').map((applicant) => (
              <ApplicantCard key={applicant.id} applicant={applicant} getStatusColor={getStatusColor} getStatusText={getStatusText} />
            ))}
          </TabsContent>

          <TabsContent value="under_review" className="space-y-4 mt-6">
            {filterApplicants('under_review').map((applicant) => (
              <ApplicantCard key={applicant.id} applicant={applicant} getStatusColor={getStatusColor} getStatusText={getStatusText} />
            ))}
          </TabsContent>

          <TabsContent value="interviewing" className="space-y-4 mt-6">
            {filterApplicants('interviewing').map((applicant) => (
              <ApplicantCard key={applicant.id} applicant={applicant} getStatusColor={getStatusColor} getStatusText={getStatusText} />
            ))}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-4 mt-6">
            {filterApplicants('accepted').map((applicant) => (
              <ApplicantCard key={applicant.id} applicant={applicant} getStatusColor={getStatusColor} getStatusText={getStatusText} />
            ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4 mt-6">
            {filterApplicants('rejected').map((applicant) => (
              <ApplicantCard key={applicant.id} applicant={applicant} getStatusColor={getStatusColor} getStatusText={getStatusText} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function ApplicantCard({ applicant, getStatusColor, getStatusText }: { applicant: any; getStatusColor: (status: string) => string; getStatusText: (status: string) => string }) {
  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <Avatar className="w-16 h-16">
            <AvatarImage src={applicant.avatar} />
            <AvatarFallback>{applicant.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="mb-1">{applicant.name}</h4>
                <p className="text-sm text-gray-600">{applicant.jobTitle}</p>
              </div>
              <Badge className={getStatusColor(applicant.status)}>
                {getStatusText(applicant.status)}
              </Badge>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {applicant.location}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {applicant.rating} ({applicant.reviews} reviews)
              </div>
              <span>{applicant.experience} experience</span>
              <span>{applicant.hourlyRate}/hour</span>
            </div>
            
            <p className="text-sm text-gray-700 mb-3">{applicant.coverLetter}</p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {applicant.specialties.map((specialty: string) => (
                <Badge key={specialty} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
              <span>Applied: {new Date(applicant.appliedDate).toLocaleDateString()}</span>
              <span>Available: {applicant.availability}</span>
              {applicant.backgroundCheck && (
                <span className="text-green-600">✓ Background Check</span>
              )}
              <span>{applicant.references} references</span>
            </div>

            {applicant.interviewDate && (
              <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-50 p-2 rounded mb-3">
                <Calendar className="w-4 h-4" />
                <span>Interview scheduled for {new Date(applicant.interviewDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            View Resume
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Message
          </Button>
        </div>
        
        {applicant.status === 'new' && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Clock className="w-4 h-4 mr-2" />
              Review Later
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Interview
            </Button>
            <Button variant="destructive" size="sm">
              <X className="w-4 h-4 mr-2" />
              Decline
            </Button>
          </div>
        )}

        {applicant.status === 'under_review' && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Interview
            </Button>
            <Button variant="destructive" size="sm">
              <X className="w-4 h-4 mr-2" />
              Decline
            </Button>
          </div>
        )}

        {applicant.status === 'interviewing' && (
          <div className="flex gap-2">
            <Button size="sm">
              <Check className="w-4 h-4 mr-2" />
              Accept
            </Button>
            <Button variant="destructive" size="sm">
              <X className="w-4 h-4 mr-2" />
              Decline
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}