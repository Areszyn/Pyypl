const fetch = require('node-fetch');

export default async (req, res) => {
  const { orderID } = req.body;

  try {
    const response = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}`,
      {
        headers: {
          "Authorization": `Bearer ${process.env.PAYPAL_SECRET}`,
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
