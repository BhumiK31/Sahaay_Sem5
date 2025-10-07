import { Search, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const FindCaregiver = () => {
  const caregivers = [
    {
      id: 1,
      name: "Priya Kumar",
      rating: 4.8,
      reviews: 42,
      experience: "5 years",
      skills: ["Elderly Care", "Medical Support", "Mobility Assistance"],
      location: "Mumbai, Maharashtra",
      rate: "₹500/hour",
      available: true
    },
    {
      id: 2,
      name: "Ravi Sharma",
      rating: 4.9,
      reviews: 67,
      experience: "7 years",
      skills: ["Nursing", "Post-Surgery Care", "Medication Management"],
      location: "Delhi, NCR",
      rate: "₹600/hour",
      available: false,
      availableFrom: "Oct 15"
    },
    {
      id: 3,
      name: "Meena Patel",
      rating: 4.7,
      reviews: 38,
      experience: "4 years",
      skills: ["Child Care", "Elderly Care", "Meal Preparation"],
      location: "Bangalore, Karnataka",
      rate: "₹450/hour",
      available: true
    },
    {
      id: 4,
      name: "Ananya Reddy",
      rating: 4.9,
      reviews: 55,
      experience: "6 years",
      skills: ["Dementia Care", "Physical Therapy", "Companionship"],
      location: "Pune, Maharashtra",
      rate: "₹550/hour",
      available: true
    },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find a Caregiver</h1>
          <p className="text-muted-foreground">Connect with qualified caregivers for your loved ones</p>
        </div>
        
        {/* Search & Filters */}
        <div className="bg-card rounded-xl p-6 card-shadow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search for caregivers..."
                className="pl-10 h-11 rounded-lg"
              />
            </div>
            <select className="h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Services</option>
              <option>Elderly Care</option>
              <option>Medical Care</option>
              <option>Companionship</option>
            </select>
            <select className="h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Locations</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
            </select>
          </div>
          <p className="text-sm text-muted-foreground mt-3">Filters apply to results below.</p>
        </div>
        
        {/* Caregiver Cards */}
        <div className="space-y-4 mb-6">
          {caregivers.map((caregiver) => (
            <div key={caregiver.id} className="bg-card rounded-xl p-6 card-shadow card-lift">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      {caregiver.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{caregiver.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-primary fill-primary" />
                            <span className="font-medium text-foreground">{caregiver.rating}</span>
                            <span>({caregiver.reviews} reviews)</span>
                          </span>
                          <span>•</span>
                          <span>{caregiver.experience}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {caregiver.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {caregiver.location}
                      </span>
                      <span className="text-lg font-bold text-primary">{caregiver.rate}</span>
                      {caregiver.available ? (
                        <span className="px-3 py-1 bg-success/10 text-success rounded-full font-medium">
                          Available Now
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-coral/10 text-coral rounded-full font-medium">
                          Busy till {caregiver.availableFrom}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex lg:flex-col gap-2 lg:min-w-[140px]">
                  <Button variant="outline" className="flex-1 lg:flex-none rounded-lg">
                    View Profile
                  </Button>
                  <Button className="flex-1 lg:flex-none rounded-lg bg-primary hover:bg-primary/90">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" className="rounded-lg">
            View All Caregivers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FindCaregiver;
