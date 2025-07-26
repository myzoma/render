const fetch = require('node-fetch');
const crypto = require('crypto');

const API_KEY = process.env.BINANCE_API_KEY;
const SECRET_KEY = process.env.BINANCE_SECRET_KEY;

function sign(queryString, secret) {
  return crypto.createHmac('sha256', secret).update(queryString).digest('hex');
}

async function getAccountInfo() {
  const baseUrl = 'https://api.binance.com/api/v3/account';
  const timestamp = Date.now();

  const params = `timestamp=${timestamp}`;
  const signature = sign(params, SECRET_KEY);
  const url = `${baseUrl}?${params}&signature=${signature}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'X-MBX-APIKEY': API_KEY }
  });

  return response.json();
}

module.exports = { getAccountInfo };
