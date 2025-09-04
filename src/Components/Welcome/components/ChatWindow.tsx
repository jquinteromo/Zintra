
export default function Sidebar() {


  return (
    <div className="w-72 bg-white border-r h-screen flex flex-col justify-between">
  {/* Perfil */}
  <div className="p-4 border-b">
    <div className="flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-gray-200 mb-2"></div>
      <h2 className="text-lg font-semibold">John Doe</h2>
      <p className="text-sm text-gray-500">Software Engineer</p>
      <p className="text-xs text-green-600 mt-1">Available</p>
      <p className="text-xs text-gray-400 mt-1">📞 8851-4921</p>
    </div>
  </div>

  {/* Navegación */}
  <div className="flex flex-col gap-2 p-4">
    <button className="text-left px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium">
      Chats
    </button>
    <button className="text-left px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium">
      Profile
    </button>
    <button className="text-left px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium">
      Settings
    </button>
    <button className="text-left px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium">
      Discover
    </button>
    <button className="text-left px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium">
      Friends (4)
    </button>
  </div>
</div>

  );
}