// importing required modules
const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

//using dotenv for env. variables
require('dotenv').config();

// Import routes
const { servicesControl, userControl, societyControl, complaintControl, paymentControl,citiesControl, postsControl } = require('./routes/routes');

// Configure body parser for larger requests
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// Make incoming data in JSON format
app.use(express.json());

// Use CORS middleware
app.use(cors());

// Connect to MongoDB
main()
    .then(() => {
        console.log("Connection Successful with Database 📊!");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(process.env.MONGO_KEY);
};

// Define routes
app.use('/services', servicesControl);
app.use('/user', userControl);
app.use('/society', societyControl);
app.use('/complaint', complaintControl);
app.use('/pay', paymentControl);
app.use('/cities', citiesControl);
app.use('/posts',postsControl)

// Define a basic route
app.get('/', (req, res) => {
    res.send("Home Page!");
});

// Listening the server!
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Connected to server ${PORT} 🚀!`);
})