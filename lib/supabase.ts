import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://vjgnhuivftfesgcjdzrp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqZ25odWl2ZnRmZXNnY2pkenJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMjAxNDUsImV4cCI6MjA3MjU5NjE0NX0.qbHRNtmiwly9Z0fOyL7EJxH6Uw0_woL_WQ26R01h1pw'
);
