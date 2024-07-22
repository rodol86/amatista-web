import AuthButton from "../components/AuthButton";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-violet-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="logo text-xl font-bold">Logo</div>
          <nav className="space-x-4">
            <a href="#faqs" className="hover:underline">FAQs</a>
            <a href="#about-us" className="hover:underline">About Us</a>
            <AuthButton />
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-violet-800">Welcome to our Website</h1>
        <p className="text-gray-700 text-balance">This is the body content.</p>
      </main>
      <footer className="bg-violet-800 text-white p-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} My Website. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
