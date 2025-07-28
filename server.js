import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

// بروكسي ديناميكي لأي طلب إلى CoinGecko
app.use('/coingecko', async (req, res) => {
  try {
    // إزالة /coingecko من البداية
    const path = req.originalUrl.replace('/coingecko', '');
    const url = `https://api.coingecko.com/api/v3${path}`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', message: err.message });
  }
});

// صفحة ترحيبية في /
app.get('/', (req, res) => {
  res.send('✅ CoinGecko Proxy is running. Use /coingecko/*');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
