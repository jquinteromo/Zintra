import { createClient } from '@supabase/supabase-js';

// Cliente Supabase
const supabaseUrl = 'https://vjgnhuivftfesgcjdzrp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqZ25odWl2ZnRmZXNnY2pkenJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMjAxNDUsImV4cCI6MjA3MjU5NjE0NX0.qbHRNtmiwly9Z0fOyL7EJxH6Uw0_woL_WQ26R01h1pw';

const supabase = createClient(supabaseUrl, supabaseKey);

// Función para subir imagen
export async function uploadImage(file: File, uid: string) {
  const filePath = `avatars/${uid}-${file.name}`;

  // Subir al bucket público
  const { error } = await supabase.storage
    .from('zintra-assets')
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  // Obtener URL pública
  const { data } = supabase.storage
    .from('zintra-assets')
    .getPublicUrl(filePath);

  return data.publicUrl;
}
