import { Bell, MessageSquare, User, Search, FileText, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface DashboardHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function DashboardHeader({ activeTab, setActiveTab }: DashboardHeaderProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'jobs', label: 'Find Jobs', icon: Search },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <h1 className="text-2xl text-blue-600">Sahaay</h1>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {tab.id === 'messages' && (
                      <Badge variant="destructive" className="ml-1">3</Badge>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full bg-red-500 text-white">
                5
              </Badge>
            </Button>
            
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b372?w=40&h=40&fit=crop&crop=face" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm">Sarah Anderson</p>
                <p className="text-xs text-gray-500">Caregiver</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}