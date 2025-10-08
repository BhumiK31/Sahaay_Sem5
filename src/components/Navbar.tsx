import { Bell, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  
  // Auto-detect current view based on route
  const currentView = location.pathname.startsWith("/family") ? "family" : "caregiver";
  
  const caregiverLinks = [
    { label: "Dashboard", path: "/caregiver/dashboard" },
    { label: "Find Jobs", path: "/caregiver/find-jobs" },
    { label: "My Applications", path: "/caregiver/applications" },
  ];
  
  const familyLinks = [
    { label: "Dashboard", path: "/family/dashboard" },
    { label: "Find a Caregiver", path: "/family/find-caregiver" },
    { label: "Applications Accepted", path: "/family/applications" },
  ];
  
  const links = currentView === "caregiver" ? caregiverLinks : familyLinks;
  
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 card-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
              <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-2xl font-bold text-foreground">Sahaay</span>
          </Link>
          
          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-coral rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
