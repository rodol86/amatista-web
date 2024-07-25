import React, { useEffect, useState } from 'react';

const AltaClienteStep2 = ({ clientData, setClientData, credentials, setCredentials, handlePreviousStep, handleNextStep }) => {
  const [availableOptions, setAvailableOptions] = useState(['AFIP', 'AGIP']);
  const [showPasswords, setShowPasswords] = useState({});

  useEffect(() => {
    setCredentials({ ...credentials, usuario: clientData.cuit });
  }, [clientData.cuit]);

  useEffect(() => {
    const usedOptions = clientData.credenciales.map(cred => cred.tipo);
    setAvailableOptions(['AFIP', 'AGIP'].filter(option => !usedOptions.includes(option)));
  }, [clientData.credenciales]);

  const handleDelete = (index) => {
    const newCredenciales = [...clientData.credenciales];
    const [deletedCredencial] = newCredenciales.splice(index, 1);
    setClientData({ ...clientData, credenciales: newCredenciales });
    setAvailableOptions([...availableOptions, deletedCredencial.tipo]);
    setShowPasswords((prev) => {
      const newShowPasswords = { ...prev };
      delete newShowPasswords[index];
      return newShowPasswords;
    });
  };

  const toggleShowPassword = (index) => {
    setShowPasswords((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCredentialAdd = () => {
    setClientData((prevData) => ({
      ...prevData,
      credenciales: [...prevData.credenciales, credentials],
    }));
    setCredentials({ tipo: availableOptions[0], usuario: clientData.cuit, contraseña: '' });
  };

  const allOptionsAdded = availableOptions.length === 0;

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <dl>
          <div className="flex">
            <dt className="font-medium w-24 text-violet-700">Nombre:</dt>
            <dd>{clientData.nombre}</dd>
          </div>
          <div className="flex">
            <dt className="font-medium w-24 text-violet-700">Apellido:</dt>
            <dd>{clientData.apellido}</dd>
          </div>
          <div className="flex">
            <dt className="font-medium w-24 text-violet-700">CUIT:</dt>
            <dd>{clientData.cuit}</dd>
          </div>
        </dl>
      </div>
      <div className="mb-4">
        <label className="block text-violet-700">Tipo</label>
        <select
          className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={credentials.tipo}
          onChange={(e) => setCredentials({ ...credentials, tipo: e.target.value })}
          disabled={allOptionsAdded}
        >
          {availableOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-violet-700">Usuario</label>
        <input
          type="text"
          className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={credentials.usuario}
          onChange={(e) => setCredentials({ ...credentials, usuario: e.target.value })}
          disabled={allOptionsAdded}
        />
      </div>
      <div className="mb-4">
        <label className="block text-violet-700">Contraseña</label>
        <input
          type="password"
          className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={credentials.contraseña}
          onChange={(e) => setCredentials({ ...credentials, contraseña: e.target.value })}
          disabled={allOptionsAdded}
        />
      </div>
      <button
        className={`bg-violet-500 text-white py-2 px-4 rounded mb-4 ${allOptionsAdded ? 'opacity-50 cursor-not-allowed' : 'hover:bg-violet-600'}`}
        onClick={handleCredentialAdd}
        disabled={allOptionsAdded}
      >
        Agregar credencial
      </button>
      {clientData.credenciales.length > 0 && (
        <table className="min-w-full bg-white border border-gray-200 max-w-xs">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Tipo</th>
              <th className="py-2 px-4 border-b">Usuario</th>
              <th className="py-2 px-4 border-b">Contraseña</th>
              <th className="py-2 px-4 border-b"></th> {/* Hide the title for Acciones */}
            </tr>
          </thead>
          <tbody>
            {clientData.credenciales.map((credencial, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{credencial.tipo}</td>
                <td className="py-2 px-4 border-b">{credencial.usuario}</td>
                <td className="py-2 px-4 border-b">
                  {showPasswords[index] ? credencial.contraseña : '••••••••'}
                  <button
                    className="ml-2 text-blue-500 hover:underline"
                    onClick={() => toggleShowPassword(index)}
                  >
                    {showPasswords[index] ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825a10.05 10.05 0 0 0 4.126-3.223m1.466-3.827c.014-.017.029-.034.043-.051m-1.509-3.88a10.05 10.05 0 0 0-4.142-3.192m-2.342-1.38A8.993 8.993 0 0 0 12 3c-3.016 0-5.755 1.264-7.6 3.342m-1.485 3.819c-.015.017-.03.034-.043.051M4.08 12.6a10.05 10.05 0 0 0 3.906 3.24M6.03 7.093l9.192 9.192M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 0 1-3 3m6 0a3 3 0 0 1-3-3m0 0a3 3 0 1 1-6 0m6 0a3 3 0 1 0-6 0m0 0c0 1.657-1.343 3-3 3m0 0c1.657 0 3-1.343 3-3m0 0a3 3 0 1 0-6 0" />
                      </svg>
                    )}
                  </button>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                    onClick={() => handleDelete(index)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-4">
        <button className="bg-violet-500 text-white py-2 px-4 rounded mr-2 hover:bg-violet-600" onClick={handlePreviousStep}>
          Previous
        </button>
        <button className="bg-violet-500 text-white py-2 px-4 rounded hover:bg-violet-600" onClick={handleNextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AltaClienteStep2;
