import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CaregiverDetails } from "@/components/booking/CaregiverDetails";
import { UploadedDocuments } from "@/components/booking/UploadedDocuments";
import { ServiceInformation } from "@/components/booking/ServiceInformation";
import { ContactDetails } from "@/components/booking/ContactDetails";
import { PaymentSummary } from "@/components/booking/PaymentSummary";
import { QuickActions } from "@/components/booking/QuickActions";
import { BookingTimeline } from "@/components/booking/BookingTimeline";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const BookingDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // Check if payment was successful
  useEffect(() => {
    const paymentSuccess = searchParams.get('paymentSuccess');
    if (paymentSuccess === 'true') {
      toast({
        title: "Booking Confirmed! ✓",
        description: "Your payment has been processed successfully.",
        className: "bg-green-50 border-green-200",
      });
      
      // Remove the query parameter after showing toast
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('paymentSuccess');
      navigate(`/?${newSearchParams.toString()}`, { replace: true });
    }
  }, [searchParams, toast, navigate]);

  // Demo data - replace with actual booking data from your state/API
  const bookingData = {
    bookingId: searchParams.get('bookingId') || 'DEMO_BOOKING_123',
    userId: 'USER_123', // Replace with actual logged-in user ID
    amount: 5000, // Replace with actual booking amount from your data
    paymentStatus: searchParams.get('paymentSuccess') === 'true' ? 'completed' : 'pending'
  };

  const handlePayment = () => {
    // Navigate to payment page with booking details
    navigate(`/payment?bookingId=${bookingData.bookingId}&userId=${bookingData.userId}&amount=${bookingData.amount}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">Booking Details</h1>
            </div>
            <Badge 
              className={`${
                bookingData.paymentStatus === 'completed' 
                  ? 'bg-[hsl(var(--success))]' 
                  : 'bg-yellow-500'
              } text-white border-0 px-4 py-2 text-sm`}
            >
              {bookingData.paymentStatus === 'completed' ? 'Active' : 'Pending Payment'}
            </Badge>
          </div>
        </div>

        {/* Payment Action Banner */}
        {bookingData.paymentStatus === 'pending' && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">Complete Payment</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Your booking is pending. Complete the payment to confirm your booking.
                </p>
              </div>
              <Button 
                onClick={handlePayment}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Pay Now
              </Button>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <CaregiverDetails />
            <UploadedDocuments />
            <ServiceInformation />
            <ContactDetails />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <PaymentSummary />
            <QuickActions />
            <BookingTimeline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;