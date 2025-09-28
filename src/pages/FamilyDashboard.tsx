import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import sahaayLogo from '@/assets/sahaay-logo.png';
import { Search, Star, MapPin, Clock, MessageCircle, Heart } from 'lucide-react';

const FamilyDashboard = () => {
  const [activeTab, setActiveTab] = useState('find-care');

  const mockHelpers = [
    {
      id: 1,
      name: 'Priya Sharma',
      service: 'Child Care',
      rating: 4.8,
      reviews: 23,
      location: 'Bandra, Mumbai',
      availability: 'Available today',
      hourlyRate: '₹200-300/hr',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Arjun Patel',
      service: 'Senior Care',
      rating: 4.9,
      reviews: 17,
      location: 'Koregaon Park, Pune',
      availability: 'Available tomorrow',
      hourlyRate: '₹250-350/hr',
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container-width">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center">
              <img src={sahaayLogo} alt="SAHAAY" className="h-10 w-auto" />
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 bg-accent-coral rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">F</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-width section-padding">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-poppins font-bold text-foreground mb-2">
            Welcome back! 💛
          </h1>
          <p className="text-muted-foreground">
            Your trusted space for care and support.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('find-care')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'find-care'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Find Care
          </button>
          <button
            onClick={() => setActiveTab('my-bookings')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'my-bookings'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'favorites'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Favorites
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'find-care' && (
          <div className="space-y-6">
            {/* Search Bar */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search for care services..."
                      className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <Button className="btn-hero">
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Available Helpers */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Available Helpers</h2>
              <div className="grid gap-4">
                {mockHelpers.map((helper) => (
                  <Card key={helper.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={helper.image}
                          alt={helper.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-foreground">{helper.name}</h3>
                              <Badge variant="secondary" className="mb-2">
                                {helper.service}
                              </Badge>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                  {helper.rating} ({helper.reviews} reviews)
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {helper.location}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {helper.availability}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-foreground">{helper.hourlyRate}</p>
                              <div className="flex space-x-2 mt-2">
                                <Button size="sm" variant="outline">
                                  <Heart className="w-4 h-4" />
                                </Button>
                                <Button size="sm" className="btn-hero">
                                  Book Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'my-bookings' && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-foreground mb-2">No bookings yet</h3>
            <p className="text-muted-foreground mb-4">Start by finding the perfect helper for your needs</p>
            <Button 
              className="btn-hero"
              onClick={() => setActiveTab('find-care')}
            >
              Find Care
            </Button>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-foreground mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-4">Save helpers you love to easily find them later</p>
            <Button 
              className="btn-hero"
              onClick={() => setActiveTab('find-care')}
            >
              Explore Helpers
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyDashboard;