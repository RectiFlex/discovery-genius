
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [products, reports] = await Promise.all([
        supabase.from('products').select('moderation_status', { count: 'exact' }).eq('moderation_status', 'pending'),
        supabase.from('spam_reports').select('status', { count: 'exact' }).eq('status', 'pending'),
      ]);
      
      return {
        pendingProducts: products.count || 0,
        pendingReports: reports.count || 0,
      };
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-2">Pending Products</h3>
          <p className="text-3xl font-bold">{stats?.pendingProducts || 0}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-2">Spam Reports</h3>
          <p className="text-3xl font-bold">{stats?.pendingReports || 0}</p>
        </Card>
      </div>
    </div>
  );
}
