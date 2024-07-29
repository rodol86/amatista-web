import HomeHeader from '../components/HomeHeader';
import { useRouter } from 'next/router';

export default function AltaCliente() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HomeHeader />
      <main className="flex-grow container mx-auto p-4 bg-white">
        <h1 className="text-3xl font-bold mb-4 text-violet-700">Alta de Cliente</h1>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push('/altaClienteImportacion')}
            className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Importar datos clientes
          </button>
          <button
            onClick={() => router.push('/altaClienteManual')}
            className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Carga manual
          </button>
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
