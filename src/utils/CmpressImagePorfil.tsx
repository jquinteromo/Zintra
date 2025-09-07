import imageCompression from "browser-image-compression";

export const compressImage = async (file: File): Promise<File> => {
  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
      fileType: "image/jpeg",
    });
    return compressedFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
};