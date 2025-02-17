
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AdminNav } from "@/components/admin/AdminNav";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { ProductModeration } from "@/components/admin/ProductModeration";
import { SpamReports } from "@/components/admin/SpamReports";

export default function Admin() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile && !profile.roles.some(role => ['admin', 'curator'].includes(role))) {
      navigate('/');
    }
  }, [profile, navigate]);

  if (!profile || !profile.roles.some(role => ['admin', 'curator'].includes(role))) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductModeration />} />
          <Route path="reports" element={<SpamReports />} />
        </Routes>
      </div>
    </div>
  );
}
