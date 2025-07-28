import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

// بروكسي كامل لكل استدعاءات CoinGecko
app.use('/coingecko', async (req, res) => {
  try {
    // إزالة /coingecko من بداية الرابط وإبقاء الباقي كما هو (بما في ذلك query params)
    const targetPath = req.originalUrl.replace(/^\/coingecko/, '');
    const url = `https://api.coingecko.com/api/v3${targetPath}`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
});

// صفحة الترحيب في /
app.get('/', (req, res) => {
  res.send('CoinGecko Proxy Server is running. Use /coingecko/* endpoints.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Proxy server is running on port ${PORT}`));
