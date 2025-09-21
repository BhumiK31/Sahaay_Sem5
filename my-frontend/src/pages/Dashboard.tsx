import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, User, Settings, LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Simulate logout - in real app would clear auth tokens
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-primary">Sahaay</h1>
              <span className="text-muted-foreground">Dashboard</span>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="rounded-2xl"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome to your Dashboard! 🎉</h2>
            <p className="text-muted-foreground">
              Your profile has been successfully set up. This is where your personalized dashboard would be.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-feature">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Quick action buttons would appear here based on user type
                </p>
              </CardContent>
            </Card>

            <Card className="card-feature">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Profile
                </CardTitle>
                <CardDescription>
                  Manage your profile and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Profile management options would be here
                </p>
              </CardContent>
            </Card>

            <Card className="card-feature">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Settings
                </CardTitle>
                <CardDescription>
                  Account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Settings and configuration options would be here
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="card-feature">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>
                Here's what you can do next to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">For Development:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Export this project to connect with your Node.js + MongoDB backend</li>
                  <li>Implement real authentication logic</li>
                  <li>Add database integration for user profiles</li>
                  <li>Build the dashboard features specific to families vs students</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;