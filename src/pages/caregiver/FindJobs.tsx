import { Search, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FindJobs = () => {
  const jobs = [
    {
      id: 1,
      family: "Johnson Family",
      location: "Mumbai, Maharashtra",
      posted: "2 days ago",
      rate: "₹500/hour",
      description: "Looking for an experienced caregiver for elderly parent with mobility assistance needs.",
      type: "Full-time"
    },
    {
      id: 2,
      family: "Patel Family",
      location: "Delhi, NCR",
      posted: "5 days ago",
      rate: "₹450/hour",
      description: "Need compassionate caregiver for elderly mother, daily activities support required.",
      type: "Part-time"
    },
    {
      id: 3,
      family: "Kumar Family",
      location: "Bangalore, Karnataka",
      posted: "1 week ago",
      rate: "₹600/hour",
      description: "Seeking professional nurse for post-surgery care, medical background preferred.",
      type: "Full-time"
    },
    {
      id: 4,
      family: "Sharma Family",
      location: "Pune, Maharashtra",
      posted: "3 days ago",
      rate: "₹400/hour",
      description: "Looking for weekend caregiver for elderly grandparent, light housekeeping included.",
      type: "Weekend"
    },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Jobs</h1>
          <p className="text-muted-foreground">Discover caregiving opportunities that match your skills</p>
        </div>
        
        {/* Search & Filters */}
        <div className="bg-card rounded-xl p-6 card-shadow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search recent jobs..."
                className="pl-10 h-11 rounded-lg"
              />
            </div>
            <select className="h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Categories</option>
              <option>Elderly Care</option>
              <option>Child Care</option>
              <option>Medical Care</option>
            </select>
            <select className="h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Locations</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
            </select>
          </div>
        </div>
        
        {/* Job Cards */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-card rounded-xl p-6 card-shadow card-lift">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{job.family}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span>•</span>
                        <span>{job.posted}</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {job.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-foreground mb-4 line-clamp-2">{job.description}</p>
                  
                  <div className="flex items-center gap-2 text-lg font-bold text-primary">
                    <DollarSign className="w-5 h-5" />
                    {job.rate}
                  </div>
                </div>
                
                <div className="flex lg:flex-col gap-2 lg:min-w-[140px]">
                  <Button variant="outline" className="flex-1 lg:flex-none rounded-lg">
                    View Details
                  </Button>
                  <Button className="flex-1 lg:flex-none rounded-lg bg-primary hover:bg-primary/90">
                    Apply
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

export default FindJobs;
