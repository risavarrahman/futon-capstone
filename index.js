const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import Router
const authRoute = require('./routes/auth');
const animalRoute = require('./routes/animal');
const plantRoute = require('./routes/plant');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to DB'));

// Middleware
app.use(express.json());

// Route Middleware
app.get('/', (req, res) => {
  res.send('Hello world!');
});
app.use('/api/user', authRoute);
app.use('/api/animal', animalRoute);
app.use('/api/plant', plantRoute);

app.listen(5000, () => console.log(`Server running at port 5000`));
