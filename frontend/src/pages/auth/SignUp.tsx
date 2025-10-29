import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Users, HelpingHand } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userRole, setUserRole] = useState<'family' | 'student'>('family');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: userRole }),
      });
      
      const result = await response.json();
      console.log('Signup response:', result); // Debug log
      
      if (response.ok) {
        // FIX: Properly store token and user data
        if (result.token) {
          localStorage.setItem('token', result.token);
          console.log('Token stored:', result.token);
        }
        
        if (result.user) {
          // Make sure user data is properly stringified
          const userDataToStore = {
            id: result.user.id || result.user._id,
            email: result.user.email,
            name: result.user.name,
            role: result.user.role || userRole,
            ...result.user
          };
          localStorage.setItem('user', JSON.stringify(userDataToStore));
          console.log('User data stored:', userDataToStore);
        }
        
        alert('Account created successfully! Please check your email for verification.');
        
        // Navigate to email verification with user data
        navigate('/email-verification', { 
          state: { 
            email: formData.email, 
            userRole: userRole 
          } 
        });
      } else {
        alert(`Signup failed: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center section-padding">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-xl font-bold">SAHAAY</h2>
          </div>
        </div>
        <Card className="shadow-[var(--shadow-hover)]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-poppins">Join the Sahaay Community 🤝</CardTitle>
            <CardDescription>
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">I am here to:</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserRole('family')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    userRole === 'family'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Users className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">I need help</div>
                  <div className="text-xs text-muted-foreground">Find support & care (Family)</div>
                </button>
                <button
                  type="button"
                  onClick={() => setUserRole('student')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    userRole === 'student'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <HelpingHand className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">I want to help</div>
                  <div className="text-xs text-muted-foreground">Offer support & care (Student)</div>
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full btn-hero">
                Sign Up
              </Button>
            </form>
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full">
                Continue with Apple
              </Button>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
