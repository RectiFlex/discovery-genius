
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

export function UserManagement() {
  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          user_roles (
            role
          )
        `);
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-lg">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
      <div className="grid gap-4">
        {users?.map((user) => (
          <Card key={user.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{user.full_name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex gap-2">
                {user.user_roles?.map((role: { role: string }) => (
                  <span 
                    key={role.role}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                  >
                    {role.role}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
