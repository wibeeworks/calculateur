import React from 'react';

const PremiumFeatures = () => {
  const handlePurchase = () => {
    // Logic for handling the purchase of premium features
  };

  return (
    <div className="premium-features">
      <h2>Fonctionnalités Premium</h2>
      <ul>
        <li>Exportation des données vers Excel</li>
        <li>Historique des calculs</li>
        <li>Valeurs préremplies</li>
        <li>Ajout de réductions</li>
        <li>Système de compte avec Firebase</li>
        <li>Paiement sécurisé avec Stripe</li>
      </ul>
      <button onClick={handlePurchase} className="purchase-button">
        Acheter Premium
      </button>
    </div>
  );
};

export default PremiumFeatures;