import HomeHeader from '../components/HomeHeader';
import { useState } from 'react';
import axios from 'axios';
import AltaClienteStep1 from '../components/AltaClienteStep1';
import AltaClienteStep2 from '../components/AltaClienteStep2';
import AltaClienteStep3 from '../components/AltaClienteStep3';

export default function AltaClienteManual() {
  const [step, setStep] = useState(1);
  const [clientData, setClientData] = useState({
    cuit: '',
    nombre: '',
    apellido: '',
    alias: '',
    telefono: '',
    mail: '',
    credenciales: [],
  });

  const [credentials, setCredentials] = useState({
    tipo: 'AFIP',
    usuario: '',
    contraseña: '',
  });

  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    if (!clientData.cuit) newErrors.cuit = 'CUIT is required';
    else if (!/^\d{11}$/.test(clientData.cuit)) newErrors.cuit = 'CUIT must be 11 numeric characters';
    
    if (!clientData.nombre) newErrors.nombre = 'Nombre is required';
    if (!clientData.apellido) newErrors.apellido = 'Apellido is required';
    if (!clientData.telefono) newErrors.telefono = 'Telefono is required';
    if (!clientData.mail) newErrors.mail = 'Mail is required';
    else if (!/\S+@\S+\.\S+/.test(clientData.mail)) newErrors.mail = 'Mail is invalid';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleCredentialAdd = () => {
    setClientData({
      ...clientData,
      credenciales: [...clientData.credenciales, credentials],
    });
    setCredentials({ tipo: 'AFIP', usuario: clientData.cuit, contraseña: '' });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/submit`, clientData);
      if (response.status === 200) {
        console.log('Data submitted successfully:', response.data);
      } else {
        console.error('Failed to submit data:', response.status);
      }
    } catch (error) {
      console.error('API call error:', error.message, error.response ? error.response.data : 'No response data');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HomeHeader />
      <main className="flex-grow container mx-auto p-4 bg-white">
        <h1 className="text-3xl font-bold mb-4 text-violet-700">Alta de Cliente</h1>
        <div className="mb-4">
          <div className={`inline-block mr-2 ${step === 1 ? 'font-bold text-violet-700' : ''}`}>1. Alta cliente</div>
          <div className={`inline-block mr-2 ${step === 2 ? 'font-bold text-violet-700' : ''}`}>2. Credenciales</div>
          <div className={`inline-block ${step === 3 ? 'font-bold text-violet-700' : ''}`}>3. Confirmar datos</div>
        </div>
        {step === 1 && (
          <AltaClienteStep1
            clientData={clientData}
            setClientData={setClientData}
            errors={errors}
            handleNextStep={handleNextStep}
          />
        )}
        {step === 2 && (
          <AltaClienteStep2
            clientData={clientData}
            setClientData={setClientData}
            credentials={credentials}
            setCredentials={setCredentials}
            handleCredentialAdd={handleCredentialAdd}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        )}
        {step === 3 && (
          <AltaClienteStep3
            clientData={clientData}
            handlePreviousStep={handlePreviousStep}
            handleSubmit={handleSubmit}
          />
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
