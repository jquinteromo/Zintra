
export default function ChatWindow() {


  return (
<div className="flex flex-col justify-between h-screen w-full bg-gray-50">
  {/* Encabezado del chat */}
  <div className="p-4 border-b bg-white">
    <h2 className="text-lg font-semibold">Chat with Alex Chen</h2>
    <p className="text-sm text-gray-500">Last seen: 2:30 PM</p>
  </div>

  {/* Mensajes */}
  <div className="flex-1 overflow-y-auto p-4 space-y-4">
    <div className="flex flex-col">
      <div className="text-sm text-gray-600 mb-1">Alex Chen (2:29 PM)</div>
      <div className="bg-white p-3 rounded shadow w-fit max-w-md">Hey, are we still on for the meeting tomorrow?</div>
    </div>
    <div className="flex flex-col items-end">
      <div className="text-sm text-gray-600 mb-1">John Doe (2:29 PM)</div>
      <div className="bg-blue-500 text-white p-3 rounded shadow w-fit max-w-md">Yes, absolutely! I have everything prepared.</div>
    </div>
    <div className="flex flex-col">
      <div className="text-sm text-gray-600 mb-1">Alex Chen (2:30 PM)</div>
      <div className="bg-white p-3 rounded shadow w-fit max-w-md">Perfect. Should we meet at the usual conference room?</div>
    </div>
    <div className="flex flex-col items-end">
      <div className="text-sm text-gray-600 mb-1">John Doe (2:30 PM)</div>
      <div className="bg-blue-500 text-white p-3 rounded shadow w-fit max-w-md">That works for me. See you at 10 AM sharp.</div>
    </div>
  </div>

  {/* Input de mensaje */}
  <div className="p-4 border-t bg-white">
    <input
      type="text"
      placeholder="Type a message..."
      className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"
    />
  </div>
</div>


  );
}