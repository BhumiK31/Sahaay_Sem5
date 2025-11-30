import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Application {
  applicationId: string;
  jobId: string;
  job: string;
  family: string;
  location: string;
  rate: string;
  appliedAt: string;
  status: string;
}

const tabs = ["all", "pending", "review", "interviews", "closed"];

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

const MyApplications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/jobs/caregiver/applications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        setApplications(data.applications || []);
      } catch (err) {
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleViewDetails = (jobId: string) => {
    navigate(`/caregiver/job/${jobId}`);
  };

  const handleMessageFamily = (jobId: string) => {
    navigate(`/caregiver/message-family/${jobId}`);
  };

  // Format ISO date as readable string
  const formatAppliedDate = (iso: string) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
          {loading && <p>Loading...</p>}
          {!loading &&
            applications
              .filter((app) => activeTab === "all" || app.status === activeTab)
              .map((app) => (
                <div key={app.applicationId || app.jobId} className="bg-card rounded-xl p-6 card-shadow card-lift">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          {/* Main job info */}
                          <h3 className="text-xl font-bold text-foreground mb-1">{app.job || "Untitled Job"}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="font-medium">{app.family || "Unknown Family"}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {app.location || "Unknown Location"}
                            </span>
                            <span>•</span>
                            <span>Applied {formatAppliedDate(app.appliedAt)}</span>
                          </div>
                        </div>
                      </div>
                      {/* Rate & status */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-lg font-bold text-primary">{app.rate || "Rate not specified"}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(app.status)}`}>
                          {getStatusLabel(app.status)}
                        </span>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2 lg:min-w-[160px]">
                      <Button
                        variant="outline"
                        className="flex-1 lg:flex-none rounded-lg"
                        onClick={() => handleViewDetails(app.jobId)}
                      >
                        View Details
                      </Button>
                      <Button
                        className="flex-1 lg:flex-none rounded-lg bg-primary hover:bg-primary/90"
                        onClick={() => handleMessageFamily(app.jobId)}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message Family
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          {!loading && applications.filter((app) => activeTab === "all" || app.status === activeTab).length === 0 && (
            <p className="text-center text-muted-foreground">No applications found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
