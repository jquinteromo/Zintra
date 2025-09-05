import { createClient } from '@supabase/supabase-js';
import { getAuth } from 'firebase/auth';

export async function uploadImage(file: File) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Usuario no autenticado");

  // 🔐 Obtener token de Firebase
  const token = await user.getIdToken();

  // 🔄 Crear cliente Supabase con header Authorization
  const supabase = createClient(
    'https://vjgnhuivftfesgcjdzrp.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqZ25odWl2ZnRmZXNnY2pkenJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMjAxNDUsImV4cCI6MjA3MjU5NjE0NX0.qbHRNtmiwly9Z0fOyL7EJxH6Uw0_woL_WQ26R01h1pw', // Usa variable de entorno en producción
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  // 🧪 Validar usuario Supabase
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error("Error obteniendo usuario Supabase:", userError);
  } else {
    console.log("Usuario Supabase:", userData?.user?.id);
  }

  // 🧠 Ruta con carpeta opcional y UID
  const filePath = `avatars/${user.uid}-${file.name}`;

  // 📤 Subir imagen al bucket zintra-assets
  const { error: uploadError } = await supabase.storage
    .from('zintra-assets')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) throw uploadError;

  // 🌐 Obtener URL pública
  const { data: urlData } = supabase.storage
    .from('zintra-assets')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}
