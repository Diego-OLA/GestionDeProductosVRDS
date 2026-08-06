import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
export const anon = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5idm5raHh6c3Vmam5obXZkY3ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MjgzNjQsImV4cCI6MjEwMTEwNDM2NH0.7-m1_IrwFDZiIJ7Imhd4krfYaUE5xEZO5oJiuM0HcUI"
export const URL ="https://nbvnkhxzsufjnhmvdcvb.supabase.co"
export const supabase = createClient(URL, anon)