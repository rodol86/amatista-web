import { useState, useEffect } from 'react';

const NotasForm = ({ handleSubmit, nota }) => {
  const [texto, setTexto] = useState('');
  const [conRecordatorio, setConRecordatorio] = useState(false);
  const [horaRecordatorio, setHoraRecordatorio] = useState('');
  const [frecuenciaRecordatorio, setFrecuenciaRecordatorio] = useState('Diario');
  const [diaRecordatorio, setDiaRecordatorio] = useState('Lunes');
  const [recordatorioHora, setRecordatorioHora] = useState('');
  const [conVencimiento, setConVencimiento] = useState(false);
  const [vencimientoFecha, setVencimientoFecha] = useState('');

  useEffect(() => {
    if (nota) {
      setTexto(nota.texto);
      setConRecordatorio(nota.conRecordatorio);
      setHoraRecordatorio(nota.horaRecordatorio || '');
      setFrecuenciaRecordatorio(nota.frecuenciaRecordatorio || 'Diario');
      setDiaRecordatorio(nota.diaRecordatorio || 'Lunes');
      setRecordatorioHora(nota.horaRecordatorio ? nota.horaRecordatorio.substring(1) : ''); // Extract only the "HH:MM" part
      setConVencimiento(nota.conFechaVencimiento);
      setVencimientoFecha(nota.fechaVencimiento || '');
    } else {
      // Clear the form if no note is being edited
      setTexto('');
      setConRecordatorio(false);
      setHoraRecordatorio('');
      setFrecuenciaRecordatorio('Diario');
      setDiaRecordatorio('Lunes');
      setRecordatorioHora('');
      setConVencimiento(false);
      setVencimientoFecha('');
    }
  }, [nota]);

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit({
      texto,
      conRecordatorio,
      horaRecordatorio: conRecordatorio ? `T${recordatorioHora}` : '',
      frecuenciaRecordatorio,
      diaRecordatorio,
      recordatorioHora,
      conFechaVencimiento: conVencimiento,
      fechaVencimiento: conVencimiento ? vencimientoFecha : '',
    });

    // Clear the form
    setTexto('');
    setConRecordatorio(false);
    setHoraRecordatorio('');
    setFrecuenciaRecordatorio('Diario');
    setDiaRecordatorio('Lunes');
    setRecordatorioHora('');
    setConVencimiento(false);
    setVencimientoFecha('');
  };

  return (
    <form onSubmit={onSubmit} className="max-w-lg mx-auto bg-white p-6 border border-violet-300 rounded-lg shadow-md mb-6">
      <div className="mb-4">
        <label className="block text-violet-700 text-sm font-bold mb-2" htmlFor="texto">
          Texto
        </label>
        <textarea
          id="texto"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Escribe tu nota aquí..."
          rows="5"
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          id="conRecordatorio"
          type="checkbox"
          checked={conRecordatorio}
          onChange={(e) => setConRecordatorio(e.target.checked)}
          className="mr-2 leading-tight"
        />
        <label className="text-violet-700 text-sm font-bold" htmlFor="conRecordatorio">
          Con recordatorio
        </label>
      </div>
      {conRecordatorio && (
        <div className="mb-4">
          <label className="block text-violet-700 text-sm font-bold mb-2" htmlFor="frecuenciaRecordatorio">
            Frecuencia
          </label>
          <select
            id="frecuenciaRecordatorio"
            value={frecuenciaRecordatorio}
            onChange={(e) => setFrecuenciaRecordatorio(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-violet-500 mb-4"
          >
            <option value="Diario">Diario</option>
            <option value="Semanal">Semanal</option>
            <option value="Quincenal">Quincenal</option>
          </select>
          <label className="block text-violet-700 text-sm font-bold mb-2" htmlFor="diaRecordatorio">
            Día
          </label>
          <select
            id="diaRecordorio"
            value={diaRecordatorio}
            onChange={(e) => setDiaRecordatorio(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-violet-500 mb-4"
          >
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>
          <label className="block text-violet-700 text-sm font-bold mb-2" htmlFor="recordatorioHora">
            Hora
          </label>
          <input
            id="recordatorioHora"
            type="time"
            value={recordatorioHora}
            onChange={(e) => setRecordatorioHora(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      )}
      <div className="mb-4 flex items-center">
        <input
          id="conVencimiento"
          type="checkbox"
          checked={conVencimiento}
          onChange={(e) => setConVencimiento(e.target.checked)}
          className="mr-2 leading-tight"
        />
        <label className="text-violet-700 text-sm font-bold" htmlFor="conVencimiento">
          Con vencimiento
        </label>
      </div>
      {conVencimiento && (
        <div className="mt-2">
          <input
            type="datetime-local"
            value={vencimientoFecha}
            onChange={(e) => setVencimientoFecha(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      )}
      <div className="flex items-center justify-between mt-6">
        <button
          type="submit"
          className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default NotasForm;
