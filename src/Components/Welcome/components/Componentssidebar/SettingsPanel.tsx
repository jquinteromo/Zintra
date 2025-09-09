import {
  LogOut,
  Moon,
  Sun,
  Eye,
  EyeOff,
  Bell,
  BellOff,
  Phone,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SettingsPanel() {
  const [darkMode, setDarkMode] = useState(true);
  const [discoverVisible, setDiscoverVisible] = useState(true);
  const [allowCalls, setAllowCalls] = useState(true);
  const [allowMessages, setAllowMessages] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (confirm("¿Seguro que quieres cerrar sesión?")) {
      await auth.signOut();
      navigate("/login");
    }
  };

  // --- Subcomponentes internos ---

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <section className="space-y-4">
      <h3 className="text-xs text-gray-400 uppercase tracking-wider px-1">
        {title}
      </h3>
      <div className="bg-[#131416] rounded-xl border border-[#2a2d33] px-6 py-6 shadow-sm space-y-4">
        {children}
      </div>
    </section>
  );

  const ToggleRow = ({
    label,
    active,
    icon,
    onToggle,
    activeLabel,
    inactiveLabel,
  }: {
    label: string;
    active: boolean;
    icon: React.ReactNode;
    onToggle: () => void;
    activeLabel: string;
    inactiveLabel: string;
  }) => (
    <div className="flex items-center justify-between">
      <span className="text-white text-sm">{label}</span>
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 ease-in-out text-xs font-normal ${
          active
            ? "bg-yellow-300 text-black shadow-sm"
            : "border border-[#2a2d33] text-gray-300 hover:bg-yellow-200 hover:text-black"
        }`}
      >
        {icon}
        {active ? activeLabel : inactiveLabel}
      </button>
    </div>
  );

  // --- Render ---
  return (
    <div className="w-full max-w-md mx-auto bg-[#0b0c10] rounded-2xl border border-[#1f2126] px-6 py-10 shadow-xl space-y-12">
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold text-white">Configuración</h2>
        <p className="text-sm text-gray-500">
          Ajusta tus preferencias de privacidad y experiencia
        </p>
      </header>

      <Section title="Preferencias visuales">
        <ToggleRow
          label="Tema"
          active={darkMode}
          icon={darkMode ? <Moon size={16} /> : <Sun size={16} />}
          onToggle={() => setDarkMode(!darkMode)}
          activeLabel="Oscuro"
          inactiveLabel="Claro"
        />
      </Section>

      <Section title="Privacidad">
        <ToggleRow
          label="Mostrar perfil en Discover"
          active={discoverVisible}
          icon={discoverVisible ? <Eye size={16} /> : <EyeOff size={16} />}
          onToggle={() => setDiscoverVisible(!discoverVisible)}
          activeLabel="Visible"
          inactiveLabel="Oculto"
        />
        <ToggleRow
          label="Permitir llamadas"
          active={allowCalls}
          icon={<Phone size={16} />}
          onToggle={() => setAllowCalls(!allowCalls)}
          activeLabel="Activado"
          inactiveLabel="Desactivado"
        />
        <ToggleRow
          label="Permitir mensajes"
          active={allowMessages}
          icon={<MessageCircle size={16} />}
          onToggle={() => setAllowMessages(!allowMessages)}
          activeLabel="Activado"
          inactiveLabel="Desactivado"
        />
      </Section>

      <Section title="Notificaciones">
        <ToggleRow
          label="Sonidos de notificación"
          active={soundEnabled}
          icon={soundEnabled ? <Bell size={16} /> : <BellOff size={16} />}
          onToggle={() => setSoundEnabled(!soundEnabled)}
          activeLabel="Activado"
          inactiveLabel="Silenciado"
        />
      </Section>

      <footer className="pt-6 border-t border-[#2a2d33]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 transition text-sm font-medium"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </footer>
    </div>
  );
}
