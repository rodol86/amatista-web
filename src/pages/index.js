import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-violet-800">Welcome to our Website</h1>
        <p className="text-gray-700 text-balance">This is the body content.</p>
      </main>
      <Footer />
    </div>
  );
}
