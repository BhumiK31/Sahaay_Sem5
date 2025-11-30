import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, MessageSquare, FileText } from 'lucide-react';

export function ApplicationStatus() {
  const applications = [
    {
      id: 1,
      title: 'Live-in Elderly Care Assistant',
      family: 'Smith Family',
      location: 'Manhattan, NY',
      appliedDate: '2024-01-15',
      status: 'interview_scheduled',
      statusText: 'Interview Scheduled',
      interviewDate: '2024-01-22',
      rate: '$3,500/month',
      notes: 'Initial phone screening completed. In-person interview scheduled.',
    },
    {
      id: 2,
      title: 'Weekend Childcare for 3 Kids',
      family: 'Martinez Family',
      location: 'Queens, NY',
      appliedDate: '2024-01-18',
      status: 'under_review',
      statusText: 'Under Review',
      rate: '$22/hour',
      notes: 'Application submitted with references. Awaiting family response.',
    },
    {
      id: 3,
      title: 'Part-time Babysitter',
      family: 'Johnson Family',
      location: 'Brooklyn, NY',
      appliedDate: '2024-01-20',
      status: 'pending',
      statusText: 'Application Sent',
      rate: '$20/hour',
      notes: 'Just submitted application today.',
    },
    {
      id: 4,
      title: 'Senior Companion Care',
      family: 'Williams Residence',
      location: 'Staten Island, NY',
      appliedDate: '2024-01-10',
      status: 'rejected',
      statusText: 'Not Selected',
      rate: '$18/hour',
      notes: 'Family chose another candidate. Feedback: Looking for someone with more experience.',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interview_scheduled':
        return 'bg-purple-100 text-purple-700';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-700';
      case 'pending':
        return 'bg-blue-100 text-blue-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filterApplications = (status: string) => {
    if (status === 'all') return applications;
    return applications.filter(app => app.status === status);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({filterApplications('pending').length})</TabsTrigger>
            <TabsTrigger value="under_review">Review ({filterApplications('under_review').length})</TabsTrigger>
            <TabsTrigger value="interview_scheduled">Interviews ({filterApplications('interview_scheduled').length})</TabsTrigger>
            <TabsTrigger value="rejected">Closed ({filterApplications('rejected').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {applications.map((app) => (
              <ApplicationCard key={app.id} application={app} getStatusColor={getStatusColor} />
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4 mt-6">
            {filterApplications('pending').map((app) => (
              <ApplicationCard key={app.id} application={app} getStatusColor={getStatusColor} />
            ))}
          </TabsContent>

          <TabsContent value="under_review" className="space-y-4 mt-6">
            {filterApplications('under_review').map((app) => (
              <ApplicationCard key={app.id} application={app} getStatusColor={getStatusColor} />
            ))}
          </TabsContent>

          <TabsContent value="interview_scheduled" className="space-y-4 mt-6">
            {filterApplications('interview_scheduled').map((app) => (
              <ApplicationCard key={app.id} application={app} getStatusColor={getStatusColor} />
            ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4 mt-6">
            {filterApplications('rejected').map((app) => (
              <ApplicationCard key={app.id} application={app} getStatusColor={getStatusColor} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function ApplicationCard({ application, getStatusColor }: { application: any; getStatusColor: (status: string) => string }) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="mb-1">{application.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{application.family} • {application.location}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
            <span>•</span>
            <span>{application.rate}</span>
          </div>
        </div>
        <Badge className={getStatusColor(application.status)}>
          {application.statusText}
        </Badge>
      </div>

      {application.notes && (
        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{application.notes}</p>
      )}

      {application.interviewDate && (
        <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-50 p-2 rounded">
          <Calendar className="w-4 h-4" />
          <span>Interview scheduled for {new Date(application.interviewDate).toLocaleDateString()}</span>
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <FileText className="w-4 h-4 mr-2" />
          View Details
        </Button>
        <Button variant="outline" size="sm">
          <MessageSquare className="w-4 h-4 mr-2" />
          Message Family
        </Button>
      </div>
    </div>
  );
}