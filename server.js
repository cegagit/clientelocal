const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Serve static files from the root directory
app.use(express.static(__dirname));
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/clientsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import Client model
const Client = require('./models/Client');

// API Endpoints

// Get all clients
app.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new client
app.post('/clients', async (req, res) => {
  const client = new Client({
    name: req.body.name,
    address: req.body.address,
    email: req.body.email
  });

  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single client by ID
app.get('/clients/:id', getClient, (req, res) => {
  res.json(res.client);
});

// Update a client
app.patch('/clients/:id', getClient, async (req, res) => {
  if (req.body.name != null) {
    res.client.name = req.body.name;
  }
  if (req.body.address != null) {
    res.client.address = req.body.address;
  }
  if (req.body.email != null) {
    res.client.email = req.body.email;
  }

  try {
    const updatedClient = await res.client.save();
    res.json(updatedClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a client
app.delete('/clients/:id', getClient, async (req, res) => {
  try {
    await res.client.remove();
    res.json({ message: 'Deleted Client' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get client by ID
async function getClient(req, res, next) {
  let client;
  try {
    client = await Client.findById(req.params.id);
    if (client == null) {
      return res.status(404).json({ message: 'Cannot find client' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.client = client;
  next();
}

// Start the server
// Serve index.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});