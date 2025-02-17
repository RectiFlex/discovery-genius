
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AdminNav } from "@/components/admin/AdminNav";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { ProductModeration } from "@/components/admin/ProductModeration";
import { SpamReports } from "@/components/admin/SpamReports";
import { UserManagement } from "@/components/admin/UserManagement";

export default function Admin() {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Admin page - Current profile:", profile);
    console.log("Admin page - Loading state:", loading);

    if (!loading && profile && !profile.roles.includes('admin')) {
      console.log("Redirecting: User is not an admin");
      navigate('/');
    }
  }, [profile, loading, navigate]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Check if user is authenticated and is an admin
  if (!profile || !profile.roles.includes('admin')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductModeration />} />
          <Route path="reports" element={<SpamReports />} />
        </Routes>
      </div>
    </div>
  );
}
