import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EmailVerification from "./pages/EmailVerification";
import ProfileCompletion from "./pages/ProfileCompletion";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";
import BookingDetails from "./pages/family/BookingDetails";
import PaymentMethod from "./pages/family/PaymentMethod";
import CaregiverDashboard from "./pages/caregiver/Dashboard";
import FindJobs from "./pages/caregiver/FindJobs";
import MyApplications from "./pages/caregiver/MyApplications";
import FamilyDashboard from "./pages/family/Dashboard";
import FindCaregiver from "./pages/family/FindCaregiver";
import ApplicationsAccepted from "./pages/family/ApplicationsAccepted";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/profile-completion" element={<ProfileCompletion />} />
          <Route path="/family-dashboard" element={<FamilyDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          {/* Caregiver Routes */}
            <Route path="/caregiver/dashboard" element={<CaregiverDashboard />} />
            <Route path="/caregiver/find-jobs" element={<FindJobs />} />
            <Route path="/caregiver/applications" element={<MyApplications />} />
            
            {/* Family Routes */}
            <Route path="/family/dashboard" element={<FamilyDashboard />} />
            <Route path="/family/find-caregiver" element={<FindCaregiver />} />
            <Route path="/family/applications" element={<ApplicationsAccepted />} />
            
            <Route path="/BookingDetails" element={<BookingDetails />} />
            <Route path="/payment" element={<PaymentMethod />} />
            
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
