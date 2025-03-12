require('dotenv').config();

module.exports = {
  baseUrl: 'https://api.trello.com/1',
  apiKey: process.env.TRELLO_API_KEY,
  token: process.env.TRELLO_API_TOKEN,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};