import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://qtvlnawsjjzkixnpbsql.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0dmxuYXdzamp6a2l4bnBic3FsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTEzMzA3NCwiZXhwIjoyMDM2NzA5MDc0fQ.E4ap4Jho69AoqKFUaZfrvbW_iHoLc6xFJ86_S34nRkQ',
);
