import { useState } from 'react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Users, UserCheck } from 'lucide-react';
import { Logo } from './components/Logo';

// Job Seeker Dashboard Components
import { DashboardHeader } from './components/DashboardHeader';
import { JobSearch } from './components/JobSearch';
import { QuickStats } from './components/QuickStats';
import { RecentJobs } from './components/RecentJobs';
import { ApplicationStatus } from './components/ApplicationStatus';
import { MessageCenter } from './components/MessageCenter';
import { ProfileSidebar } from './components/ProfileSidebar';

// Client Dashboard Components
import { ClientDashboardHeader } from './components/client/ClientDashboardHeader';
import { ClientStats } from './components/client/ClientStats';
import { PostJob } from './components/client/PostJob';
import { ManageJobs } from './components/client/ManageJobs';
import { BrowseCaregivers } from './components/client/BrowseCaregivers';
import { ReviewApplicants } from './components/client/ReviewApplicants';
import { ClientMessageCenter } from './components/client/ClientMessageCenter';
import { ClientProfileSidebar } from './components/client/ClientProfileSidebar';
import { CaregiverAcceptanceProcedure } from './components/client/CaregiverAcceptanceProcedure';

export default function App() {
  const [userType, setUserType] = useState<'seeker' | 'client'>('seeker');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Logo configuration - Replace with your own logo URL
  const logoConfig = {
    // Add your logo URL here (SVG, PNG, or JPG)
    // Example: logoUrl: '/path/to/your/logo.svg'
    // Example: logoUrl: 'https://your-domain.com/logo.png'
    logoUrl: undefined, // Set to your logo URL
    alt: 'Sahaay Logo',
    fallbackText: 'Sahaay'
  };

  const toggleUserType = () => {
    setUserType(userType === 'seeker' ? 'client' : 'seeker');
    setActiveTab('dashboard');
  };

  if (userType === 'client') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-full mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Logo 
                logoUrl={logoConfig.logoUrl}
                alt={logoConfig.alt}
                fallbackText={logoConfig.fallbackText}
                size="md"
              />
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                Family Dashboard
              </Badge>
            </div>
            <Button onClick={toggleUserType} variant="outline">
              <UserCheck className="w-4 h-4 mr-2" />
              Switch to Caregiver View
            </Button>
          </div>
        </div>

        <ClientDashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {activeTab === 'dashboard' && (
                <>
                  <ClientStats />
                  <ManageJobs />
                  <ReviewApplicants />
                </>
              )}
              {activeTab === 'post-job' && <PostJob />}
              {activeTab === 'jobs' && <ManageJobs />}
              {activeTab === 'caregivers' && <BrowseCaregivers />}
              {activeTab === 'applicants' && <ReviewApplicants />}
              {activeTab === 'procedure' && <CaregiverAcceptanceProcedure />}
              {activeTab === 'messages' && <ClientMessageCenter />}
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ClientProfileSidebar />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-full mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Logo 
              logoUrl={logoConfig.logoUrl}
              alt={logoConfig.alt}
              fallbackText={logoConfig.fallbackText}
              size="md"
            />
            <Badge variant="outline" className="bg-green-100 text-green-700">
              Caregiver Dashboard
            </Badge>
          </div>
          <Button onClick={toggleUserType} variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Switch to Family View
          </Button>
        </div>
      </div>

      <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {activeTab === 'dashboard' && (
              <>
                <QuickStats />
                <JobSearch />
                <RecentJobs />
                <ApplicationStatus />
              </>
            )}
            {activeTab === 'jobs' && <JobSearch />}
            {activeTab === 'applications' && <ApplicationStatus />}
            {activeTab === 'messages' && <MessageCenter />}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}