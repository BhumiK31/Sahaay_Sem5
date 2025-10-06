import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CaregiverDetails } from "@/components/booking/CaregiverDetails";
import { ServiceInformation } from "@/components/booking/ServiceInformation";
import { ContactDetails } from "@/components/booking/ContactDetails";
import { PaymentSummary } from "@/components/booking/PaymentSummary";
import { QuickActions } from "@/components/booking/QuickActions";
import { BookingTimeline } from "@/components/booking/BookingTimeline";

const BookingDetails = () => {
  const navigate = useNavigate();

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
              <p className="text-muted-foreground">Booking ID: #1</p>
            </div>
            <Badge className="bg-[hsl(var(--success))] text-white border-0 px-4 py-2 text-sm">
              Active
            </Badge>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <CaregiverDetails />
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
