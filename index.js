const express = require('express');
const { fetch, fetchOne, fetchBycountry, random, randomOne } = require('proxies-generator');

const app = express();
const port = 3000;

app.get('/proxy', async (req, res) => {
  try {
    const proxies = await fetch();
    if (proxies && proxies.length > 0) {
      res.status(200).json(proxies);
    } else {
      res.status(400).json({ message: 'No proxies found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.get('/proxy/one', async (req, res) => {
  try {
    const proxy = await fetchOne();
    if (proxy) {
      res.status(200).json(proxy);
    } else {
      res.status(400).json({ message: 'No proxy found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.get('/proxy', async (req, res) => {
  try {
    const country = req.query.country;
    const proxy = await fetchBycountry(country);
    if (proxy) {
      res.status(200).json(proxy);
    } else {
      res.status(400).json({ message: `No proxy found for country: ${country}` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.get('/proxy/random', async (req, res) => {
  try {
    const proxies = await random();
    if (proxies && proxies.length > 0) {
      res.status(200).json(proxies);
    } else {
      res.status(400).json({ message: 'No random proxy found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.get('/proxy/randomOne', async (req, res) => {
  try {
    const proxy = await randomOne();
    if (proxy) {
      res.status(200).json(proxy);
    } else {
      res.status(400).json({ message: 'No random proxy found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
