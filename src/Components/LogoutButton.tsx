import { auth } from "../firebase";

type Props = { onLogout: () => void };

export default function LogoutButton({ onLogout }: Props) {
  const handleLogout = async () => {
    await auth.signOut();
    onLogout();
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
      Cerrar sesión
    </button>
  );
}
