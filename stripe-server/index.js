const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const { resolve } = require('path');
require('dotenv').config({ path: './.env' });

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const app = express();

// ✅ CORS complet ici
app.use(cors()); // Autorise toutes les origines pour les tests

app.options('*', cors()); // Supporte les requêtes pré-vol (OPTIONS)

const baseUrl = `https://calculateur-mrod.onrender.com/`; // 🔥 NE PAS inclure le :3000

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27'
});

app.use(express.static('./client'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({
  verify: function (req, res, buf) {
    if (req.originalUrl.startsWith('/webhook')) {
      req.rawBody = buf.toString();
    }
  }
}));

app.get('/', (req, res) => {
  res.sendFile(resolve('./client/index.html'));
});

app.get('/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

app.post('/create-checkout-session', async (req, res) => {
  const userId = req.body.userId; // L'ID ou l'email du client (envoyé depuis ton front)
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{
      price_data: {
        unit_amount: 500,
        currency: 'usd',
        product_data: { name: 'photo' }
      },
      quantity: 1,
    }],
    client_reference_id: userId, // <- ici
    success_url: `${baseUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/canceled.html`
  });

  res.redirect(303, session.url);
});

app.post('/webhook', async (req, res) => {
  let event;

  if (process.env.STRIPE_WEBHOOK_SECRET) {
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log('⚠️  Webhook signature verification failed.');
      return res.sendStatus(400);
    }
  } else {
    event = req.body;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.client_reference_id;

    if (userId) {
      await admin.firestore().collection('users').doc(userId).set({
        isPremium: true
      }, { merge: true });

      console.log(`✅ Utilisateur ${userId} marqué comme premium.`);
    }
  }

  res.sendStatus(200);
});


app.post('/webhook', async (req, res) => {
  let event;
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log('⚠️  Webhook signature verification failed.');
      return res.sendStatus(400);
    }
  } else {
    event = req.body;
  }

  if (event.type === 'checkout.session.completed') {
    console.log('🔔  Payment received!');
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));
