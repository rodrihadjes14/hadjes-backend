require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const propertyRoutes = require('./routes/properties');

const app = express();

app.use(cors());
app.use(express.json()); // Parses JSON request body

const listingsRoute = require("./routes/listings");
app.use("/listings", listingsRoute);

const Listing = require('./models/Listing'); 

app.get('/listings/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.json(listing);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;


// Routes
app.use('/properties', propertyRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on 
http://localhost:${PORT}`));
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});


