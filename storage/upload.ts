import { supabase } from '../lib/supabase';
import { getAuth } from 'firebase/auth';

export async function uploadImage(file: File) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Usuario no autenticado");

  // 🔐 Obtener token de Firebase
  const token = await user.getIdToken();

  // 🔄 Sincronizar sesión con Supabase
  const { error: sessionError } = await supabase.auth.setSession({
    access_token: token,
    refresh_token: token,
  });

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) console.error("Error obteniendo usuario Supabase:", userError);
  else console.log("Usuario Supabase:", userData);

  if (sessionError) throw sessionError;

  // 🧠 Ruta con carpeta opcional
  const filePath = `avatars/${user.uid}-${file.name}`;

  // 📤 Subir imagen
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
