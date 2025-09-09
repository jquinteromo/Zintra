import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import VerifiedBadge from "../../../../Verification✔/VerifiedBadge";

import { ArrowLeft,MessageCircle } from "lucide-react";
import { useState } from "react";
import { UserProfileCard } from "../../../UserProfileCard";

import { StatesDiscover } from "../../../../States/StatesDiscover";

interface Props {
  nombre: string;
  description: string;
  photoURL: string;
  verificado?: boolean;
  uid :string
}

const UserCard :Props={
  nombre: "",
  description: "",
  photoURL: "",
  verificado: false,
  uid :""
} 

interface HijoProps {
  setShowWindos: (value: string) => void;
}

const UsersZintra = collection(db, "users");
const snapshot = await getDocs(UsersZintra);

const allUsers = snapshot.docs.map((doc) => {
  const { nombre, photoURL, verificado,description } = doc.data();
  return { uid: doc.id, nombre, photoURL, verificado,description };
});


const truncateNombre = (nombre: string) => {

  return nombre.length > 15 ? nombre.slice(0, 15) + "..." : nombre;
};

const Discover = ({ setShowWindos }: HijoProps) => {

  
  const {
      ShowModal,
       setShowModal,
    } = StatesDiscover();
  const [busqueda, setBusqueda] = useState("");

  const filtrados = allUsers.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const [Userview,setUserview] = useState<Props>(UserCard)

  //  useEffect(() => {
  //     console.log(allUsers)
  //   }, []);
  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-[#0b0c10] rounded-xl border border-[#1f2126] shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => {
            setShowWindos("Profile");
          }}
          className="p-2 rounded-full hover:bg-[#1a1c20] transition"
          title="Volver"
        >
          <ArrowLeft size={20} className="text-yellow-300" />
        </button>
        <div>
          <h2 className="text-xl font-semibold text-white">Descubrir</h2>
          <p className="text-sm text-gray-400">
            Encuentra y conecta con más personas en{" "}
            <span className="text-yellow-300 font-medium">Zintra</span>
          </p>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar usuario..."
        className="w-full mb-5 px-4 py-2 rounded-lg bg-[#1a1c20] text-white border border-[#2a2d33] focus:outline-none focus:ring-2 focus:ring-yellow-300 placeholder:text-gray-500 transition"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
<UserProfileCard setShowModal={setShowModal} ShowModal={ShowModal} Userview={Userview}></UserProfileCard>
      {/* Lista de usuarios */}
      <ul className="space-y-4">
        {filtrados.map((u) => (
          <li
            key={u.uid}
            onClick={() => {setUserview(u);
              setShowModal(true)
              }
            }
            className="flex items-center justify-between bg-gradient-to-r cursor-pointer  from-[#101114] to-[#1a1c20] p-4 rounded-xl border border-[#2a2d33] hover:border-yellow-300 hover:shadow-[0_0_12px_rgba(253,224,71,0.3)] transition-all duration-200"
          >
            {/* Foto + Nombre */}

            <div className="flex items-center gap-3 min-w-0 flex-1">
              <img
                src={u.photoURL || "photo_defect/Photodefect.png"}
                alt={u.nombre}
                className="w-12 h-12 rounded-full object-cover border border-[#2a2d33] shadow-sm"
              />
              <div className="flex items-center gap-1 overflow-hidden">
                <span
                  className="text-white font-medium text-sm tracking-wide whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]"
                  title={u.nombre}
                >
                  {truncateNombre(u?.nombre ?? "Cargando...")}
                </span>
                {u?.verificado && (
                  <VerifiedBadge size={16} className="shrink-0 mr-2" />
                )}
              </div>
            </div>

            {/* Botón mensaje */}
            <button
              className="bg-yellow-300 text-black p-2 rounded-full hover:bg-yellow-400 transition duration-150 shadow-md"
              title="Enviar mensaje"
            >
              <MessageCircle size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Discover;
