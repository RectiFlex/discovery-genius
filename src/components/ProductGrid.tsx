
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "./ProductCard";
import { useToast } from "./ui/use-toast";

export function ProductGrid() {
  const { toast } = useToast();
  const { data: products, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('moderation_status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  useEffect(() => {
    // Subscribe to real-time changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'products',
          filter: 'moderation_status=eq.approved'
        },
        (payload) => {
          toast({
            title: "New Product Added",
            description: `${payload.new.title} has been added to the platform!`,
          });
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch, toast]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products?.map((product) => (
        <ProductCard 
          key={product.id}
          title={product.title}
          description={product.description || ""}
          image={product.image_url || "https://images.unsplash.com/photo-1677442136019-21780ecad995"}
          upvotes={0}
          category={product.category || "Uncategorized"}
        />
      ))}
    </div>
  );
}
