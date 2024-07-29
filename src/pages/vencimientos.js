import HomeHeader from '../components/HomeHeader';
import CalendarComponent from '../components/Calendar';

export default function VencimientosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HomeHeader />
      <main className="flex-grow container mx-auto p-4 bg-white">
        <h1 className="text-3xl font-bold mb-4 text-violet-700">Vencimientos</h1>
        <p className="text-gray-700 mb-4">Here you can manage your vencimientos.</p>
        <CalendarComponent />
      </main>
      <footer className="bg-violet-800 text-white p-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} My Website. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
