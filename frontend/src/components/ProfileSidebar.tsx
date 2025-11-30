import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Edit, Star, Award, MapPin, Phone, Mail, Calendar } from 'lucide-react';

export function ProfileSidebar() {
  const profileCompletion = 85;
  
  const skills = [
    'Childcare',
    'Elderly Care',
    'CPR Certified',
    'First Aid',
    'Cooking',
    'Light Housekeeping',
  ];

  const certifications = [
    {
      name: 'CPR Certification',
      issuer: 'American Red Cross',
      expires: '2025-06-15',
    },
    {
      name: 'First Aid Certification',
      issuer: 'American Red Cross',
      expires: '2025-06-15',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card>
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b372?w=150&h=150&fit=crop&crop=face" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <CardTitle>Sarah Anderson</CardTitle>
          <p className="text-sm text-gray-600">Professional Caregiver</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600 ml-1">(4.9)</span>
          </div>
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
            <span>Brooklyn, NY 11201</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-gray-500" />
            <span>(555) 123-4567</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-gray-500" />
            <span>sarah.anderson@email.com</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>Available: Mon-Fri</span>
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Skills &amp; Expertise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Certifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {certifications.map((cert, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Award className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm">{cert.name}</p>
                <p className="text-xs text-gray-600">{cert.issuer}</p>
                <p className="text-xs text-gray-500">Expires: {new Date(cert.expires).toLocaleDateString()}</p>
              </div>
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
            Update Availability
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Upload Documents
          </Button>
          <Button variant="outline" className="w-full justify-start">
            View Background Check
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Payment Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}