const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Import mongoose
const transactionsRoutes = require('./routes/transactions'); // Import transactions routes

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
mongoose.connect('mongodb+srv://zakir:zakir123@cluster0.0mrex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/v1', transactionsRoutes); // Use transactions routes with base path '/api/v1'

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start server
const server = () => {
    app.listen(PORT, () => {
        console.log('Listening to PORT:', PORT);
    });
};


