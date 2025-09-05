import { getAuth, updateProfile } from "firebase/auth";
import { useRef, useState, useEffect } from "react";
import { uploadImage } from "../../../../storage/cloudinaryUpload";

import {
  MessageCircle,
  UserRound,
  Bolt,
  UsersRound,
  UserRoundPlus,
  Pencil,
} from "lucide-react";

export default function Sidebar() {
  const auth = getAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>("Usuario");

  useEffect(() => {
    if (auth.currentUser) {
      setPhotoURL(auth.currentUser.photoURL);
      setDisplayName(auth.currentUser.displayName || "Usuario");
    }
  }, [auth.currentUser]);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };
const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file || !auth.currentUser) return;

  try {
    const publicUrl = await uploadImage(file);

    console.time("firebase-updateProfile");
    await updateProfile(auth.currentUser, { photoURL: publicUrl });
    console.timeEnd("firebase-updateProfile");

    setPhotoURL(publicUrl);
    alert("Foto de perfil actualizada");
  } catch (error) {
    console.error(error);
    alert("Error subiendo la foto");
  }
};

  return (
    <div className="w-72 bg-[#0b0c10] border-r border-[#1f2126] h-screen text-white flex flex-col">
      <div className="overflow-y-auto flex-1 p-4 border-b border-[#1f2126] scrollbar-hide">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <img
            className="h-10 w-10 object-contain"
            src="icon_zintra/icon_zintra.png"
            alt="Zintra logo"
          />
          <p className="text-2xl font-bold text-yellow-300">Zintra</p>
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-center mb-6 gap-2">
          <button className="flex items-center gap-2 text-[#858383] hover:bg-[#2a2d33] px-3 py-2 rounded text-sm font-medium">
            <MessageCircle size={18} /> Chats
          </button>
          <button className="flex items-center gap-2 text-[#facc15] hover:bg-[#2a2d33] px-3 py-2 rounded text-sm font-medium">
            <UserRound size={18} /> Profile
          </button>
          <button className="flex items-center gap-2 text-[#858383] hover:bg-[#2a2d33] px-3 py-2 rounded text-sm font-medium">
            <Bolt size={18} /> Settings
          </button>
        </div>

        {/* Sección de perfil */}
        <div className="flex flex-col items-center text-center mb-6 group relative">
          <div className="absolute top-2 right-2 z-10 flex flex-col gap-1 bg-[#1a1c20]/80 backdrop-blur-sm p-2 rounded-lg border border-[#2a2d33] shadow-md transition-opacity duration-200">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handlePhotoChange}
            />
            <button
              onClick={handleEditClick}
              className="text-sm text-white hover:text-black hover:bg-yellow-300 px-3 py-1 rounded"
            >
              Editar
            </button>
            <button className="text-sm text-white hover:text-black hover:bg-yellow-300 px-3 py-1 rounded">
              Ver
            </button>
            <button className="text-sm text-red-400 hover:text-white hover:bg-red-600 px-3 py-1 rounded">
              Eliminar
            </button>
          </div>

          <div className="relative w-24 h-24 mt-6 rounded-full mb-2 overflow-hidden">
            <img
              src={photoURL || "photo_defect/Photodefect.png"}
              alt="avatar"
              className="w-full h-full object-cover rounded-full cursor-pointer"
            />
          </div>

          <div className="relative mt-8 group">
            <h2 className="text-xl font-semibold text-white">{displayName}</h2>
            <button className="absolute top-0 right-[-24px] bg-[#1a1c20]/80 backdrop-blur-sm p-1.5 rounded-full border border-[#2a2d33] text-yellow-300 hover:bg-yellow-300 hover:text-black transition-all duration-200 opacity-0 group-hover:opacity-100">
              <Pencil size={12} />
            </button>
          </div>

          <div className="relative mt-1 group">
            <p className="text-sm text-gray-400">Software Engineer</p>
            <button className="absolute top-0 right-[-24px] bg-[#1a1c20]/80 backdrop-blur-sm p-1.5 rounded-full border border-[#2a2d33] text-yellow-300 hover:bg-yellow-300 hover:text-black transition-all duration-200 opacity-0 group-hover:opacity-100">
              <Pencil size={10} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-around mb-4 mt-12">
          <button className="flex flex-row items-center border border-white/35 gap-1 text-sm text-gray-500 px-3 py-2 rounded">
            <UserRoundPlus size={16} /> Discover
          </button>
          <button className="flex flex-row items-center border border-white/35 gap-1 text-sm text-gray-500 px-3 py-2 rounded-md">
            <UsersRound size={16} /> Friends (4)
          </button>
        </div>

        {/* Seguridad */}
        <div className="text-gray-500 bg-white/25 mt-12 p-4 rounded-lg">
          <h1 className="font-semibold text-white mb-1">Security</h1>
          <p className="text-sm">End-to-end encrypted</p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#1f2126] text-xs text-gray-500">
        Zintra © 2025
      </div>
    </div>
  );
}
