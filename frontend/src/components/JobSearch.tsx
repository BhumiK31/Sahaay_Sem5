import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, MapPin, Clock, DollarSign, Bookmark, Heart } from 'lucide-react';

export function JobSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const jobs = [
    {
      id: 1,
      title: 'Part-time Babysitter Needed',
      family: 'The Johnson Family',
      location: 'Brooklyn, NY',
      rate: '$18-22/hour',
      type: 'Babysitting',
      schedule: 'Mon, Wed, Fri (3-7 PM)',
      description: 'Looking for a reliable babysitter for our 5-year-old twins. Experience with children required.',
      posted: '2 days ago',
      urgent: false,
    },
    {
      id: 2,
      title: 'Live-in Elderly Care Assistant',
      family: 'Smith Family',
      location: 'Manhattan, NY',
      rate: '$3,500/month',
      type: 'Elderly Care',
      schedule: 'Full-time Live-in',
      description: 'Seeking compassionate caregiver for elderly father with mobility issues. Cooking and light housekeeping included.',
      posted: '1 day ago',
      urgent: true,
    },
    {
      id: 3,
      title: 'Weekend Childcare for 3 Kids',
      family: 'The Martinez Family',
      location: 'Queens, NY',
      rate: '$20-25/hour',
      type: 'Babysitting',
      schedule: 'Saturday & Sunday (8 AM - 6 PM)',
      description: 'Active family needs weekend childcare for ages 3, 7, and 9. Must be comfortable with outdoor activities.',
      posted: '3 days ago',
      urgent: false,
    },
    {
      id: 4,
      title: 'Senior Companion Care',
      family: 'Williams Residence',
      location: 'Staten Island, NY',
      rate: '$16-20/hour',
      type: 'Elderly Care',
      schedule: 'Part-time (20 hrs/week)',
      description: 'Companion care for active senior. Light meal preparation and transportation to appointments.',
      posted: '5 days ago',
      urgent: false,
    },
  ];

  const toggleSaved = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Care Jobs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search for jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="babysitting">Babysitting</SelectItem>
                <SelectItem value="elderly">Elderly Care</SelectItem>
                <SelectItem value="housekeeping">Housekeeping</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="manhattan">Manhattan</SelectItem>
                <SelectItem value="brooklyn">Brooklyn</SelectItem>
                <SelectItem value="queens">Queens</SelectItem>
                <SelectItem value="bronx">Bronx</SelectItem>
                <SelectItem value="staten-island">Staten Island</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg">{job.title}</h3>
                    {job.urgent && (
                      <Badge variant="destructive" className="text-xs">URGENT</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{job.family}</p>
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
                  </div>
                  <p className="text-gray-700 mb-3">{job.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{job.type}</Badge>
                    <span className="text-xs text-gray-500">Posted {job.posted}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleSaved(job.id)}
                    className={savedJobs.includes(job.id) ? 'text-red-500' : 'text-gray-400'}
                  >
                    <Heart className={`w-5 h-5 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">
                    Apply Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}