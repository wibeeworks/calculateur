import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentBadge = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log('Payment Method:', paymentMethod);
      // Handle successful payment method creation (e.g., send to your server)
    }
  };

  return (
    <div className="payment-badge">
      <h3>Secure Payment</h3>
      <form onSubmit={handlePayment}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentBadge;