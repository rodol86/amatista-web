import { useSession, getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import HomeHeader from '../components/HomeHeader';
import NotasForm from '../components/NotasForm';
import NotasList from '../components/NotasList';

export default function NotasPage() {
  const { data: session } = useSession();
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    if (session) {
      fetchNotas();
    }
  }, [session]);

  const fetchNotas = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notas/${session.userId}`); // Replace with your actual API endpoint
      const data = await response.json();
      setNotas(data);
    } catch (error) {
      console.error('Error fetching notas:', error);
    }
  };

  const handleSubmit = async (nota) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notas/${session.userId}`, { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nota),
      });

      if (response.ok) {
        const updatedNotas = await response.json();
        setNotas(updatedNotas);
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HomeHeader />
      <main className="flex-grow container mx-auto p-4 bg-white">
        <h1 className="text-3xl font-bold mb-4 text-violet-700">Notas</h1>

        <NotasForm handleSubmit={handleSubmit} />
        <NotasList notas={notas} />
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
        destination: '/login',
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
