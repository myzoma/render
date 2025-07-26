const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const { getAccountInfo } = require('./binanceApi');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// ✅ بروكسي لجلب exchangeInfo من Binance
app.get('/exchangeInfo', async (req, res) => {
  try {
    const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: 'فشل جلب exchangeInfo',
      detail: err.message
    });
  }
});

// ✅ مثال سابق لبيانات الحساب
app.get('/account', async (req, res) => {
  try {
    const data = await getAccountInfo();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
