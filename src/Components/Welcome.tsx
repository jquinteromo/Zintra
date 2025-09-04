import { auth } from "../firebase";

type Props = {
  onLogout: () => void;
};

export default function Welcome({ onLogout }: Props) {
  const handleLogout = async () => {
    await auth.signOut();
    onLogout();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-lg font-bold">Welcome!</p>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
}
