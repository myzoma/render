const express = require('express');
const cors = require('cors');
const { getAccountInfo } = require('./binanceApi');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/account', async (req, res) => {
  try {
    const data = await getAccountInfo();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
