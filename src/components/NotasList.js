const NotasList = ({ notas }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notas.map((nota) => (
          <div key={nota.id} className="relative bg-white p-4 border border-violet-300 rounded-lg shadow-md">
            {nota.conFechaVencimiento && (
              <div className="absolute top-2 right-2 border border-violet-500 rounded p-1">
                <p className="text-violet-700 text-sm font-bold">
                  {new Date(nota.fechaVencimiento).toLocaleDateString()} {new Date(nota.fechaVencimiento).toLocaleTimeString()}
                </p>
              </div>
            )}
            <h2 className="text-violet-700 text-lg font-bold mb-2">Nota {nota.id}</h2>
            <p className="text-gray-700 mb-2">{nota.texto}</p>
            {nota.conRecordatorio && (
              <div className="text-gray-700 mb-2">
                <p><strong>Tiene recordatorio {nota.frecuenciaRecordatorio} los días {nota.diaRecordatorio} a las {nota.horaRecordatorio}</strong></p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default NotasList;
  