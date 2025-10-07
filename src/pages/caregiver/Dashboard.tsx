import { useState } from "react";
import { Briefcase, Eye, MessageSquare, Star, Download, CheckCircle2, X, Search, MapPin, Filter } from "lucide-react";
import StatCard from "@/components/caregiver/StatCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CaregiverDashboard = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  
  const weeklyEarnings = [
    { day: "Mon", amount: 900 },
    { day: "Tue", amount: 1100 },
    { day: "Wed", amount: 1000 },
    { day: "Thu", amount: 1200 },
    { day: "Fri", amount: 1000 },
    { day: "Sat", amount: 1400 },
    { day: "Sun", amount: 600 },
  ];
  
  const maxEarning = Math.max(...weeklyEarnings.map(d => d.amount));
  
  const [documents, setDocuments] = useState([
    { name: "Nursing Certificate.pdf", verified: true },
    { name: "Background Check.pdf", verified: true },
    { name: "Insurance Document.pdf", verified: true },
  ]);

  const recentJobs = [
    { id: 1, family: "Sharma Family", location: "Mumbai, Maharashtra", postedDate: "2 days ago", rate: "₹15,000/month", description: "Looking for experienced caregiver for elderly parent with mobility assistance needs." },
    { id: 2, family: "Patel Family", location: "Bangalore, Karnataka", postedDate: "3 days ago", rate: "₹18,000/month", description: "Need caring professional for post-surgery care and daily living support." },
    { id: 3, family: "Kumar Family", location: "Delhi NCR", postedDate: "5 days ago", rate: "₹20,000/month", description: "Seeking compassionate caregiver for dementia patient with experience in memory care." },
  ];

  const handleDownloadDocument = (docName: string) => {
    console.log("Downloading:", docName);
  };

  const handleRemoveDocument = (docName: string) => {
    setDocuments(documents.filter(doc => doc.name !== docName));
  };

  const filteredJobs = recentJobs.filter(job => {
    const matchesSearch = job.family.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Ananya!</h1>
            <p className="text-muted-foreground">Here's what's happening with your caregiving profile today.</p>
          </div>
          
          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
              isAvailable
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
          <StatCard
            icon={Briefcase}
            title="Jobs Applied"
            value={18}
            description="Total job applications sent"
          />
          <StatCard
            icon={Eye}
            title="Profile Views"
            value={24}
            description="Families who viewed your profile"
          />
          <StatCard
            icon={MessageSquare}
            title="Interviews"
            value={5}
            description="Interviews scheduled"
          />
          <StatCard
            icon={Star}
            title="Hired"
            value={3}
            description="Active caregiving roles"
          />
        </div>
        
        {/* Weekly Earnings & Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Earnings */}
          <div className="lg:col-span-2 bg-card rounded-xl p-6 card-shadow">
            <h2 className="text-xl font-bold text-foreground mb-4">Weekly Earnings Overview</h2>
            
            <div className="flex gap-4 mb-6">
              <div className="flex-1 bg-secondary rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Today</p>
                <p className="text-2xl font-bold text-foreground">₹1,000</p>
              </div>
              <div className="flex-1 bg-primary/10 rounded-lg p-4 border-2 border-primary">
                <p className="text-sm text-muted-foreground mb-1">This Week</p>
                <p className="text-2xl font-bold text-primary">₹7,200</p>
              </div>
              <div className="flex-1 bg-secondary rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">This Month</p>
                <p className="text-2xl font-bold text-foreground">₹28,500</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {weeklyEarnings.map((day, index) => (
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
                    <h3 className="font-bold text-foreground">Ananya Sharma</h3>
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  </div>
                  <p className="text-sm text-muted-foreground">Verified Caregiver</p>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Profile Completion</span>
                  <span className="text-foreground font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <Button variant="outline" className="w-full">Edit Profile</Button>
            </div>
            
            {/* Uploaded Documents */}
            <div className="bg-card rounded-xl p-6 card-shadow">
              <h3 className="font-bold text-foreground mb-4">Uploaded Documents</h3>
              <div className="space-y-3">
                {documents.map((doc, index) => (
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
            <Button variant="outline" size="sm">View All Jobs</Button>
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
            {filteredJobs.map((job) => (
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
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">View Details</Button>
                  <Button size="sm" className="flex-1 sm:flex-initial">Apply Now</Button>
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
