const fetch = require('node-fetch');
const crypto = require('crypto');

const API_KEY = process.env.dMT8VybD1wmQZvQyJJT8zpy9wJ5Qoen0soWSrp8FJYBgI6JVOMcakaWJcJ6LWe1S;
const SECRET_KEY = process.env.EBm4Q3sUiwTefHzlb2JWUMBeCLmGhknAFfiQDO6VP3grCJW3vVL7hGvSpMD4z9ae;

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
