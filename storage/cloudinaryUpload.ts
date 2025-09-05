export async function uploadImage(file: File): Promise<string> {
  const cloudName = "dqwlvshxm"; 
  const uploadPreset = "perfil_unsigned"; 

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  console.time("cloudinary-upload"); // ⏱️ inicia medición
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });
  console.timeEnd("cloudinary-upload"); // ⏱️ mide duración

  if (!res.ok) throw new Error("Error subiendo imagen");

  const data = await res.json();
  return data.secure_url;
}
