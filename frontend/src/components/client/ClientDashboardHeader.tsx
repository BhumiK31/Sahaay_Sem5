import { Bell, MessageSquare, User, Plus, Briefcase, Users, FileText, CheckSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface ClientDashboardHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function ClientDashboardHeader({ activeTab, setActiveTab }: ClientDashboardHeaderProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Briefcase },
    { id: 'post-job', label: 'Post Job', icon: Plus },
    { id: 'jobs', label: 'My Jobs', icon: FileText },
    { id: 'caregivers', label: 'Browse Caregivers', icon: Users },
    { id: 'applicants', label: 'Review Applicants', icon: User },
    { id: 'procedure', label: 'Hiring Process', icon: CheckSquare },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <nav className="flex space-x-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.id === 'messages' && (
                    <Badge variant="destructive" className="ml-1">2</Badge>
                  )}
                  {tab.id === 'applicants' && (
                    <Badge className="ml-1 bg-purple-500">8</Badge>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full bg-red-500 text-white">
                3
              </Badge>
            </Button>
            
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm">Michael Johnson</p>
                <p className="text-xs text-gray-500">Family Account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}