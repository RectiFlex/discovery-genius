
export type UserRole = 'admin' | 'curator' | 'user';

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserWithRole extends Profile {
  roles: UserRole[];
}
