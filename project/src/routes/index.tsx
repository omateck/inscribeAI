import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import LandingPage from '../components/LandingPage';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import ResetPassword from '../components/auth/ResetPassword';
import Dashboard from '../components/dashboard/Dashboard';
import Team from '../components/dashboard/Team';
import Billing from '../components/dashboard/Billing';
import ContentEditor from '../components/editor/ContentEditor';
import Analytics from '../components/dashboard/Analytics';
import Settings from '../components/dashboard/Settings';

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/signin" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/content"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <ContentEditor />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/analytics"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/team"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Team />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/billing"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Billing />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </PrivateRoute>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
