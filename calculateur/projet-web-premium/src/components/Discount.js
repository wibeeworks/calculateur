import React, { useState } from 'react';

const Discount = ({ onApplyDiscount }) => {
  const [discountCode, setDiscountCode] = useState('');
  const [error, setError] = useState('');

  const handleApplyDiscount = () => {
    if (discountCode.trim() === '') {
      setError('Veuillez entrer un code de réduction.');
      return;
    }

    // Simulate discount validation
    const validDiscounts = ['PROMO10', 'SAVE20'];
    if (validDiscounts.includes(discountCode)) {
      onApplyDiscount(discountCode);
      setDiscountCode('');
      setError('');
    } else {
      setError('Code de réduction invalide.');
    }
  };

  return (
    <div className="discount-container">
      <h3>Ajouter un code de réduction</h3>
      <input
        type="text"
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
        placeholder="Entrez votre code"
      />
      <button onClick={handleApplyDiscount}>Appliquer</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Discount;