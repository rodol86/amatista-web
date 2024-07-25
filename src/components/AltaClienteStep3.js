import React from 'react';

const AltaClienteStep3 = ({ clientData, handlePreviousStep, handleSubmit }) => {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-violet-700">Confirmar datos</h2>
      <p><strong className="text-violet-700">CUIT:</strong> {clientData.cuit}</p>
      <p><strong className="text-violet-700">Nombre:</strong> {clientData.nombre}</p>
      <p><strong className="text-violet-700">Apellido:</strong> {clientData.apellido}</p>
      <p><strong className="text-violet-700">Alias:</strong> {clientData.alias}</p>
      <p><strong className="text-violet-700">Telefono:</strong> {clientData.telefono}</p>
      <p><strong className="text-violet-700">Mail:</strong> {clientData.mail}</p>
      <h3 className="text-xl font-bold mt-4 text-violet-700">Credenciales</h3>
      <table className="min-w-full bg-white border border-gray-200 max-w-xs">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Tipo</th>
            <th className="py-2 px-4 border-b">Usuario</th>
          </tr>
        </thead>
        <tbody>
          {clientData.credenciales.map((credencial, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{credencial.tipo}</td>
              <td className="py-2 px-4 border-b">{credencial.usuario}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button className="bg-violet-500 text-white py-2 px-4 rounded mr-2 hover:bg-violet-600" onClick={handlePreviousStep}>
          Previous
        </button>
        <button className="bg-violet-500 text-white py-2 px-4 rounded hover:bg-violet-600" onClick={handleSubmit}>
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default AltaClienteStep3;
