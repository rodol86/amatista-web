import HomeHeader from '../components/HomeHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function AltaClienteImportacion() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [duplicateError, setDuplicateError] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      parseCSV(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFile(file);
      parseCSV(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const parseCSV = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setData(results.data);
      },
      error: function (error) {
        setMessage('Error parsing CSV file.');
        console.error(error);
      },
    });
  };

  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkForDuplicates()) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/import`, { data });
        if (response.status === 200) {
          setMessage('Data imported successfully!');
        } else {
          setMessage('Failed to import data.');
        }
      } catch (error) {
        setMessage('Error importing data.');
        console.error('API call error:', error.message, error.response ? error.response.data : 'No response data');
      }
    } else {
      setDuplicateError(true);
    }
  };

  const togglePasswords = () => {
    setShowPasswords(!showPasswords);
  };

  const checkForDuplicates = () => {
    const combinationSet = new Set();
    let hasDuplicates = false;
    data.forEach(row => {
      const combination = `${row.CUIT}-${row.Entidad}`;
      if (combinationSet.has(combination)) {
        hasDuplicates = true;
      } else {
        combinationSet.add(combination);
      }
    });
    return hasDuplicates;
  };

  useEffect(() => {
    setDuplicateError(checkForDuplicates());
  }, [data]);

  const handleRemoveRow = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HomeHeader />
      <main className="flex-grow container mx-auto p-4 bg-white">
        <h1 className="text-3xl font-bold mb-4 text-violet-700">Importar datos clientes</h1>
        <p className="mb-4 text-gray-700">Cargue un archivo CSV con los campos CUIT, Nombre, Apellido, Entidad y Contraseña.</p>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <div
            className="border-2 border-dashed border-violet-500 p-4 rounded-lg text-center cursor-pointer mb-4"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <p>Drag and drop a file here or click to select a file</p>
            <input
              id="fileInput"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          {data.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 table-auto">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b min-w-[150px]">CUIT</th>
                    <th className="py-2 px-4 border-b min-w-[150px]">Nombre</th>
                    <th className="py-2 px-4 border-b min-w-[150px]">Apellido</th>
                    <th className="py-2 px-4 border-b min-w-[150px]">Entidad</th>
                    <th className="py-2 px-4 border-b min-w-[150px] flex items-center justify-between">
                      Contraseña
                      <button
                        type="button"
                        onClick={togglePasswords}
                        className="ml-2 text-violet-500 hover:text-violet-700 focus:outline-none"
                      >
                        <FontAwesomeIcon icon={showPasswords ? faEyeSlash : faEye} />
                      </button>
                    </th>
                    <th className="py-2 px-4 border-b min-w-[50px]">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => {
                    const combination = `${row.CUIT}-${row.Entidad}`;
                    const isDuplicate = data.filter(item => `${item.CUIT}-${item.Entidad}` === combination).length > 1;
                    return (
                      <tr key={index} className={isDuplicate ? 'bg-red-100' : ''}>
                        <td className="py-2 px-4 border-b">
                          <input
                            type="text"
                            value={row.CUIT}
                            onChange={(e) => handleInputChange(index, 'CUIT', e.target.value)}
                            className="w-full border rounded px-2 py-1"
                          />
                        </td>
                        <td className="py-2 px-4 border-b">
                          <input
                            type="text"
                            value={row.Nombre}
                            onChange={(e) => handleInputChange(index, 'Nombre', e.target.value)}
                            className="w-full border rounded px-2 py-1"
                          />
                        </td>
                        <td className="py-2 px-4 border-b">
                          <input
                            type="text"
                            value={row.Apellido}
                            onChange={(e) => handleInputChange(index, 'Apellido', e.target.value)}
                            className="w-full border rounded px-2 py-1"
                          />
                        </td>
                        <td className="py-2 px-4 border-b">
                          <input
                            type="text"
                            value={row.Entidad}
                            onChange={(e) => handleInputChange(index, 'Entidad', e.target.value)}
                            className="w-full border rounded px-2 py-1"
                          />
                        </td>
                        <td className="py-2 px-4 border-b">
                          <input
                            type={showPasswords ? 'text' : 'password'}
                            value={row.Contraseña}
                            onChange={(e) => handleInputChange(index, 'Contraseña', e.target.value)}
                            className="w-full border rounded px-2 py-1"
                          />
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveRow(index)}
                            className="text-red-500 hover:text-red-700 focus:outline-none"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {duplicateError && <p className="mt-4 text-center text-red-500">Solo puede haber una clave por CUIT y Entidad</p>}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Importar
            </button>
          </div>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </form>
      </main>
      <footer className="bg-violet-800 text-white p-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} My Website. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
