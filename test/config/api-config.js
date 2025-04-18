require('dotenv').config();

console.log('API Key:', process.env.TRELLO_API_KEY);
console.log('API Token:', process.env.TRELLO_API_TOKEN);

module.exports = {
  baseUrl: 'https://api.trello.com/1',
  apiKey: process.env.TRELLO_API_KEY,
  token: process.env.TRELLO_API_TOKEN,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
