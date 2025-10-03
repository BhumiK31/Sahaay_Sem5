import { Card, CardContent } from '../ui/card';
import { Briefcase, Users, Calendar, DollarSign } from 'lucide-react';

export function ClientStats() {
  const stats = [
    {
      label: 'Active Job Posts',
      value: '3',
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Total Applicants',
      value: '24',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Interviews Scheduled',
      value: '5',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: 'This Month Spent',
      value: '$2,450',
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}