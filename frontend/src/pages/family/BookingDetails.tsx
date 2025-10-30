import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Calendar, 
  Phone, 
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Upload,
  User,
  CreditCard,
  Edit,
  CalendarClock
} from 'lucide-react';

const BookingDetails = () => {
  const { bookingId, id } = useParams();
  const actualBookingId = bookingId || id;
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    // Mock booking data - replace with actual API call
    const mockBooking = {
      id: actualBookingId,
      family: {
        name: "Sharma Family",
        contact: "Mr. Rajesh Sharma",
        phone: "+91 98765 43210",
        email: "rajesh.sharma@email.com",
        address: "1234 MG Road, Koramangala, Bangalore - 560034",
        avatar: "RS"
      },
      service: {
        type: "Elderly Care",
        date: "Today, Dec 25, 2024",
        time: "2:00 PM - 8:00 PM",
        duration: "6 hours",
        rate: 350,
        description: "Elderly care, medication assistance, companionship",
        specialInstructions: "Grandmother needs medication at 4 PM and 6 PM. Prefers light conversation and gentle assistance with mobility."
      },
      payment: {
        service: 2100,
        platformFee: 50,
        total: 2150,
        status: "Confirmed",
        bookedOn: "Dec 20, 2024"
      },
      status: "In Progress",
      timeline: [
        {
          status: "Booking Confirmed",
          timestamp: "Dec 20, 2024",
          completed: true
        },
        {
          status: "Caregiver Assigned",
          timestamp: "Dec 20, 2024",
          completed: true
        },
        {
          status: "Service In Progress",
          timestamp: "Now",
          completed: false,
          current: true
        }
      ],
      documents: [
        { name: "Service Agreement.pdf", status: "uploaded", verified: true },
        { name: "Health Certificate.pdf", status: "uploaded", verified: true },
        { name: "ID Verification.jpg", status: "uploaded", verified: true }
      ]
    };
    setBooking(mockBooking);
  }, [actualBookingId]);

  if (!booking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading booking details...</h2>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-orange-500';
      case 'Completed': return 'bg-green-500';
      case 'Upcoming': return 'bg-blue-500';
      case 'Cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleScheduleInterview = () => {
    navigate(`/family/schedule-interview/${actualBookingId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-semibold">Booking Details</h1>
                <p className="text-muted-foreground">Booking ID: #{booking.id}</p>
              </div>
            </div>
            <Badge className={`${getStatusColor(booking.status)} text-white`}>
              {booking.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Family Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Family Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold relative">
                    {booking.family.avatar}
                    <CheckCircle2 className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{booking.family.name}</h3>
                    <p className="text-muted-foreground text-sm">{booking.family.contact}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <Button size="sm" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Service Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{booking.service.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{booking.family.address}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time & Duration</p>
                      <p className="font-medium">{booking.service.time}</p>
                      <p className="text-sm text-muted-foreground">{booking.service.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-red-50 text-red-700">
                      {booking.service.type}
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Requirements</h4>
                  <p className="text-muted-foreground text-sm">{booking.service.description}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Special Instructions</h4>
                  <p className="text-muted-foreground text-sm">{booking.service.specialInstructions}</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Primary Contact</p>
                    <p className="font-medium">{booking.family.contact}</p>
                    <p className="text-sm text-muted-foreground">{booking.family.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  My Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {booking.documents.map((doc: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-50 rounded flex items-center justify-center">
                          📄
                        </div>
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.verified && (
                          <Badge variant="secondary" className="bg-green-50 text-green-700 text-xs">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Service (₹{booking.service.rate}/hr × {booking.service.duration.split(' ')[0]}hrs)</span>
                    <span className="font-medium">₹{booking.payment.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Platform Fee</span>
                    <span className="font-medium">₹{booking.payment.platformFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-blue-600">₹{booking.payment.total}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Booked on {booking.payment.bookedOn}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleScheduleInterview}
                >
                  <CalendarClock className="w-4 h-4" />
                  Schedule Interview
                </Button>
                <Button
                  className="w-full mt-2 bg-primary text-white"
                  onClick={() => navigate(`/family/payment/${booking.id}`)}
                >
                  Pay Now
                </Button>
              </CardContent>
            </Card>

            {/* Booking Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Service Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {booking.timeline.map((item: any, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-1 ${
                        item.completed ? 'bg-green-500' : 
                        item.current ? 'bg-orange-500' : 'bg-gray-300'
                      }`} />
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          item.current ? 'text-orange-600' : 
                          item.completed ? 'text-green-600' : 'text-muted-foreground'
                        }`}>
                          {item.status}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate(`/caregiver/contact-family/${actualBookingId}`)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Family
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate(`/caregiver/modify-booking/${actualBookingId}`)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Request Changes
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  Emergency Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-700 mb-3">
                  Need immediate help during service?
                </p>
                <Button variant="destructive" size="sm" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Emergency: 1800-XXX-XXXX
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
