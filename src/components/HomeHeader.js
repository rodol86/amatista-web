import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function HomeHeader() {
  const { data: session } = useSession();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-violet-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="logo text-xl font-bold">Logo</div>
          <nav className="space-x-4">
            <Link href="/cliente" className="hover:underline text-violet-200 hover:text-white">Clientes</Link>
            <Link href="#vencimientos" className="hover:underline text-violet-200 hover:text-white">Vencimientos</Link>
          </nav>
        </div>
        {session && session.user && (
          <div className="relative" ref={dropdownRef}>
            <img 
              src={session.user.image} 
              alt={session.user.name} 
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                <div className="py-1">
                  <Link href="#profile" className="block px-4 py-2 text-gray-800 hover:bg-violet-100">Profile</Link>
                  <button 
                    onClick={() => signOut({ callbackUrl: '/' })} 
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-violet-100"
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
