
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function ProductModeration() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState('pending');

  const { data: products, refetch } = useQuery({
    queryKey: ['products', selectedStatus],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('moderation_status', selectedStatus);
      
      if (error) throw error;
      return data;
    },
  });

  const handleModeration = async (productId: string, status: 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('products')
      .update({
        moderation_status: status,
        moderated_at: new Date().toISOString(),
        moderated_by: user?.id,
      })
      .eq('id', productId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update product status",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Product ${status}`,
      });
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Product Moderation</h1>
      
      <div className="flex space-x-4 mb-4">
        {['pending', 'approved', 'rejected'].map((status) => (
          <Button
            key={status}
            variant={selectedStatus === status ? "default" : "outline"}
            onClick={() => setSelectedStatus(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Spam Score</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.spam_score}</TableCell>
              <TableCell className="space-x-2">
                {selectedStatus === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleModeration(product.id, 'approved')}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleModeration(product.id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
