'use strict'
let cors = require('cors');
let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let database = require('./database');
let api = require('./api');

let app = express();

app.use(cors());
app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);

app.get('/', (req, res) => {
  res.sendfile('./public/index.html');
});

app.get('/cart', (req, res) => {
  res.sendfile('./public/html/cart.html');
});

app.get('/receipt', (req, res) => {
  res.sendfile('./public/html/receipt.html');
});

app.get('/receipt-list', (req, res) => {
  res.sendfile('./public/html/receipt-list.html');
});

app.listen(8080,  () => {
  console.log('App listening on port 8080!');
});