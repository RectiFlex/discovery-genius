
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function SpamReports() {
  const { toast } = useToast();
  const { user } = useAuth();

  const { data: reports, refetch } = useQuery({
    queryKey: ['spam-reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('spam_reports')
        .select(`
          *,
          products (
            title,
            moderation_status
          )
        `)
        .eq('status', 'pending');
      
      if (error) throw error;
      return data;
    },
  });

  const handleReport = async (reportId: string, status: 'resolved' | 'dismissed') => {
    const { error } = await supabase
      .from('spam_reports')
      .update({
        status,
        resolved_at: new Date().toISOString(),
        resolved_by: user?.id,
      })
      .eq('id', reportId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update report status",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Report ${status}`,
      });
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Spam Reports</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports?.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.products?.title}</TableCell>
              <TableCell>{report.reason}</TableCell>
              <TableCell>{report.status}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  size="sm"
                  onClick={() => handleReport(report.id, 'resolved')}
                >
                  Resolve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReport(report.id, 'dismissed')}
                >
                  Dismiss
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
