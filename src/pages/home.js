import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import HomeHeader from '../components/HomeHeader';

export default function HomePage({ session }) {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Replace with your actual API endpoint
    const fetchData = async () => {
      const response = await fetch('/api/your-endpoint');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HomeHeader />
      <main className="flex-grow container mx-auto p-4 bg-white">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
        {session?.user && <p>Hello, {session.user.name}!</p>}
        
        <div className="grid grid-cols-3 gap-4">
          <button
            id="component-1"
            className="col-span-1 border border-violet-800 p-4 bg-violet-200 text-black hover:bg-violet-400"
            onClick={() => router.push('/cliente')}
          >
            Clientes
          </button>
          <button id="component-2" className="col-span-1 border border-violet-800 p-4 bg-violet-200 text-black hover:bg-violet-400">2</button>
          <div id="component-5" className="col-span-1 row-span-2 border border-black p-4 bg-white">
            {data.length > 0 ? (
              data.map((item, index) => (
                <div key={index} className="p-2 border-b border-gray-200">
                  <h2 className="font-bold">Impuesto: {item.impuesto}</h2>
                  <p>Cuit Desde: {item.cuitDesde}</p>
                  <p>Cuit Hasta: {item.cuitHasta}</p>
                  <p>Fecha Vencimiento: {item.fechaVencimiento}</p>
                  <div>
                    <h3 className="font-semibold">Clientes:</h3>
                    {item.clientes.map((cliente) => (
                      <div key={cliente.id} className="ml-4">
                        <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                        <p>CUIT: {cliente.cuit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                <p className="text-xl font-bold">No hay vencimientos</p>
                <p className="text-4xl">😊</p>
              </div>
            )}
          </div>
          <button id="component-3" className="col-span-1 border border-violet-800 p-4 bg-violet-200 text-black hover:bg-violet-400">3</button>
          <button id="component-4" className="col-span-1 border border-violet-800 p-4 bg-violet-200 text-black hover:bg-violet-400">4</button>
        </div>
        
      </main>
      <footer className="bg-violet-800 text-white p-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} My Website. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
