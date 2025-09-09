import {  Check, UserPlus } from "lucide-react";

type ChatItemProps = {
  name: string;
  message: string;
  time: string;
  unreadCount?: number;
  friendRequest?: boolean;
};

function ChatItem({ name, message, time, unreadCount, friendRequest }: ChatItemProps) {
  return (
    <div className="cursor-pointer flex items-center justify-between px-5 py-4 hover:bg-[#1a1c20] transition rounded-xl">
      {/* Avatar */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold shadow-md">
          {name.charAt(0)}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-semibold">{name}</span>
            {friendRequest && (
              <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-yellow-400 text-black font-medium">
                <UserPlus size={12} /> Amistad
              </span>
            )}
          </div>

          {!friendRequest && (
            <span className="text-xs text-gray-400 truncate max-w-[180px]">
              {message}
            </span>
          )}
        </div>
      </div>

      {/* Estado derecho */}
      <div className="flex flex-col items-end gap-1 min-w-[50px]">
        <span className="text-[11px] text-gray-500">{time}</span>
        {friendRequest ? (
          <div className="flex gap-2">
            {/* <button className="px-2 py-0.5 text-xs rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300">
              Aceptar
            </button>
            <button className="px-2 py-0.5 text-xs rounded-lg bg-[#2a2d33] text-gray-300 hover:bg-[#3a3d44]">
              Rechazar
            </button> */}
          </div>
        ) : unreadCount && unreadCount > 0 ? (
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-400 text-black shadow-sm">
            {unreadCount}
          </span>
        ) : (
          <Check size={16} className="text-gray-500" />
        )}
      </div>
    </div>
  );
}

export default function ChatList() {
  return (
    <div className="w-full max-w-md mx-auto bg-[#0b0c10] rounded-2xl border border-[#1f2126] shadow-xl divide-y divide-[#1f2126]">
      <ChatItem
        name="María"
        message="¿Cómo estás? 👋"
        time="10:24"
        unreadCount={2}
      />
      <ChatItem
        name="Carlos"
        message="Genial, nos vemos mañana!"
        time="Ayer"
        unreadCount={0}
      />
      <ChatItem
        name="Ana"
        message="Como estas?"
        time="2d"
        unreadCount={2}
      />
    </div>
  );
}
