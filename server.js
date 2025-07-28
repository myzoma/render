import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

app.get('/coingecko/*', async (req, res) => {
  try {
    // نحصل على المسار بعد /coingecko/
    const path = req.path.replace(/^\/coingecko\//, '');
    const query = req.originalUrl.split('?')[1] || '';
    const url = `https://api.coingecko.com/api/v3/${path}${query ? '?' + query : ''}`;

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch from CoinGecko' });
    }
    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// صفحة رئيسية ترحيبية بسيطة
app.get('/', (req, res) => {
  res.send('CoinGecko Proxy Server is running. Use /coingecko/* endpoints.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
