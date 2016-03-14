'use strict'
let cors = require('cors');
let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let database = require('./database');

let app = express();

app.use(cors());
app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
  res.sendfile('./public/index.html');
});

app.get('/html/cart', function(req, res) {
  res.sendfile('./public/html/cart.html');
});

app.get('/html/receipt', function(req, res) {
  res.sendfile('./public/html/receipt.html');
});

app.get('/html/receipt-list', function(req, res) {
  res.sendfile('./public/html/receipt-list.html');
});

app.get('/allItems', function (req, res) {
  database.connect(database.queryAllItems, function(doc) {  
    res.send(doc.allItems || []);
  });
});

app.get('/cartRecords', function (req, res) {
  database.connect(database.queryCartRecords, function(doc) {
    res.send(doc.cartRecords || []);
  });
});

app.get('/clear', function (req, res) {
  database.connect(database.clearCart, function() {
    res.send('succeed');
  })
});

app.post('/cartRecords', function (req, res) {
  let cartRecords = req.body.cartRecords;
  database.updateCartRecords(cartRecords, function() {
    res.send('succeed');
  });
});

app.get('/receiptList', function (req, res) {
  database.connect(database.queryReceiptList, function(doc) {
    res.send(doc.receipts || []);
  });
});

app.post('/receiptList', function (req, res) {
  let receipts = req.body.receipts;
  database.updateReceiptList(receipts, function() {
    res.send('succeed');
  });
});

app.listen(8080, function () {
  console.log('App listening on port 8080!');
});