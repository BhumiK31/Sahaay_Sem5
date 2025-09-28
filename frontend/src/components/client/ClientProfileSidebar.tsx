import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Edit, MapPin, Phone, Mail, Users, Calendar, CreditCard, Shield } from 'lucide-react';

export function ClientProfileSidebar() {
  const profileCompletion = 92;
  
  const familyMembers = [
    { name: 'Emma (7)', relation: 'Daughter' },
    { name: 'Oliver (5)', relation: 'Son' },
  ];

  const preferences = [
    'Non-Smoker',
    'Background Check Required',
    'References Required',
    'CPR Certified Preferred',
    'Own Transportation',
  ];

  const recentActivity = [
    {
      action: 'Posted new job',
      job: 'Part-time Babysitter',
      time: '2 days ago',
    },
    {
      action: 'Scheduled interview',
      job: 'Maria Rodriguez',
      time: '3 days ago',
    },
    {
      action: 'Reviewed application',
      job: 'Sarah Anderson',
      time: '1 week ago',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card>
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
            <AvatarFallback>MJ</AvatarFallback>
          </Avatar>
          <CardTitle>The Johnson Family</CardTitle>
          <p className="text-sm text-gray-600">Brooklyn, NY</p>
          <Badge className="mt-2 bg-purple-100 text-purple-700">
            Verified Family
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Profile Completion</span>
              <span>{profileCompletion}%</span>
            </div>
            <Progress value={profileCompletion} className="h-2" />
          </div>
          
          <Button variant="outline" className="w-full">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>Brooklyn, NY 11215</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-gray-500" />
            <span>(555) 987-6543</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-gray-500" />
            <span>michael.johnson@email.com</span>
          </div>
        </CardContent>
      </Card>

      {/* Family Members */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5" />
            Family Members
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {familyMembers.map((member, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm">{member.name}</p>
                <p className="text-xs text-gray-600">{member.relation}</p>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full" size="sm">
            Add Family Member
          </Button>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Care Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {preferences.map((preference) => (
              <Badge key={preference} variant="secondary" className="text-xs">
                {preference}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="text-sm">
              <p className="text-gray-900">{activity.action}</p>
              <p className="text-gray-600">{activity.job}</p>
              <p className="text-xs text-gray-400">{activity.time}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Interview
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <CreditCard className="w-4 h-4 mr-2" />
            Payment Methods
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Shield className="w-4 h-4 mr-2" />
            Safety &amp; Security
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Users className="w-4 h-4 mr-2" />
            Find Caregivers
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}