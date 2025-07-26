const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/*', async (req, res) => {
  const path = req.originalUrl.replace('/api', '');
  const url = `https://api.binance.com${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy Error', message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
