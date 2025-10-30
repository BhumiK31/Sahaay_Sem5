import { useState, useEffect } from "react";
import { Eye, FileText, Star, Calendar, CheckCircle2, Download, X, Search, MapPin, Filter } from "lucide-react";
import StatCard from "@/components/caregiver/StatCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const FamilyDashboard = () => {
  const [isHiring, setIsHiring] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const navigate = useNavigate();

  // 🔹 Get logged-in user info from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user?.name || "Guest";

  // 🔹 Redirect if user not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  
  const weeklyData = [
    { day: "Mon", hours: 6 },
    { day: "Tue", hours: 7 },
    { day: "Wed", hours: 5 },
    { day: "Thu", hours: 8 },
    { day: "Fri", hours: 6 },
    { day: "Sat", hours: 9 },
    { day: "Sun", hours: 4 },
  ];
  
  const maxHours = Math.max(...weeklyData.map(d => d.hours));
  
  const recentApplicants = [
    { name: "Priya Kumar", rating: 4.8, experience: "5 years", status: "Under Review" },
    { name: "Ravi Sharma", rating: 4.9, experience: "7 years", status: "Interview" },
    { name: "Meena Patel", rating: 4.7, experience: "4 years", status: "Hired" },
  ];
  
  const [documents, setDocuments] = useState([
    { name: "Care Requirements.pdf", verified: true },
    { name: "Medical History.pdf", verified: true },
    { name: "House Guidelines.pdf", verified: true },
  ]);

  const recentCaregivers = [
    { id: 1, name: "Ananya Sharma", photo: "AS", rating: 4.9, experience: "8 years", skills: ["Elderly Care", "Mobility Assistance"], location: "Mumbai, Maharashtra", rate: "₹15,000/month", availability: "Available Now" },
    { id: 2, name: "Rajesh Kumar", photo: "RK", rating: 4.8, experience: "6 years", skills: ["Post-Surgery Care", "Medical Support"], location: "Bangalore, Karnataka", rate: "₹18,000/month", availability: "Available Now" },
    { id: 3, name: "Meera Patel", photo: "MP", rating: 4.7, experience: "5 years", skills: ["Dementia Care", "Memory Support"], location: "Delhi NCR", rate: "₹16,500/month", availability: "Busy till Oct 15" },
  ];

  const handleDownloadDocument = (docName: string) => {
    console.log("Downloading:", docName);
  };

  const handleRemoveDocument = (docName: string) => {
    setDocuments(documents.filter(doc => doc.name !== docName));
  };

  const filteredCaregivers = recentCaregivers.filter(caregiver => {
    const matchesSearch = caregiver.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         caregiver.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {userName}!</h1>
            <p className="text-muted-foreground">Manage your caregiving needs and connections.</p>
          </div>
          
          <button
            onClick={() => setIsHiring(!isHiring)}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
              isHiring
                ? "bg-success text-success-foreground shadow-lg"
                : "bg-coral text-coral-foreground shadow-lg"
            }`}
          >
            <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
            {isHiring ? "Open to Hiring" : "Not Hiring"}
          </button>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Eye}
            title="Caregivers Viewed"
            value={16}
            description="Total caregivers browsed"
          />
          <StatCard
            icon={FileText}
            title="Applications Received"
            value={9}
            description="From interested caregivers"
          />
          <StatCard
            icon={Star}
            title="Ongoing Caregivers"
            value={3}
            description="Currently providing care"
          />
          <StatCard
            icon={Calendar}
            title="Interviews Scheduled"
            value={4}
            description="Upcoming interviews"
          />
        </div>
        
        {/* Weekly Care Overview & Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Care Overview */}
          <div className="lg:col-span-2 bg-card rounded-xl p-6 card-shadow">
            <h2 className="text-xl font-bold text-foreground mb-4">Weekly Care Overview</h2>
            
            <div className="flex gap-4 mb-6">
              <div className="flex-1 bg-secondary rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Today</p>
                <p className="text-2xl font-bold text-foreground">₹1,200</p>
              </div>
              <div className="flex-1 bg-primary/10 rounded-lg p-4 border-2 border-primary">
                <p className="text-sm text-muted-foreground mb-1">This Week</p>
                <p className="text-2xl font-bold text-primary">₹8,600</p>
              </div>
              <div className="flex-1 bg-secondary rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">This Month</p>
                <p className="text-2xl font-bold text-foreground">₹33,000</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground w-10">{day.day}</span>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        day.hours === maxHours
                          ? "bg-success"
                          : day.hours === Math.min(...weeklyData.map(d => d.hours))
                          ? "bg-coral"
                          : "bg-primary"
                      }`}
                      style={{ width: `${(day.hours / maxHours) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-foreground w-20 text-right">{day.hours} hrs</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="px-3 py-1 bg-success/10 text-success text-sm rounded-full flex items-center gap-1">
                <span className="w-2 h-2 bg-success rounded-full"></span>
                Most Care Hours: Saturday • 9 hrs
              </span>
              <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">
                Daily Average: 5.8 hrs/day
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              Steady progress! Consistent caregiver engagement this week.
            </p>
          </div>
          
          {/* Profile & Right Cards */}
          <div className="space-y-6">
            {/* Family Profile Card */}
            <div className="bg-card rounded-xl p-6 card-shadow">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">SJ</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground">{userName}</h3>
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  </div>
                  <p className="text-sm text-muted-foreground">Verified Family</p>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Profile Completion</span>
                  <span className="text-foreground font-medium">90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              
              <Button variant="outline" className="w-full">Edit Family Profile</Button>
            </div>
            
            {/* Recent Applications */}
            <div className="bg-card rounded-xl p-6 card-shadow">
              <h3 className="font-bold text-foreground mb-4">Applications Summary</h3>
              <div className="space-y-3">
                {recentApplicants.map((applicant, index) => (
                  <div key={index} className="p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-foreground">{applicant.name}</p>
                        <p className="text-xs text-muted-foreground">{applicant.experience} experience</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-3 h-3 text-primary fill-primary" />
                        <span className="font-medium">{applicant.rating}</span>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {applicant.status}
                    </span>
                  </div>
                ))}
              </div>
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

        {/* Recent Caregivers Section */}
        <div className="bg-card rounded-xl p-6 card-shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Recent Caregivers Applied</h2>
            <Button variant="outline" size="sm" onClick={() => navigate("/family/find-caregiver")}>View All Caregivers</Button>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search for caregivers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="elderly">Elderly Care</SelectItem>
                <SelectItem value="medical">Medical Support</SelectItem>
                <SelectItem value="dementia">Dementia Care</SelectItem>
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

          {/* Caregiver Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCaregivers.map((caregiver) => (
              <div key={caregiver.id} className="p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-all hover:shadow-md">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">{caregiver.photo}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground truncate">{caregiver.name}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                      <span className="font-medium">{caregiver.rating}</span>
                      <span className="text-muted-foreground">• {caregiver.experience}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {caregiver.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
                  ))}
                </div>

                <div className="space-y-2 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{caregiver.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">{caregiver.rate}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      caregiver.availability === "Available Now" 
                        ? "bg-success/10 text-success" 
                        : "bg-coral/10 text-coral"
                    }`}>
                      {caregiver.availability}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate("/BookingDetails")}>View Profile</Button>
                  <Button size="sm" className="flex-1" onClick={() => navigate("/payment")}>Book Now</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyDashboard;
