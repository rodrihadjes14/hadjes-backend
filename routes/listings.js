const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// Default test route
router.get('/', (req, res) => {
  res.send('📢 Listings route working!');
});

// Add a new listing (POST)
router.post('/', async (req, res) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all listings (GET)
router.get('/all', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

