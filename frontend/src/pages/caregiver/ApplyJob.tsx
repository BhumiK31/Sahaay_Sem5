import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload, CheckCircle } from 'lucide-react';

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    coverLetter: '',
    availability: '',
    hourlyRate: '',
    experience: '',
    resume: null as File | null,
    certifications: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  // UPDATED: Actual backend API call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      coverLetter: formData.coverLetter,
      experience: formData.experience,
      availability: formData.availability,
      proposedRate: formData.hourlyRate,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/jobs/caregiver/apply/${jobId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      setIsSubmitting(false);
      alert("Failed to submit: " + (err as Error).message);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Application Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Your application has been sent successfully. The family will review it and get back to you soon.
            </p>
            <div className="space-y-2">
              <Button 
                className="w-full"
                onClick={() => navigate('/caregiver/applications')}
              >
                View My Applications
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/caregiver/dashboard')}
              >
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-semibold">Apply for Job</h1>
              <p className="text-muted-foreground">Job ID: #{jobId}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Job Application</CardTitle>
            <CardDescription>
              Tell the family why you're the perfect fit for this caregiving role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Cover Letter */}
              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter *</Label>
                <Textarea
                  id="coverLetter"
                  value={formData.coverLetter}
                  onChange={e => handleInputChange('coverLetter', e.target.value)}
                  placeholder="Introduce yourself and explain why you're interested in this position..."
                  rows={5}
                  required
                />
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <Label htmlFor="experience">Relevant Experience *</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={e => handleInputChange('experience', e.target.value)}
                  placeholder="Describe your experience in caregiving..."
                  rows={4}
                  required
                />
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <Label htmlFor="availability">Your Availability *</Label>
                <Textarea
                  id="availability"
                  value={formData.availability}
                  onChange={e => handleInputChange('availability', e.target.value)}
                  placeholder="When are you available? (days, hours, flexibility...)"
                  rows={3}
                  required
                />
              </div>

              {/* Hourly Rate */}
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Expected Rate (Optional)</Label>
                <Input
                  id="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={e => handleInputChange('hourlyRate', e.target.value)}
                  placeholder="₹400/hour"
                />
              </div>

              {/* Resume Upload */}
              <div className="space-y-2">
                <Label>Resume/CV (Optional)</Label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={e => handleFileChange('resume', e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('resume')?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Resume
                  </Button>
                  {formData.resume && (
                    <span className="text-sm text-muted-foreground">
                      {formData.resume.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Certifications Upload */}
              <div className="space-y-2">
                <Label>Certifications (Optional)</Label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    id="certifications"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={e => handleFileChange('certifications', e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('certifications')?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Certificates
                  </Button>
                  {formData.certifications && (
                    <span className="text-sm text-muted-foreground">
                      {formData.certifications.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.coverLetter || !formData.experience || !formData.availability}
                  className="flex-1"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplyJob;
