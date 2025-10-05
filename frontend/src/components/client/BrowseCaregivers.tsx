import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, MapPin, Star, MessageSquare, Heart, Calendar, DollarSign } from 'lucide-react';

export function BrowseCaregivers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedCaregivers, setSavedCaregivers] = useState<number[]>([]);

  const caregivers = [
    {
      id: 1,
      name: 'Sarah Anderson',
      title: 'Professional Caregiver',
      location: 'Brooklyn, NY',
      rating: 4.9,
      reviews: 27,
      hourlyRate: '$18-25',
      experience: '5+ years',
      specialties: ['Childcare', 'Elderly Care', 'CPR Certified'],
      availability: 'Available weekdays',
      bio: 'Experienced caregiver with a passion for helping families. I have worked with children of all ages and elderly clients.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b372?w=100&h=100&fit=crop&crop=face',
      verified: true,
      backgroundCheck: true,
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      title: 'Certified Childcare Specialist',
      location: 'Manhattan, NY',
      rating: 5.0,
      reviews: 43,
      hourlyRate: '$20-28',
      experience: '8+ years',
      specialties: ['Babysitting', 'Special Needs', 'Bilingual'],
      availability: 'Flexible schedule',
      bio: 'Dedicated childcare professional fluent in English and Spanish. Experience with special needs children.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      verified: true,
      backgroundCheck: true,
    },
    {
      id: 3,
      name: 'Jennifer Chen',
      title: 'Senior Care Specialist',
      location: 'Queens, NY',
      rating: 4.8,
      reviews: 19,
      hourlyRate: '$22-30',
      experience: '6+ years',
      specialties: ['Elderly Care', 'Dementia Care', 'Meal Prep'],
      availability: 'Weekends preferred',
      bio: 'Compassionate elderly care specialist with experience in dementia and Alzheimer\'s care. Certified nursing assistant.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      verified: true,
      backgroundCheck: true,
    },
    {
      id: 4,
      name: 'David Thompson',
      title: 'Family Care Provider',
      location: 'Staten Island, NY',
      rating: 4.7,
      reviews: 31,
      hourlyRate: '$16-22',
      experience: '3+ years',
      specialties: ['Childcare', 'Pet Care', 'Transportation'],
      availability: 'After school hours',
      bio: 'Reliable family care provider with own vehicle. Great with kids and pets. Former elementary school teacher.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      verified: true,
      backgroundCheck: false,
    },
  ];

  const toggleSaved = (caregiverId: number) => {
    setSavedCaregivers(prev => 
      prev.includes(caregiverId) 
        ? prev.filter(id => id !== caregiverId)
        : [...prev, caregiverId]
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Browse Caregivers</CardTitle>
          <p className="text-sm text-gray-600">
            Find experienced caregivers in your area. All caregivers are pre-screened and background checked.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search caregivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="babysitting">Babysitting</SelectItem>
                <SelectItem value="elderly">Elderly Care</SelectItem>
                <SelectItem value="special-needs">Special Needs</SelectItem>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {caregivers.map((caregiver) => (
          <Card key={caregiver.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={caregiver.avatar} />
                    <AvatarFallback>{caregiver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {caregiver.verified && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="mb-1">{caregiver.name}</h3>
                      <p className="text-sm text-gray-600">{caregiver.title}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleSaved(caregiver.id)}
                      className={savedCaregivers.includes(caregiver.id) ? 'text-red-500' : 'text-gray-400'}
                    >
                      <Heart className={`w-5 h-5 ${savedCaregivers.includes(caregiver.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {caregiver.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {caregiver.rating} ({caregiver.reviews})
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {caregiver.hourlyRate}/hour
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {caregiver.availability}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{caregiver.bio}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {caregiver.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-green-600">✓ Verified</span>
                      {caregiver.backgroundCheck && (
                        <span className="text-blue-600">✓ Background Check</span>
                      )}
                      <span className="text-gray-500">{caregiver.experience} experience</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}