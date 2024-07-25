import React from 'react';

const AltaClienteStep1 = ({ clientData, setClientData, errors, handleNextStep }) => {
  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-violet-700">CUIT</label>
        <input
          type="text"
          className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={clientData.cuit}
          onChange={(e) => setClientData({ ...clientData, cuit: e.target.value })}
        />
        {errors.cuit && <div className="text-red-500">{errors.cuit}</div>}
      </div>
      <div className="mb-4">
        <label className="block text-violet-700">Nombre</label>
        <input
          type="text"
          className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={clientData.nombre}
          onChange={(e) => setClientData({ ...clientData, nombre: e.target.value })}
        />
        {errors.nombre && <div className="text-red-500">{errors.nombre}</div>}
      </div>
      <div className="mb-4">
        <label className="block text-violet-700">Apellido</label>
        <input
          type="text"
          className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={clientData.apellido}
          onChange={(e) => setClientData({ ...clientData, apellido: e.target.value })}
        />
        {errors.apellido && <div className="text-red-500">{errors.apellido}</div>}
      </div>
      <div className="mb-4">
        <label className="block text-violet-700">Alias</label>
        <input
          type="text"
          className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={clientData.alias}
          onChange={(e) => setClientData({ ...clientData, alias: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-violet-700">Telefono</label>
        <input
          type="text"
          className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={clientData.telefono}
          onChange={(e) => setClientData({ ...clientData, telefono: e.target.value })}
        />
        {errors.telefono && <div className="text-red-500">{errors.telefono}</div>}
      </div>
      <div className="mb-4">
        <label className="block text-violet-700">Mail</label>
        <input
          type="text"
          className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={clientData.mail}
          onChange={(e) => setClientData({ ...clientData, mail: e.target.value })}
        />
        {errors.mail && <div className="text-red-500">{errors.mail}</div>}
      </div>
      <button className="bg-violet-500 text-white py-2 px-4 rounded hover:bg-violet-600" onClick={handleNextStep}>
        Next
      </button>
    </div>
  );
};

export default AltaClienteStep1;
