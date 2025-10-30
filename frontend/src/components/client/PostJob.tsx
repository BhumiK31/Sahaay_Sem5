import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Calendar, MapPin, DollarSign, Clock, Plus, X } from 'lucide-react';

export function PostJob() {
  const [jobType, setJobType] = useState('');
  const [requirements, setRequirements] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<string[]>([]);

  const requirementOptions = [
    'CPR Certified',
    'First Aid Certified',
    'Background Check',
    'References Required',
    'Own Transportation',
    'Non-Smoker',
    'Pet Friendly',
    'Experience with Special Needs',
    'Bilingual (Spanish)',
    'College Degree',
  ];

  const scheduleOptions = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const toggleRequirement = (requirement: string) => {
    setRequirements(prev => 
      prev.includes(requirement)
        ? prev.filter(r => r !== requirement)
        : [...prev, requirement]
    );
  };

  const toggleScheduleDay = (day: string) => {
    setSchedule(prev => 
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Post a New Job</CardTitle>
          <p className="text-sm text-gray-600">
            Create a detailed job posting to attract the best caregivers for your family.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title *</Label>
              <Input 
                id="job-title"
                placeholder="e.g., Part-time Babysitter for 2 Kids"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="job-type">Service Type *</Label>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="babysitting">Babysitting</SelectItem>
                  <SelectItem value="elderly-care">Elderly Care</SelectItem>
                  <SelectItem value="housekeeping">Housekeeping</SelectItem>
                  <SelectItem value="pet-care">Pet Care</SelectItem>
                  <SelectItem value="tutoring">Tutoring</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea 
              id="description"
              placeholder="Describe your family's needs, children's ages, daily routine, and what you're looking for in a caregiver..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input 
                  id="location"
                  placeholder="Brooklyn, NY"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate-min">Pay Rate *</Label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input 
                    id="rate-min"
                    placeholder="18"
                    className="pl-10"
                  />
                </div>
                <span className="flex items-center text-gray-500">to</span>
                <div className="relative flex-1">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input 
                    placeholder="25"
                    className="pl-10"
                  />
                </div>
                <span className="flex items-center text-gray-500">/hour</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input 
                  id="start-date"
                  type="date"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Weekly Schedule *</Label>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
              {scheduleOptions.map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox 
                    id={day}
                    checked={schedule.includes(day)}
                    onCheckedChange={() => toggleScheduleDay(day)}
                  />
                  <Label htmlFor={day} className="text-sm">{day.slice(0, 3)}</Label>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input 
                    id="start-time"
                    type="time"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input 
                    id="end-time"
                    type="time"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Requirements &amp; Preferences</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {requirementOptions.map((requirement) => (
                <div key={requirement} className="flex items-center space-x-2">
                  <Checkbox 
                    id={requirement}
                    checked={requirements.includes(requirement)}
                    onCheckedChange={() => toggleRequirement(requirement)}
                  />
                  <Label htmlFor={requirement} className="text-sm">{requirement}</Label>
                </div>
              ))}
            </div>
            
            {requirements.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {requirements.map((requirement) => (
                  <Badge key={requirement} variant="secondary" className="flex items-center gap-1">
                    {requirement}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-500" 
                      onClick={() => toggleRequirement(requirement)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional-info">Additional Information</Label>
            <Textarea 
              id="additional-info"
              placeholder="Any other details about your family, home, pets, special instructions, etc."
              rows={3}
            />
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline">Save as Draft</Button>
            <div className="space-x-2">
              <Button variant="outline">Preview</Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Post Job
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}