import { uploadImage } from "../../../../storage/cloudinaryUpload";
import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  UserRound,
  Bolt,
  EllipsisVertical,
  Check,
  Pencil,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import { getAuth, updateProfile } from "firebase/auth";
import { db } from "../../../firebase";
import { setDoc, doc, onSnapshot } from "firebase/firestore";
import { useApp } from "../../../Context/AppContext";
import { StatesSidebar } from "../../../States/StatesSidebar";
import { compressImage } from "../../../utils/CmpressImagePorfil";
// import uploadImage from "../utils/uploadImage";
import SecurityInfo from "./Componentssidebar/SecurityInfo";
import VerifiedBadge from "../../../Verification✔/VerifiedBadge";
import Discover from "./Componentssidebar/Discover";
import  SettingsPanel  from "./Componentssidebar/SettingsPanel";
import ChatList from "./Componentssidebar/ChatList";

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
    DescriptionUserUpdate,
    setDescriptionUserUpdate,
    Showwindow,
    setShowwindow,
  } = StatesSidebar();

 
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
    if (!uid) return;

    await setDoc(
      doc(db, "users", uid),
      { nombre: NameUserUpdate },
      { merge: true }
    );
  };

  const updateDescription = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    await setDoc(
      doc(db, "users", uid),
      { description: DescriptionUserUpdate },
      { merge: true }
    );
  };

  // Escuchar cambios en Firestore en tiempo real
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const userRef = doc(db, "users", uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUser((prev) =>
          prev
            ? {
                ...prev,
                nombre: data.nombre ?? prev.nombre,
                description: data.description ?? prev.description,
              }
            : null
        );
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (EditNameporfil && !NameUserUpdate && user?.nombre) {
      setNameUserUpdate(user.nombre);
    }
  }, [EditNameporfil, user?.nombre]);

  useEffect(() => {
    if (EditDescriptionporfil && !DescriptionUserUpdate && user?.description) {
      setDescriptionUserUpdate(user.description);
    }
  }, [EditDescriptionporfil, user?.description]);

  const handleEditName = () => {
    setEditNameporfil(true);
    setEditDescriptionporfil(false);
  };

  const handleEditDescription = () => {
    setEditDescriptionporfil(true);
    setEditNameporfil(false);
  };

  return (
    <div className="w-[29rem] bg-[#0b0c10] border-r border-[#1f2126] h-screen text-white flex flex-col">
      <div className="overflow-y-scroll scrollbar-hide  flex-1 p-4 border-b border-[#1f2126]">
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
          <button 
             onClick={()=>{
            setShowwindow("ChatList")
          }}
          className="flex items-center gap-2 text-[#858383] hover:bg-[#2a2d33] px-3 py-2 rounded text-sm font-medium">
            <MessageCircle size={18} /> Chats
          </button>
          <button 
            onClick={()=>{
            setShowwindow("Profile")
          }}
          className="flex items-center gap-2 text-[#facc15] hover:bg-[#2a2d33] px-3 py-2 rounded text-sm font-medium">
            <UserRound size={18} /> Profile
          </button>
          <button
          onClick={()=>{
            setShowwindow("Settings")
          }}
          className="flex items-center gap-2 text-[#858383] hover:bg-[#2a2d33] px-3 py-2 rounded text-sm font-medium">
            <Bolt size={18} /> Settings
          </button>
        </div>

        {/* Discover */}
        {Showwindow ==="Discover"&&(
            <Discover setShowWindos={setShowwindow}/>
        )}
        
          {/* Settings */}
        {Showwindow ==="Settings"&&(
            <SettingsPanel />
        )}

           {/* Settings */}
        {Showwindow ==="ChatList"&&(
            <ChatList/>
        )}
      
      

        {/* Profile */}
        {Showwindow === "Profile" && (
         <div className="px-4 py-6 space-y-10">
  {/* Profile Section */}
  <section className="flex flex-col items-center text-center relative group">
    {/* Botón de opciones */}
    {!EditPhotoperfil && (
      <button
        onClick={() => setEditPhotoperfil(true)}
        className="absolute top-2 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#1a1c20]/80 backdrop-blur-sm px-2 py-2 rounded-lg border border-[#2a2d33] text-white hover:bg-yellow-300 hover:text-black shadow-md"
      >
        <EllipsisVertical size={16} />
      </button>
    )}

    {/* Menú de edición de foto */}
    {EditPhotoperfil && (
      <>
        <div onClick={() => setEditPhotoperfil(false)} className="fixed inset-0 z-10"></div>
        <div className="absolute top-2 right-2 z-20 flex flex-col gap-1 bg-[#1a1c20]/80 backdrop-blur-sm p-3 rounded-xl border border-[#2a2d33] shadow-md">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handlePhotoChange}
          />
          <button onClick={handleEditClick} className="text-sm text-white hover:text-black hover:bg-yellow-300 px-3 py-1 rounded transition">Editar</button>
          <button onClick={() => setEditPhotoperfil(false)} className="text-sm text-white hover:text-black hover:bg-yellow-300 px-3 py-1 rounded transition">Ver</button>
          <button onClick={() => setEditPhotoperfil(false)} className="text-sm text-red-400 hover:text-white hover:bg-red-600 px-3 py-1 rounded transition">Eliminar</button>
        </div>
      </>
    )}

    {/* Avatar */}
    <div className="relative w-28 h-28 mt-6 rounded-full overflow-visible">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <img
          src={currentPhotoURL ?? "photo_defect/Photodefect.png"}
          alt="avatar-blur"
          className="w-44 h-36 blur-[80px] object-cover opacity-60 scale-x-150"
        />
      </div>
      <img
        src={currentPhotoURL ?? "photo_defect/Photodefect.png"}
        alt="avatar"
        className="w-full h-full object-cover rounded-full relative z-10 border-4 border-[#1f2126]"
      />
    </div>

    {/* Nombre */}
    <div className="mt-8 flex items-center gap-2">
      {EditNameporfil ? (
        <>
          <input
            maxLength={16}
            value={NameUserUpdate}
            onChange={(e) => setNameUserUpdate(e.target.value)}
            className="pl-3 min-w-[120px] max-w-[220px] bg-[#1a1c20]/80 py-2 outline-none border border-white/35 rounded-lg text-white text-lg"
            type="text"
          />
          <button
            onClick={() => {
              setEditNameporfil(false);
              updateNameUser();
            }}
            className="bg-yellow-300 text-black p-2 rounded-md hover:bg-yellow-400 transition"
          >
            <Check size={16} />
          </button>
        </>
      ) : (
        <>
          <h2 className="text-white text-lg font-semibold flex items-center gap-1 leading-none">
            <span>{user?.nombre ?? "Cargando..."}</span>
            {user?.verificado && (
              <VerifiedBadge size={18} className="relative top-[1px]" />
            )}
          </h2>
          <button
            onClick={handleEditName}
            className="bg-[#1a1c20]/80 backdrop-blur-sm p-2 rounded-full border border-[#2a2d33] text-yellow-300 hover:bg-yellow-300 hover:text-black transition"
          >
            <Pencil size={12} />
          </button>
        </>
      )}
    </div>

    {/* Descripción */}
    <div className="mt-4 flex items-center gap-2">
      {EditDescriptionporfil ? (
        <>
          <input
            maxLength={35}
            value={DescriptionUserUpdate}
            onChange={(e) => setDescriptionUserUpdate(e.target.value)}
            className="pl-2 min-w-[140px] max-w-[260px] bg-[#1a1c20]/80 py-1.5 outline-none border border-white/35 rounded-lg text-gray-300 text-sm"
            type="text"
          />
          <button
            onClick={() => {
              setEditDescriptionporfil(false);
              updateDescription();
            }}
            className="bg-yellow-300 text-black p-2 rounded-md hover:bg-yellow-400 transition"
          >
            <Check size={16} />
          </button>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-400 whitespace-nowrap">
            {user?.description || "My Zintra space!"}
          </p>
          <button
            onClick={handleEditDescription}
            className="bg-[#1a1c20]/80 backdrop-blur-sm p-2 rounded-full border border-[#2a2d33] text-yellow-300 hover:bg-yellow-300 hover:text-black transition opacity-0 group-hover:opacity-100"
          >
            <Pencil size={10} />
          </button>
        </>
      )}
    </div>
  </section>

  {/* Discover & Friends */}
  <section className="flex justify-around">
    <button
      onClick={() => setShowwindow("Discover")}
      className="flex items-center gap-2 text-sm text-gray-500 border border-white/35 px-4 py-2 rounded hover:bg-[#1a1c20]/60 transition"
    >
      <UserRoundPlus size={16} /> Discover
    </button>
    <button className="flex items-center gap-2 text-sm text-gray-500 border border-white/35 px-4 py-2 rounded hover:bg-[#1a1c20]/60 transition">
      <UsersRound size={16} /> Friends (4)
    </button>
  </section>

  {/* Security Info */}
  <SecurityInfo />
</div>

        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#1f2126] text-xs text-gray-500">
        Zintra © 2025
      </div>
    </div>
  );
}
