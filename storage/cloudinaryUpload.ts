export async function uploadImage(file: File): Promise<string> {
  const cloudName = "dqwlvshxm"; // lo sacas del dashboard de Cloudinary
const uploadPreset = "perfil_unsigned"; 

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Error subiendo imagen");

  const data = await res.json();
  return data.secure_url; // URL pública de la imagen
}
