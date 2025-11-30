import { useState } from "react";
import { MapPin, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const ApplicationsAccepted = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const tabs = ["all", "active", "completed", "pending", "ended"];
  
  const applications = [
    {
      id: 1,
      caregiver: "Priya Kumar",
      rating: 4.8,
      service: "Elderly Care",
      location: "Mumbai, Maharashtra",
      startDate: "Oct 1, 2025",
      endDate: "Ongoing",
      rate: "₹500/hour",
      status: "active"
    },
    {
      id: 2,
      caregiver: "Ravi Sharma",
      rating: 4.9,
      service: "Post-Surgery Care",
      location: "Delhi, NCR",
      startDate: "Sep 15, 2025",
      endDate: "Sep 30, 2025",
      rate: "₹600/hour",
      status: "completed"
    },
    {
      id: 3,
      caregiver: "Meena Patel",
      rating: 4.7,
      service: "Weekend Care",
      location: "Bangalore, Karnataka",
      startDate: "Oct 10, 2025",
      endDate: "Pending",
      rate: "₹450/hour",
      status: "pending"
    },
    {
      id: 4,
      caregiver: "Ananya Reddy",
      rating: 4.9,
      service: "Dementia Care",
      location: "Pune, Maharashtra",
      startDate: "Aug 1, 2025",
      endDate: "Sep 15, 2025",
      rate: "₹550/hour",
      status: "ended"
    },
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success/10 text-success border-success/20";
      case "completed":
        return "bg-primary/10 text-primary border-primary/20";
      case "pending":
        return "bg-status-pending/10 text-status-pending border-status-pending/20";
      case "ended":
        return "bg-coral/10 text-coral border-coral/20";
      default:
        return "bg-secondary text-muted-foreground";
    }
  };
  
  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Applications Accepted</h1>
          <p className="text-muted-foreground">Manage your accepted caregivers and their services</p>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg font-medium capitalize whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:bg-secondary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {/* Application Cards */}
        <div className="space-y-4">
          {applications
            .filter((app) => activeTab === "all" || app.status === activeTab)
            .map((app) => (
              <div key={app.id} className="bg-card rounded-xl p-6 card-shadow card-lift">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex items-start gap-4 flex-1">
                    <Avatar className="w-14 h-14">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {app.caregiver.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{app.caregiver}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-primary fill-primary" />
                              <span className="font-medium text-foreground">{app.rating}</span>
                            </span>
                            <span>•</span>
                            <span className="font-medium">{app.service}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Location: </span>
                          <span className="text-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {app.location}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Rate: </span>
                          <span className="text-primary font-bold">{app.rate}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Start Date: </span>
                          <span className="text-foreground">{app.startDate}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">End Date: </span>
                          <span className="text-foreground">{app.endDate}</span>
                        </div>
                      </div>
                      
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(app.status)}`}>
                        {getStatusLabel(app.status)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex lg:flex-col gap-2 lg:min-w-[160px]">
                    <Button variant="outline" className="flex-1 lg:flex-none rounded-lg" onClick={() => navigate("/BookingDetails")}>
                      View Details
                    </Button>
                    <Button className="flex-1 lg:flex-none rounded-lg bg-primary hover:bg-primary/90">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message Caregiver
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationsAccepted;
