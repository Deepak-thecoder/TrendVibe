const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow all origins (for development; you can restrict in production)
const corsOptions = {
  origin: 'https://trendvibe-news.onrender.com', // your frontend URL
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// API route to fetch news
app.get('/api/news', async (req, res) => {
  const { country = 'us', category = 'general', page = 1, pageSize = 20 } = req.query;

  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country,
        category,
        page,
        pageSize,
        apiKey: process.env.NEWS_API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'error', message: 'Failed to fetch news' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
