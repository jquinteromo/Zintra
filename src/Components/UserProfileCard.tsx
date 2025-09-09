import { Phone, Video, X } from "lucide-react";
import VerifiedBadge from "../Verification✔/VerifiedBadge";

interface Props {
  Userview: {
    nombre: string;
    description: string;
    photoURL: string;
    verificado?: boolean;
    uid: string;
  };
  setShowModal: (value:boolean,) => void;
  ShowModal:boolean
}

export const UserProfileCard = ({ Userview, setShowModal,ShowModal }: Props) => {
  return (
    <>
       {/* Fondo blur */}
       <div className={ `${!ShowModal? 'hidden':'visble'} `}>
      <div className={ `fixed inset-0 bg-black/50 backdrop-blur-sm z-40  `}  />
    
      {/* Modal */}
      <div className={`py-12 w-full max-w-md bg-[#101114] rounded-xl border border-[#2a2d33] shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50`}>
        {/* Botón cerrar */}
        <button
        onClick={() => setShowModal(false)} 

          className="absolute top-4 right-4 p-2 rounded-full bg-[#1a1c20] hover:bg-yellow-300 hover:text-black transition"
          title="Cerrar"
        >
          <X size={18} />
        </button>

        {/* Foto + Estado */}
        <div className="relative w-20 h-20 mx-auto mb-4">
          <img
            src={Userview.photoURL || "photo_defect/Photodefect.png"}
            className="w-full h-full object-cover rounded-full border-2 border-yellow-300 shadow-sm cursor-pointer"
          />
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-yellow-300 rounded-full border border-[#0b0c10]" />
        </div>

        {/* Nombre + Verificado */}
        <div className="flex justify-center items-center gap-1 mb-2">
          <h2 className="text-white text-lg font-semibold truncate max-w-[180px]">
            {Userview.nombre}
          </h2>
          {Userview.verificado && <VerifiedBadge size={18} className="shrink-0" />}
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-400 text-center mb-4 px-2">
          {Userview.description || "My Zintra space!"}
        </p>

        {/* Amigos en común */}
        <p className="text-xs text-gray-500 text-center mb-6">
          {11} amigos en común
        </p>

        {/* Botones */}
        <div className="flex justify-center gap-4">
          <button className="bg-yellow-300 text-black px-4 py-2 rounded-lg shadow-md hover:bg-yellow-400 transition">
            Enviar mensaje
          </button>
          <button className="p-2 rounded-full bg-[#1a1c20] hover:bg-yellow-300 hover:text-black transition" title="Llamar">
            <Phone size={18} />
          </button>
          <button className="p-2 rounded-full bg-[#1a1c20] hover:bg-yellow-300 hover:text-black transition" title="Videollamada">
            <Video size={18} />
          </button>
        </div>
      </div>
      </div>
    </>
  );
};
