import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('YOUR_PUBLIC_STRIPE_KEY');

export const handlePayment = async (amount) => {
    const stripe = await stripePromise;

    const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
    });

    const sessionId = await response.json();

    const result = await stripe.redirectToCheckout({
        sessionId: sessionId.id,
    });

    if (result.error) {
        console.error(result.error.message);
    }
};

export const createPaymentBadge = () => {
    return (
        <div className="payment-badge">
            <img src="https://stripe.com/img/v3/home/social.png" alt="Secure Payment" />
            <p>Paiement sécurisé par Stripe</p>
        </div>
    );
};