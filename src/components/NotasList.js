import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';

const NotasList = ({ notas, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notas.map((nota) => (
        <NotaCard key={nota.id} nota={nota} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

const NotaCard = ({ nota, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="relative bg-white p-4 border border-violet-300 rounded-lg shadow-md">
      <div className="flex justify-between mb-2">
        {nota.conRecordatorio && (
          <div className="text-gray-700">
            <button
              className="text-violet-500 hover:text-violet-700 focus:outline-none"
              data-tooltip-id={`tooltip-${nota.id}`}
              data-tooltip-content={`Tiene recordatorio ${nota.frecuenciaRecordatorio} los días ${nota.diaRecordatorio} a las ${nota.horaRecordatorio.substring(1)}`}
            >
              <FontAwesomeIcon icon={faBell} />
            </button>
            <Tooltip id={`tooltip-${nota.id}`} place="top" effect="solid" className="z-10" />
          </div>
        )}
        <div className="flex space-x-2">
          <button
            className="text-violet-500 hover:text-violet-700 focus:outline-none"
            onClick={() => onEdit(nota)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="text-violet-500 hover:text-violet-700 focus:outline-none"
            onClick={() => onDelete(nota.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      <p
        className={`text-gray-700 mb-2 ${expanded ? '' : 'line-clamp-3'}`}
        style={{ whiteSpace: 'pre-wrap', cursor: 'pointer' }}
        onClick={toggleExpanded}
      >
        {nota.texto}
      </p>
      {nota.conFechaVencimiento && (
        <div className="flex justify-end mt-4">
          <div className="border border-violet-500 rounded p-1 text-violet-700 text-sm font-bold">
            {new Date(nota.fechaVencimiento).toLocaleDateString()} {new Date(nota.fechaVencimiento).toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotasList;
