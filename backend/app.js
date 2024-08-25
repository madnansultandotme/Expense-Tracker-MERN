const express = require('express')
const cors = require('cors')
const { db } = require('./db/db')
const {readdirSync} = require('fs')
const { route } = require('./routes/transactions')
const path = require('path');
const app = express()

require('dotenv').config()

const PORT = process.env.PORT||3000

// middlewares
app.use(express.json())
app.use(cors(
    {
        origin: ["https://expense-tracker-mern-frontend.vercel.app"],
        methods: ["POST","GET"],
        credentials: true
    }
));

// Database connection
mongoose.connect('mongodb+srv://zakir:zakir123@cluster0.0mrex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/v1', transactionsRoutes); // Use transactions routes with base path '/api/v1'


app.get('/', (req, res) => {
    res.send('Hello World');
});
// creating a server
const server = () =>{
    db() //calling to connect the Database
    app.listen(PORT, () => {
        console.log('listening to PORT: ', PORT)
    })
}

server() // calling the function
