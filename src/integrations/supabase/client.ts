// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cjskoluuefiuckpdgyei.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqc2tvbHV1ZWZpdWNrcGRneWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3NjYzNDQsImV4cCI6MjA1NTM0MjM0NH0.7oZh5JR5yDJ6W5DUaV3Z_s5gPOoKxfVQm3ybnjzYiOE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);