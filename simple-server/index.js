const cors = require("cors")
const express = require("express")
// const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser")

const userRoutes = require('./routes/user');
// const productRoutes = require('./routes/product');

const mongoose = require('mongoose')
const uri = "mongodb+srv://Kiwi28:kiwiPsw@clusterno1-u93k2.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => console.log('te-ai conectat cu succes'));

mongoose.set('useCreateIndex', true);//google it


const PORT = 3028;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
// app.use('/api/home', productRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
