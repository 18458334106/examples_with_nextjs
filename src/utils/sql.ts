import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://nyuvdcewxadfcquchcgy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55dXZkY2V3eGFkZmNxdWNoY2d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAwODM4MjksImV4cCI6MjAwNTY1OTgyOX0.rktn1-34hqAruUjLCdn2AlAfgLb-7RVsLGL-VtuVdbk')