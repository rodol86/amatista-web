import HomeHeader from '../components/HomeHeader';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Cliente() {
  const [clients, setClients] = useState([]);
  const router = useRouter();
  
  useEffect(() => {
    // Call the API to get clients data on component mount
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/clients`)
      .then(response => {
        if (response.status === 200) {
          setClients(response.data);
        } else {
          console.error('Failed to fetch clients');
        }
      })
      .catch(error => {
        console.error('API call error:', error);
      });
  }, []);

  const handleAddClientClick = () => {
    router.push('/altaCliente');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HomeHeader />
      <main className="flex-grow container mx-auto p-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Gestión de Clientes</h1>
          <button onClick={handleAddClientClick} className="bg-blue-500 text-white py-2 px-4 rounded">Agregar cliente</button>
        </div>
        {clients.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="py-2 px-4 border-b">{client.id}</td>
                  <td className="py-2 px-4 border-b">{client.name}</td>
                  <td className="py-2 px-4 border-b">{client.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay clientes</p>
        )}
      </main>
      <footer className="bg-violet-800 text-white p-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} My Website. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
