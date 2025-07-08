import React, { useEffect, useState } from 'react';
import { getHistory } from '../utils/historyUtils';

const History = () => {
  const [calculations, setCalculations] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const historyData = await getHistory();
      setCalculations(historyData);
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h2>Historique des Calculs</h2>
      {calculations.length === 0 ? (
        <p>Aucun calcul enregistré.</p>
      ) : (
        <ul>
          {calculations.map((calc, index) => (
            <li key={index}>
              <div>
                <strong>Calcul {index + 1}:</strong> {calc.description} - {calc.result}€
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;