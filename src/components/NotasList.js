import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';

const NotasList = ({ notas }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notas.map((nota) => (
        <NotaCard key={nota.id} nota={nota} />
      ))}
    </div>
  );
};

const NotaCard = ({ nota }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="relative bg-white p-4 border border-violet-300 rounded-lg shadow-md">
      {nota.conFechaVencimiento && (
        <div className="absolute top-2 right-2 border border-violet-500 rounded p-1">
          <p className="text-violet-700 text-sm font-bold">
            {new Date(nota.fechaVencimiento).toLocaleDateString()} {new Date(nota.fechaVencimiento).toLocaleTimeString()}
          </p>
        </div>
      )}
      <h2 className="text-violet-700 text-lg font-bold mb-2">Nota {nota.id}</h2>
      <p
        className={`text-gray-700 mb-2 ${expanded ? '' : 'line-clamp-3'}`}
        style={{ whiteSpace: 'pre-wrap' }}
        onClick={toggleExpanded}
      >
        {nota.texto}
      </p>
      {nota.conRecordatorio && (
        <div className="text-gray-700 mb-2">
          <button
            className="text-violet-500 hover:text-violet-700 focus:outline-none"
            data-tooltip-id={`tooltip-${nota.id}`}
            data-tooltip-content={`Tiene recordatorio ${nota.frecuenciaRecordatorio} los días ${nota.diaRecordatorio} a las ${nota.horaRecordatorio}`}
          >
            <FontAwesomeIcon icon={faBell} />
          </button>
          <Tooltip id={`tooltip-${nota.id}`} place="top" effect="solid" className="z-10" />
        </div>
      )}
    </div>
  );
};

export default NotasList;
