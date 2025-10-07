import { useState } from "react";
import { MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const MyApplications = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const tabs = ["all", "pending", "review", "interviews", "closed"];
  
  const applications = [
    {
      id: 1,
      job: "Elderly Care Assistant",
      family: "Johnson Family",
      location: "Mumbai, Maharashtra",
      applied: "3 days ago",
      rate: "₹500/hour",
      status: "review"
    },
    {
      id: 2,
      job: "Medical Caregiver",
      family: "Patel Family",
      location: "Delhi, NCR",
      applied: "1 week ago",
      rate: "₹450/hour",
      status: "interviews"
    },
    {
      id: 3,
      job: "Weekend Caregiver",
      family: "Kumar Family",
      location: "Bangalore, Karnataka",
      applied: "2 weeks ago",
      rate: "₹600/hour",
      status: "closed"
    },
    {
      id: 4,
      job: "Full-time Nurse",
      family: "Sharma Family",
      location: "Pune, Maharashtra",
      applied: "5 days ago",
      rate: "₹400/hour",
      status: "pending"
    },
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "review":
        return "bg-status-review/10 text-status-review border-status-review/20";
      case "pending":
        return "bg-status-pending/10 text-status-pending border-status-pending/20";
      case "interviews":
        return "bg-status-scheduled/10 text-status-scheduled border-status-scheduled/20";
      case "closed":
        return "bg-status-closed/10 text-status-closed border-status-closed/20";
      default:
        return "bg-secondary text-muted-foreground";
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "review":
        return "Under Review";
      case "pending":
        return "Pending";
      case "interviews":
        return "Interview Scheduled";
      case "closed":
        return "Not Selected";
      default:
        return status;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Applications</h1>
          <p className="text-muted-foreground">Track your job applications and their status</p>
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
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{app.job}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="font-medium">{app.family}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {app.location}
                          </span>
                          <span>•</span>
                          <span>Applied {app.applied}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-lg font-bold text-primary">{app.rate}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(app.status)}`}>
                        {getStatusLabel(app.status)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex lg:flex-col gap-2 lg:min-w-[160px]">
                    <Button variant="outline" className="flex-1 lg:flex-none rounded-lg">
                      View Details
                    </Button>
                    <Button className="flex-1 lg:flex-none rounded-lg bg-primary hover:bg-primary/90">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message Family
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

export default MyApplications;
