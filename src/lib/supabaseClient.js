import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://abbwgldiqdxomazviqsi.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiYndnbGRpcWR4b21henZpcXNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgwMzQsImV4cCI6MjA2NDAxNDAzNH0.RgAnWNj-eLarKd20M7OtId7evje-SDfKdBKNIKKJWZk';
    
    export const supabase = createClient(supabaseUrl, supabaseAnonKey);