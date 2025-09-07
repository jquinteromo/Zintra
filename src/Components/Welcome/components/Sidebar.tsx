import { getAuth, updateProfile } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { uploadImage } from "../../../../storage/cloudinaryUpload";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { compressImage } from "../../../utils/CmpressImagePorfil";
import { useApp } from "../../../Context/AppContext";
import { StatesSidebar } from "../../../States/StatesSidebar";
import VerifiedBadge from "../../../Verification✔/VerifiedBadge";
import {
  MessageCircle,
  UserRound,
  Bolt,
  UsersRound,
  UserRoundPlus,
  Pencil,
  EllipsisVertical,
  Check,
} from "lucide-react";

export default function Sidebar() {
  const {
    EditPhotoperfil,
    setEditPhotoperfil,
    EditNameporfil,
    setEditNameporfil,
    EditDescriptionporfil,
    setEditDescriptionporfil,
    NameUserUpdate,
    setNameUserUpdate,
  } = StatesSidebar();

  const handleEditName = () => {
    setEditNameporfil(true);
    setEditDescriptionporfil(false);
  };

  const handleEditDescription = () => {
    setEditDescriptionporfil(true);
    setEditNameporfil(false);
  };

  const { user, setUser } = useApp();
  const auth = getAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentPhotoURL, setCurrentPhotoURL] = useState<string | null>(
    user?.photoURL ?? null
  );

  // 🔁 Sincronizar con el contexto
  useEffect(() => {
    setCurrentPhotoURL(user?.photoURL ?? null);
  }, [user?.photoURL]);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Archivo seleccionado:", file);
    if (!file || !auth.currentUser) return;

    try {
      const compressedFile = await compressImage(file);
      const previewURL = URL.createObjectURL(compressedFile);
      setCurrentPhotoURL(previewURL); // Mostrar preview
      setEditPhotoperfil(false);

      const publicUrl = await uploadImage(compressedFile);

      await updateProfile(auth.currentUser, { photoURL: publicUrl });

      await setDoc(
        doc(db, "users", auth.currentUser.uid),
        { photoURL: publicUrl },
        { merge: true }
      );

      // 🔥 Actualizar contexto global
      setUser((prev) => (prev ? { ...prev, photoURL: publicUrl } : null));

      alert("Foto de perfil actualizada");
    } catch (error) {
      console.error(error);
      alert("Error subiendo la foto");
    }
  };

  const updateNameUser = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      console.error("Usuario no autenticado");
      return;
    }

    await setDoc(
      doc(db, "users", uid),
      { nombre: NameUserUpdate },
      { merge: true }
    );
  };

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const userRef = doc(db, "users", uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUser((prev) => {
          if (!prev) return null;

          return {
            ...prev,
            nombre: data.nombre ?? prev.nombre,
          };
        });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (EditNameporfil && !NameUserUpdate && user?.nombre) {
      setNameUserUpdate(user.nombre);
    }
  }, [EditNameporfil, user?.nombre]);

  return (
    <div className="w-72 bg-[#0b0c10] border-r border-[#1f2126] h-screen text-white flex flex-col">
      <div className="overflow-y-auto flex-1 p-4 border-b border-[#1f2126] scrollbar-hide">
        {/* Zintra Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <img
            className="h-10 w-10 object-contain"
            src="icon_zintra/icon_zintra.png"
            alt="Zintra logo"
          />
          <p className="text-2xl font-bold text-yellow-300">Zintra</p>
        </div>

        {/* Navigation */}
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

        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-6 group relative">
          <button
            onClick={() => setEditPhotoperfil(true)}
            className={`${
              EditPhotoperfil ? "hidden" : ""
            } opacity-0 group-hover:opacity-100 absolute top-2 right-16 z-20 hover:bg-yellow-300 hover:text-black px-2 py-2 rounded-lg bg-[#1a1c20]/80 backdrop-blur-sm border border-[#2a2d33] shadow-md transition-opacity duration-200`}
          >
            <EllipsisVertical size={16} />
          </button>

          {EditPhotoperfil && (
            <>
              <div
                onClick={() => setEditPhotoperfil(false)}
                className="fixed inset-0 z-10"
              ></div>
              <div className="absolute top-2 right-2 z-20 flex flex-col gap-1 bg-[#1a1c20]/80 backdrop-blur-sm p-2 rounded-lg border border-[#2a2d33] shadow-md">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                <button
                  onClick={() => {
                    handleEditClick();
                  }}
                  className="text-sm text-white hover:text-black hover:bg-yellow-300 px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => setEditPhotoperfil(false)}
                  className="text-sm text-white hover:text-black hover:bg-yellow-300 px-3 py-1 rounded"
                >
                  Ver
                </button>
                <button
                  onClick={() => setEditPhotoperfil(false)}
                  className="text-sm text-red-400 hover:text-white hover:bg-red-600 px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>
            </>
          )}

          {/* Avatar */}
          <div className="relative w-24 h-24 mt-4 rounded-full overflow-visible">
            <div className="absolute">
              <img
                src={currentPhotoURL ?? "photo_defect/Photodefect.png"}
                alt="avatar-blur"
                className="w-44 h-36 blur-[80px] object-cover opacity-40 scale-x-125"
              />
            </div>
            <img
              src={currentPhotoURL ?? "photo_defect/Photodefect.png"}
              alt="avatar"
              className="w-full h-full object-cover rounded-full relative z-10"
            />
          </div>

          <div className="relative mt-8 ">
            {/* Nombre + lápiz */}
            <div className="flex items-center gap-2">
              {EditNameporfil ? (
                <>
                  <input
                    value={NameUserUpdate}
                    onChange={(e) => setNameUserUpdate(e.target.value)}
                    className="pl-3 w-auto min-w-[100px] max-w-[200px] bg-[#1a1c20]/80 py-1.5 outline-none border border-white/35 rounded-lg text-white text-xl"
                    type="text"
                  />
                  <button
                    onClick={() => {
                      setEditNameporfil(false);
                      updateNameUser();
                    }}
                    className="bg-yellow-300 text-black p-1 rounded-md hover:bg-yellow-400 transition"
                  >
                    <Check size={16} />
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-white text-xl font-semibold flex items-center gap-1 leading-none">
                    <span>{user?.nombre ?? "Cargando..."}</span>
                    {user?.verificado && (
                      <VerifiedBadge size={18} className="relative top-[1px]" />
                    )}
                  </h2>
                  <button
                    onClick={handleEditName}
                    className="bg-[#1a1c20]/80 backdrop-blur-sm p-1.5 rounded-full border border-[#2a2d33] text-yellow-300 hover:bg-yellow-300 hover:text-black transition-all duration-200"
                  >
                    <Pencil size={12} />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="relative mt-10 w-full group">
            <div className="flex items-center gap-2">
              {EditDescriptionporfil ? (
                <>
                  <input
                    className="pl-2 w-auto min-w-[120px] max-w-[250px] bg-[#1a1c20]/80 py-1.5 outline-none border border-white/35 rounded-lg text-gray-300 text-sm"
                    type="text"
                  />
                  <button
                    onClick={() => {
                      setEditDescriptionporfil(false);
                    }}
                    className="bg-yellow-300 text-black p-1 rounded-md hover:bg-yellow-400 transition"
                  >
                    <Check size={16} />
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-400 whitespace-nowrap">
                    Software Engineer
                  </p>
                  <button
                    onClick={handleEditDescription}
                    className="bg-[#1a1c20]/80 backdrop-blur-sm p-1.5 rounded-full border border-[#2a2d33] text-yellow-300 hover:bg-yellow-300 hover:text-black transition-all duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <Pencil size={10} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Discover & Friends */}
        <div className="flex justify-around mb-4 mt-12">
          <button className="flex flex-row items-center border border-white/35 gap-1 text-sm text-gray-500 px-3 py-2 rounded">
            <UserRoundPlus size={16} /> Discover
          </button>
          <button className="flex flex-row items-center border border-white/35 gap-1 text-sm text-gray-500 px-3 py-2 rounded-md">
            <UsersRound size={16} /> Friends (4)
          </button>
        </div>

        {/* Security Info */}
        <div className="text-gray-500 bg-white/25 mt-12 p-4 rounded-lg">
          <h1 className="font-semibold text-white mb-1">Security</h1>
          <p className="text-sm">End-to-end encrypted</p>
        </div>
      </div>

      <div className="p-4 border-t border-[#1f2126] text-xs text-gray-500">
        Zintra © 2025
      </div>
    </div>
  );
}
