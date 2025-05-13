import { createClient } from '@supabase/supabase-js';

// TODO: Move these to environment variables for security in production
const supabaseUrl = 'https://poptkvbfzyvgurklkngf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHRrdmJmenl2Z3Vya2xrbmdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NDE2NTksImV4cCI6MjA2MjExNzY1OX0._LTFq0C2DdVN5NGupBkZeb_riH6HVHYo3GNBDN-JRLc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 