import { auth } from "../firebase";

type Props = {
  userName: string;
  onLogout: () => void;
};

export default function Home({ userName, onLogout }: Props) {
  const handleLogout = async () => {
    await auth.signOut();
    onLogout();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <p className="text-lg font-bold">Bienvenido {userName}</p>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Cerrar sesión</button>
    </div>
  );
}
