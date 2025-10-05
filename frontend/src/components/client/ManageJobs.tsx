import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { MapPin, Clock, DollarSign, Users, Eye, Edit, Pause, Play, X } from 'lucide-react';

export function ManageJobs() {
  const jobs = [
    {
      id: 1,
      title: 'Part-time Babysitter for 2 Kids',
      type: 'Babysitting',
      location: 'Brooklyn, NY',
      rate: '$20-25/hour',
      schedule: 'Mon, Wed, Fri (3-7 PM)',
      posted: '3 days ago',
      status: 'active',
      applicants: 8,
      views: 47,
      description: 'Looking for a reliable babysitter for our 5 and 7-year-old. Experience with school-age children preferred.',
    },
    {
      id: 2,
      title: 'Weekend Elderly Care Assistant',
      type: 'Elderly Care',
      location: 'Manhattan, NY',
      rate: '$18-22/hour',
      schedule: 'Saturday & Sunday (9 AM - 5 PM)',
      posted: '1 week ago',
      status: 'active',
      applicants: 12,
      views: 89,
      description: 'Seeking compassionate caregiver for elderly mother. Light housekeeping and meal preparation included.',
    },
    {
      id: 3,
      title: 'Live-in Nanny Position',
      type: 'Babysitting',
      location: 'Queens, NY',
      rate: '$4,000/month',
      schedule: 'Full-time Live-in',
      posted: '2 weeks ago',
      status: 'paused',
      applicants: 23,
      views: 156,
      description: 'Full-time live-in nanny for infant and toddler. Separate living quarters provided.',
    },
    {
      id: 4,
      title: 'After School Care',
      type: 'Babysitting',
      location: 'Staten Island, NY',
      rate: '$16-20/hour',
      schedule: 'Mon-Fri (3-6 PM)',
      posted: '1 month ago',
      status: 'filled',
      applicants: 15,
      views: 93,
      description: 'After school care for elementary school children. Must have own transportation.',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'paused':
        return 'bg-yellow-100 text-yellow-700';
      case 'filled':
        return 'bg-blue-100 text-blue-700';
      case 'expired':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'paused':
        return 'Paused';
      case 'filled':
        return 'Position Filled';
      case 'expired':
        return 'Expired';
      default:
        return 'Unknown';
    }
  };

  const filterJobs = (status: string) => {
    if (status === 'all') return jobs;
    return jobs.filter(job => job.status === status);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Job Posts</CardTitle>
        <Button>Post New Job</Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({jobs.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({filterJobs('active').length})</TabsTrigger>
            <TabsTrigger value="paused">Paused ({filterJobs('paused').length})</TabsTrigger>
            <TabsTrigger value="filled">Filled ({filterJobs('filled').length})</TabsTrigger>
            <TabsTrigger value="expired">Expired ({filterJobs('expired').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} getStatusColor={getStatusColor} getStatusText={getStatusText} />
            ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-4 mt-6">
            {filterJobs('active').map((job) => (
              <JobCard key={job.id} job={job} getStatusColor={getStatusColor} getStatusText={getStatusText} />
            ))}
          </TabsContent>

          <TabsContent value="paused" className="space-y-4 mt-6">
            {filterJobs('paused').map((job) => (
              <JobCard key={job.id} job={job} getStatusColor={getStatusColor} getStatusText={getStatusText} />
            ))}
          </TabsContent>

          <TabsContent value="filled" className="space-y-4 mt-6">
            {filterJobs('filled').map((job) => (
              <JobCard key={job.id} job={job} getStatusColor={getStatusColor} getStatusText={getStatusText} />
            ))}
          </TabsContent>

          <TabsContent value="expired" className="space-y-4 mt-6">
            {filterJobs('expired').map((job) => (
              <JobCard key={job.id} job={job} getStatusColor={getStatusColor} getStatusText={getStatusText} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function JobCard({ job, getStatusColor, getStatusText }: { job: any; getStatusColor: (status: string) => string; getStatusText: (status: string) => string }) {
  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4>{job.title}</h4>
            <Badge className={getStatusColor(job.status)}>
              {getStatusText(job.status)}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {job.rate}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {job.schedule}
            </div>
            <Badge variant="outline">{job.type}</Badge>
          </div>
          <p className="text-gray-700 mb-3">{job.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {job.applicants} applicants
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {job.views} views
            </div>
            <span>Posted {job.posted}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          {job.status === 'active' && (
            <Button variant="outline" size="sm">
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          )}
          {job.status === 'paused' && (
            <Button variant="outline" size="sm">
              <Play className="w-4 h-4 mr-2" />
              Resume
            </Button>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            View Applicants ({job.applicants})
          </Button>
          {job.status !== 'filled' && (
            <Button variant="destructive" size="sm">
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}