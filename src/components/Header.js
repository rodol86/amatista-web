import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <header className="bg-violet-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="logo text-xl font-bold">Logo</div>
          <nav className="space-x-4">
            <a href="#faqs" className="hover:underline">FAQs</a>
            <a href="#about-us" className="hover:underline">About Us</a>
          </nav>
        </div>
        <AuthButton />
      </div>
    </header>
  );
}
