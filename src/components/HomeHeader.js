import { useSession, signOut } from "next-auth/react";

export default function HomeHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-violet-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="logo text-xl font-bold">Logo</div>
          <nav className="space-x-4">
            <a href="#clientes" className="hover:underline text-violet-200 hover:text-white">Clientes</a>
            <a href="#vencimientos" className="hover:underline text-violet-200 hover:text-white">Vencimientos</a>
          </nav>
        </div>
        {session && session.user && (
          <div className="relative group">
            <img 
              src={session.user.image} 
              alt={session.user.name} 
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="py-1">
                <a href="#profile" className="block px-4 py-2 text-gray-800 hover:bg-violet-100">Profile</a>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })} 
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-violet-100"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
