
export default function ChatWindow() {


  return (
<div className="flex flex-col justify-between h-screen w-full bg-[#1a1c20] text-white">
  {/* Encabezado */}
  <div className="p-4 border-b border-[#1f2126] bg-[#0b0c10]">
    <h2 className="text-lg font-semibold">Chat with Alex Chen</h2>
    <p className="text-sm text-gray-400">Last seen: 2:30 PM</p>
  </div>

  {/* Mensajes */}
  <div className="flex-1 overflow-y-auto p-4 space-y-4">
    <div className="flex flex-col">
      <div className="text-xs text-gray-500 mb-1">Alex Chen (2:29 PM)</div>
      <div className="bg-[#2a2d33] p-3 rounded-lg max-w-md w-fit">Hey, are we still on for the meeting tomorrow?</div>
    </div>
    <div className="flex flex-col items-end">
      <div className="text-xs text-gray-500 mb-1">John Doe (2:29 PM)</div>
      <div className="bg-yellow-300 text-black p-3 rounded-lg max-w-md w-fit">Yes, absolutely! I have everything prepared.</div>
    </div>
    <div className="flex flex-col">
      <div className="text-xs text-gray-500 mb-1">Alex Chen (2:30 PM)</div>
      <div className="bg-[#2a2d33] p-3 rounded-lg max-w-md w-fit">Perfect. Should we meet at the usual conference room?</div>
    </div>
    <div className="flex flex-col items-end">
      <div className="text-xs text-gray-500 mb-1">John Doe (2:30 PM)</div>
      <div className="bg-yellow-300 text-black p-3 rounded-lg max-w-md w-fit">That works for me. See you at 10 AM sharp.</div>
    </div>
  </div>

  {/* Input */}
  <div className="p-4 border-t border-[#1f2126] bg-[#0b0c10]">
    <input
      type="text"
      placeholder="Type a message..."
      className="w-full bg-[#1a1c20] border border-[#2a2d33] rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
    />
  </div>
</div>



  );
}