import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Authentication pages
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import EmailVerification from "./pages/auth/EmailVerification";
import ProfileCompletion from "./pages/auth/ProfileCompletion";

// Caregiver pages
import CaregiverDashboard from "./pages/caregiver/Dashboard";
import FindJobs from "./pages/caregiver/FindJobs";
import MyApplications from "./pages/caregiver/MyApplications";
import MessageFamily from "./pages/caregiver/MessageFamily";
import JobDetails from "./pages/caregiver/JobDetails";
import ApplyJob from "./pages/caregiver/ApplyJob";

// Family pages
import FamilyDashboard from "./pages/family/FamilyDashboard";
import FindCaregiver from "./pages/family/FindCaregiver";
import ApplicationsAccepted from "./pages/family/ApplicationsAccepted";
import CaregiverProfile from "./pages/family/CaregiverProfile";
import PaymentMethod from "./pages/family/PaymentMethod";
import BookingDetails from "./pages/family/BookingDetails";
import ScheduleInterview from "./pages/family/ScheduleInterview";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Conditional Navbar Component
const ConditionalNavbar = () => {
  const location = useLocation();
  const publicRoutes = [
    "/",
    "/login",
    "/signup",
    "/email-verification",
    "/profile-completion",
  ];
  if (publicRoutes.includes(location.pathname)) {
    return null;
  }
  return <Navbar />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ConditionalNavbar />
          <Routes>
            {/* Public Routes - No Navbar */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/email-verification" element={<EmailVerification />} />
            <Route path="/profile-completion" element={<ProfileCompletion />} />

            {/* Protected Routes - With Navbar */}
            {/* Caregiver */}
            <Route path="/caregiver/dashboard" element={<ProtectedRoute><CaregiverDashboard /></ProtectedRoute>} />
            <Route path="/caregiver/find-jobs" element={<ProtectedRoute><FindJobs /></ProtectedRoute>} />
            <Route path="/caregiver/applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />
            <Route path="/caregiver/booking/:bookingId" element={<ProtectedRoute><BookingDetails /></ProtectedRoute>} />
            <Route path="/caregiver/job/:jobId" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
            <Route path="/caregiver/apply/:jobId" element={<ProtectedRoute><ApplyJob /></ProtectedRoute>} />
            <Route path="/caregiver/message-family/:jobId" element={<ProtectedRoute><MessageFamily /></ProtectedRoute>} />

            {/* Family */}
            <Route path="/family/dashboard" element={<ProtectedRoute><FamilyDashboard /></ProtectedRoute>} />
            <Route path="/family/find-caregiver" element={<ProtectedRoute><FindCaregiver /></ProtectedRoute>} />
            <Route path="/family/applications" element={<ProtectedRoute><ApplicationsAccepted /></ProtectedRoute>} />
            <Route path="/family/schedule-interview" element={<ProtectedRoute><ScheduleInterview /></ProtectedRoute>} />
            {/* DYNAMIC SCHEDULE INTERVIEW ROUTE */}
            <Route path="/family/schedule-interview/:bookingId" element={<ProtectedRoute><ScheduleInterview /></ProtectedRoute>} />

            {/* Family-side booking and payment routes */}
            <Route path="/family/booking/:id" element={
              <ProtectedRoute>
                <BookingDetails />
              </ProtectedRoute>
            } />
            <Route path="/family/payment/:id" element={
              <ProtectedRoute>
                <PaymentMethod />
              </ProtectedRoute>
            } />
            <Route path="/family/caregiver/profile/:id" element={
              <ProtectedRoute>
                <CaregiverProfile />
              </ProtectedRoute>
            } />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
