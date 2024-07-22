import HomeHeader from '../components/HomeHeader';

export default function Cliente() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HomeHeader />
      <main className="flex-grow container mx-auto p-4 bg-white">
        <h1 className="text-3xl font-bold mb-4">Alta de Clientes</h1>
        <p>Form or content for client registration goes here.</p>
      </main>
      <footer className="bg-violet-800 text-white p-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} My Website. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
