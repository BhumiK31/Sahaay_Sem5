import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Clock } from 'lucide-react';

export function RecentJobs() {
  const recentJobs = [
    {
      id: 1,
      title: 'Part-time Babysitter',
      family: 'Johnson Family',
      location: 'Brooklyn, NY',
      rate: '$20/hour',
      type: 'Babysitting',
      posted: '2 hours ago',
      isNew: true,
    },
    {
      id: 2,
      title: 'Senior Companion',
      family: 'Davis Family',
      location: 'Manhattan, NY',
      rate: '$18/hour',
      type: 'Elderly Care',
      posted: '5 hours ago',
      isNew: true,
    },
    {
      id: 3,
      title: 'Weekend Childcare',
      family: 'Brown Family',
      location: 'Queens, NY',
      rate: '$22/hour',
      type: 'Babysitting',
      posted: '1 day ago',
      isNew: false,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Job Postings</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentJobs.map((job) => (
          <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4>{job.title}</h4>
                {job.isNew && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">NEW</Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{job.family}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {job.posted}
                </div>
                <Badge variant="outline" className="text-xs">{job.type}</Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm mb-2">{job.rate}</p>
              <Button variant="outline" size="sm">Apply</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}