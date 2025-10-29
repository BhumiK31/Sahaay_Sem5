import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Eye, MessageSquare, Star, Download, CheckCircle2, X, Search, MapPin, Filter } from "lucide-react";
import StatCard from "@/components/caregiver/StatCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CaregiverDashboard = () => {
  const navigate = useNavigate();

  // UI State
  const [isAvailable, setIsAvailable] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  // Dynamic Backend Data
  const [stats, setStats] = useState({
    jobsApplied: 0,
    profileViews: 0,
    interviews: 0,
    hired: 0,
  });
  const [weeklyEarnings, setWeeklyEarnings] = useState([]);
  const [maxEarning, setMaxEarning] = useState(1);
  const [documents, setDocuments] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [caregiver, setCaregiver] = useState({ name: "", completion: 0 });
  const [loading, setLoading] = useState(true);

  // Token
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/jobs/caregiver/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        // *** FIX STARTS HERE ***
        setStats({
          jobsApplied: data.stats?.jobsApplied ?? 0,
          profileViews: data.stats?.profileViews ?? 0,
          interviews: data.stats?.interviews ?? 0,
          hired: data.stats?.hired ?? 0,
        });
        // *** FIX ENDS HERE ***
        setWeeklyEarnings(Array.isArray(data.weeklyEarnings) ? data.weeklyEarnings : []);
        setMaxEarning(
          Array.isArray(data.weeklyEarnings) && data.weeklyEarnings.length > 0
            ? Math.max(...data.weeklyEarnings.map(d => d.amount))
            : 1
        );
        setDocuments(Array.isArray(data.documents) ? data.documents : []);
        setCaregiver({
          name: data.caregiver?.name ?? "Caregiver",
          completion: data.caregiver?.completion ?? 0
        });
        setRecentJobs(Array.isArray(data.recentJobs) ? data.recentJobs : []);
      } catch (err) {
        setStats({ jobsApplied: 0, profileViews: 0, interviews: 0, hired: 0 });
        setWeeklyEarnings([]);
        setDocuments([]);
        setCaregiver({ name: "Caregiver", completion: 0 });
        setRecentJobs([]);
      }
      setLoading(false);
    };
    fetchDashboard();
  }, [token]);


  const handleDownloadDocument = (docName) => {
    console.log("Downloading:", docName);
  };
  const handleRemoveDocument = (docName) => {
    setDocuments(documents.filter(doc => doc.name !== docName));
  };
  const handleViewDetails = (jobId) => {
    navigate(`/caregiver/job/${jobId}`);
  };
  const handleApplyNow = (jobId) => {
    navigate(`/caregiver/apply/${jobId}`);
  };
  const handleViewAllJobs = () => {
    navigate('/caregiver/find-jobs');
  };

  const filteredJobs = (recentJobs || []).filter(job => {
    const matchesSearch =
      job.family?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {caregiver.name}!</h1>
            <p className="text-muted-foreground">Here's what's happening with your caregiving profile today.</p>
          </div>
          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${isAvailable
              ? "bg-success text-success-foreground shadow-lg"
              : "bg-coral text-coral-foreground shadow-lg"
              }`}
          >
            <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
            {isAvailable ? "Available for Jobs" : "Not Available"}
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Briefcase} title="Jobs Applied" value={stats.jobsApplied} description="Total job applications sent" />
          <StatCard icon={Eye} title="Profile Views" value={stats.profileViews} description="Families who viewed your profile" />
          <StatCard icon={MessageSquare} title="Interviews" value={stats.interviews} description="Interviews scheduled" />
          <StatCard icon={Star} title="Hired" value={stats.hired} description="Active caregiving roles" />
        </div>

        {/* Weekly Earnings & Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Earnings */}
          <div className="lg:col-span-2 bg-card rounded-xl p-6 card-shadow">
            <h2 className="text-xl font-bold text-foreground mb-4">Weekly Earnings Overview</h2>
            <div className="space-y-3">
              {(Array.isArray(weeklyEarnings) ? weeklyEarnings : []).map((day, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground w-10">{day.day}</span>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        day.amount === maxEarning
                          ? "bg-success"
                          : day.amount === Math.min(...weeklyEarnings.map(d => d.amount))
                          ? "bg-coral"
                          : "bg-primary"
                        }`}
                      style={{ width: `${(day.amount / maxEarning) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-foreground w-20 text-right">₹{day.amount}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Consistent week! Keep it up 💪
            </p>
          </div>

          {/* Profile & Documents */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-card rounded-xl p-6 card-shadow">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">AS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground">{caregiver.name}</h3>
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  </div>
                  <p className="text-sm text-muted-foreground">Verified Caregiver</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Profile Completion</span>
                  <span className="text-foreground font-medium">{caregiver.completion}%</span>
                </div>
                <Progress value={caregiver.completion} className="h-2" />
              </div>
              <Button variant="outline" className="w-full">Edit Profile</Button>
            </div>
            {/* Uploaded Documents */}
            <div className="bg-card rounded-xl p-6 card-shadow">
              <h3 className="font-bold text-foreground mb-4">Uploaded Documents</h3>
              <div className="space-y-3">
                {(Array.isArray(documents) ? documents : []).map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors group">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <button
                        onClick={() => handleDownloadDocument(doc.name)}
                        className="p-1.5 bg-primary/10 rounded hover:bg-primary/20 transition-colors"
                        aria-label="Download document"
                      >
                        <Download className="w-4 h-4 text-primary" />
                      </button>
                      <span className="text-sm font-medium text-foreground truncate">{doc.name}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      {doc.verified && <CheckCircle2 className="w-4 h-4 text-success" />}
                      <button
                        onClick={() => handleRemoveDocument(doc.name)}
                        className="p-1 rounded hover:bg-coral/10 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove document"
                      >
                        <X className="w-4 h-4 text-coral" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Jobs Section */}
        <div className="bg-card rounded-xl p-6 card-shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Recent Jobs Posted</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewAllJobs}
            >
              View All Jobs
            </Button>
          </div>
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search recent jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="elderly">Elderly Care</SelectItem>
                <SelectItem value="child">Child Care</SelectItem>
                <SelectItem value="medical">Medical Care</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <MapPin className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="delhi">Delhi NCR</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Job Cards */}
          <div className="space-y-4">
            {(Array.isArray(filteredJobs) ? filteredJobs : []).map((job) => (
              <div key={job.id} className="p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-all hover:shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{job.family}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                      <span>Posted {job.postedDate}</span>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-primary">{job.rate}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{job.description}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-initial"
                    onClick={() => navigate(`/family/booking/${caregiver.id}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 sm:flex-initial"
                    onClick={() => navigate(`/family/payment/${caregiver.id}`)}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverDashboard;
