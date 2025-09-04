// zintra/storage/upload.ts
import { supabase } from '../lib/supabase';

export async function uploadImage(file: File) {
  const filePath = `icons/${file.name}`;

  const {  error } = await supabase.storage
    .from('zintra-assets')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from('zintra-assets')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}
