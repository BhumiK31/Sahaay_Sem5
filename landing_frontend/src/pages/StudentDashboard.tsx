import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import sahaayLogo from '@/assets/sahaay-logo.png';
import { Calendar, DollarSign, Star, Users, MessageCircle, TrendingUp } from 'lucide-react';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const mockStats = {
    totalEarnings: '₹12,450',
    completedJobs: 23,
    rating: 4.8,
    activeBookings: 3
  };

  const mockBookings = [
    {
      id: 1,
      family: 'The Sharma Family',
      service: 'Child Care',
      date: 'Today, 2:00 PM - 6:00 PM',
      payment: '₹800',
      status: 'confirmed'
    },
    {
      id: 2,
      family: 'Mrs. Patel',
      service: 'Senior Care',
      date: 'Tomorrow, 10:00 AM - 2:00 PM',
      payment: '₹1,200',
      status: 'confirmed'
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
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">S</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-width section-padding">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-poppins font-bold text-foreground mb-2">
            Ready to help! 🤝
          </h1>
          <p className="text-muted-foreground">
            Your helper dashboard - manage bookings and grow your income.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'bookings'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'earnings'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Earnings
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Earnings</p>
                      <p className="text-2xl font-bold text-foreground">{mockStats.totalEarnings}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Completed Jobs</p>
                      <p className="text-2xl font-bold text-foreground">{mockStats.completedJobs}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Your Rating</p>
                      <p className="text-2xl font-bold text-foreground">{mockStats.rating}</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Bookings</p>
                      <p className="text-2xl font-bold text-foreground">{mockStats.activeBookings}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-accent-coral" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>Your scheduled care sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">{booking.family}</h4>
                        <p className="text-sm text-muted-foreground">{booking.service}</p>
                        <p className="text-sm text-muted-foreground">{booking.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{booking.payment}</p>
                        <Badge variant="secondary" className="mt-1">
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">All Bookings</h2>
              <Button variant="outline">
                Filter
              </Button>
            </div>
            
            <div className="space-y-4">
              {mockBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{booking.family}</h4>
                        <p className="text-sm text-muted-foreground">{booking.service}</p>
                        <p className="text-sm text-muted-foreground">{booking.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{booking.payment}</p>
                        <Badge variant="secondary" className="mt-1">
                          {booking.status}
                        </Badge>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" variant="outline">
                            Message
                          </Button>
                          <Button size="sm" className="btn-hero">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Earnings Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Earnings analytics will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;