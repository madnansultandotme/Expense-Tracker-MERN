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

//routes
const routesPath = path.join(__dirname, 'routes');

if (fs.existsSync(routesPath)) {
  fs.readdirSync(routesPath).forEach(file => {
    const routePath = path.join(routesPath, file);
    try {
      const route = require(routePath);
      app.use('/api/v1', route);
    } catch (error) {
      console.error(`Failed to load route file: ${routePath}`, error);
    }
  });
} else {
  console.error(`Routes directory not found: ${routesPath}`);
}

mongoose.connect('mongodb+srv://zakir:zakir123@cluster0.0mrex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

// creating an API
app.get('/', (req, res)=> {
    res.send('Hello World')
})
// creating a server
const server = () =>{
    db() //calling to connect the Database
    app.listen(PORT, () => {
        console.log('listening to PORT: ', PORT)
    })
}

server() // calling the function
