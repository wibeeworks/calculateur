import React, { useState } from 'react';

const PreFilledValues = ({ onFill }) => {
  const [values, setValues] = useState({
    rushDuration: 60,
    finalDuration: 20,
    povCount: 3,
    complexity: 5,
    deadline: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFill = () => {
    onFill(values);
  };

  return (
    <div className="pre-filled-values">
      <h2>Valeurs Préremplies</h2>
      <label>
        Durée des rushs bruts (minutes):
        <input
          type="number"
          name="rushDuration"
          value={values.rushDuration}
          onChange={handleChange}
        />
      </label>
      <label>
        Durée finale souhaitée (minutes):
        <input
          type="number"
          name="finalDuration"
          value={values.finalDuration}
          onChange={handleChange}
        />
      </label>
      <label>
        Nombre de POV:
        <input
          type="number"
          name="povCount"
          value={values.povCount}
          onChange={handleChange}
        />
      </label>
      <label>
        Complexité (1-10):
        <input
          type="number"
          name="complexity"
          value={values.complexity}
          onChange={handleChange}
          min="1"
          max="10"
        />
      </label>
      <label>
        Délai (jours):
        <input
          type="number"
          name="deadline"
          value={values.deadline}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleFill}>Remplir les valeurs</button>
    </div>
  );
};

export default PreFilledValues;