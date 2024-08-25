const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const transactionsRoutes = require('./routes/transactions'); // Ensure this path is correct

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ["https://expense-tracker-mern-frontend.vercel.app"],
    methods: ["POST", "GET", "DELETE"],
    credentials: true
}));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://zakir:zakir123@cluster0.0mrex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/v1', transactionsRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start server
const server = () => {
    app.listen(PORT, () => {
        console.log('Listening to PORT:', PORT);
    });
};

// Call the server function to start the server
server();
