import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://mzwyipfyijrsdtvzdoxo.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16d3lpcGZ5aWpyc2R0dnpkb3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MTY1NzgsImV4cCI6MjA1NDA5MjU3OH0.dl7-btWpEVAWSWtUSzjzvpO-95ddX8PoSkT6c1Rta4Y'
);
