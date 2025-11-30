import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import { useState } from 'react';

interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  required: boolean;
  completed: boolean;
}

export function HiringChecklist() {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    // Application Review
    { id: '1', category: 'Application Review', item: 'Review resume and experience', required: true, completed: true },
    { id: '2', category: 'Application Review', item: 'Verify service type matches your needs', required: true, completed: true },
    { id: '3', category: 'Application Review', item: 'Check rate expectations alignment', required: true, completed: false },
    { id: '4', category: 'Application Review', item: 'Review available schedule', required: true, completed: true },
    
    // Background Verification
    { id: '5', category: 'Background Verification', item: 'Verify background check completion', required: true, completed: false },
    { id: '6', category: 'Background Verification', item: 'Check CPR certification (if required)', required: true, completed: false },
    { id: '7', category: 'Background Verification', item: 'Verify First Aid certification', required: false, completed: false },
    { id: '8', category: 'Background Verification', item: 'Confirm identity verification', required: true, completed: false },
    
    // Initial Communication
    { id: '9', category: 'Initial Communication', item: 'Send introductory message', required: true, completed: false },
    { id: '10', category: 'Initial Communication', item: 'Ask about specific experience', required: true, completed: false },
    { id: '11', category: 'Initial Communication', item: 'Discuss family needs and expectations', required: true, completed: false },
    
    // Screening Interview
    { id: '12', category: 'Screening Interview', item: 'Schedule phone/video screening', required: true, completed: false },
    { id: '13', category: 'Screening Interview', item: 'Prepare interview questions', required: true, completed: false },
    { id: '14', category: 'Screening Interview', item: 'Assess communication skills', required: true, completed: false },
    { id: '15', category: 'Screening Interview', item: 'Discuss availability in detail', required: true, completed: false },
    
    // In-Person Meeting
    { id: '16', category: 'In-Person Meeting', item: 'Schedule in-person interview', required: true, completed: false },
    { id: '17', category: 'In-Person Meeting', item: 'Meet with care recipient', required: true, completed: false },
    { id: '18', category: 'In-Person Meeting', item: 'Tour relevant areas of home', required: false, completed: false },
    { id: '19', category: 'In-Person Meeting', item: 'Observe interaction with family', required: true, completed: false },
    
    // Reference Check
    { id: '20', category: 'Reference Check', item: 'Contact at least 2 references', required: true, completed: false },
    { id: '21', category: 'Reference Check', item: 'Verify previous employment', required: true, completed: false },
    { id: '22', category: 'Reference Check', item: 'Ask about reliability and performance', required: true, completed: false },
    
    // Final Steps
    { id: '23', category: 'Final Steps', item: 'Agree on trial period terms', required: false, completed: false },
    { id: '24', category: 'Final Steps', item: 'Prepare employment contract', required: true, completed: false },
    { id: '25', category: 'Final Steps', item: 'Set up payment method', required: true, completed: false },
    { id: '26', category: 'Final Steps', item: 'Exchange emergency contact info', required: true, completed: false },
  ]);

  const toggleItem = (id: string) => {
    setChecklistItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const categories = Array.from(new Set(checklistItems.map(item => item.category)));
  
  const getCompletionStats = () => {
    const total = checklistItems.length;
    const completed = checklistItems.filter(item => item.completed).length;
    const requiredTotal = checklistItems.filter(item => item.required).length;
    const requiredCompleted = checklistItems.filter(item => item.required && item.completed).length;
    
    return {
      total,
      completed,
      requiredTotal,
      requiredCompleted,
      percentage: Math.round((completed / total) * 100),
      requiredPercentage: Math.round((requiredCompleted / requiredTotal) * 100)
    };
  };

  const stats = getCompletionStats();

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Hiring Progress Checklist</CardTitle>
          <p className="text-sm text-gray-600">
            Track your progress through the caregiver evaluation and hiring process.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl mb-1">{stats.completed}/{stats.total}</p>
              <p className="text-sm text-gray-600">Total Items</p>
              <Progress value={stats.percentage} className="h-2 mt-2" />
            </div>
            <div className="text-center">
              <p className="text-2xl mb-1 text-red-600">{stats.requiredCompleted}/{stats.requiredTotal}</p>
              <p className="text-sm text-gray-600">Required Items</p>
              <Progress value={stats.requiredPercentage} className="h-2 mt-2" />
            </div>
            <div className="text-center">
              <Badge className={`text-lg py-2 px-4 ${
                stats.requiredCompleted === stats.requiredTotal 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {stats.requiredCompleted === stats.requiredTotal ? 'Ready to Hire' : 'In Progress'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checklist by Category */}
      {categories.map((category) => {
        const categoryItems = checklistItems.filter(item => item.category === category);
        const completedInCategory = categoryItems.filter(item => item.completed).length;
        
        return (
          <Card key={category}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{category}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">
                    {completedInCategory}/{categoryItems.length}
                  </Badge>
                  {completedInCategory === categoryItems.length && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoryItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between space-x-3">
                    <div className="flex items-center space-x-3 flex-1">
                      <Checkbox 
                        checked={item.completed}
                        onCheckedChange={() => toggleItem(item.id)}
                      />
                      <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : ''}`}>
                        {item.item}
                      </span>
                      {item.required && (
                        <Badge variant="outline" className="text-xs bg-red-50 text-red-600 border-red-200">
                          Required
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {stats.requiredCompleted !== stats.requiredTotal && (
                <div className="flex items-center space-x-2 text-yellow-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">Complete required items before hiring</span>
                </div>
              )}
              {stats.requiredCompleted === stats.requiredTotal && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">All required steps completed</span>
                </div>
              )}
            </div>
            <div className="space-x-2">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Export Checklist
              </Button>
              {stats.requiredCompleted === stats.requiredTotal && (
                <Button>
                  Proceed to Hire
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}