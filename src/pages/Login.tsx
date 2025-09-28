import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Eye, EyeOff } from 'lucide-react';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
  };
  return <div className="min-h-screen bg-background flex items-center justify-center section-padding">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          
        </div>

        <Card className="shadow-[var(--shadow-hover)]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-poppins">Welcome Back to Sahaay</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={formData.password} onChange={handleInputChange} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full btn-hero">
                Login
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

            <div className="text-center space-y-2">
              <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
                Forgot Password?
              </Link>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  Create an Account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Login;